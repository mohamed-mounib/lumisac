import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Sanitize function to strip HTML/script tags
function sanitizeString(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim();
}

// Zod schema for validation — .strict() rejects any unexpected fields
const OrderSchema = z.object({
  name: z.string().min(2).max(100).trim()
    .refine(val => !/<[^>]*>/.test(val), "Invalid characters in name"),
  phone: z.string().regex(/^(05|06|07)[0-9]{8}$/, 'Invalid Algerian phone number'),
  state: z.string().min(2).max(80).trim()
    .refine(val => !/<[^>]*>/.test(val), "Invalid characters in state"),
  city: z.string().min(2).max(100).trim()
    .refine(val => !/<[^>]*>/.test(val), "Invalid characters in city"),
  address: z.string().min(5).max(500).trim()
    .refine(val => !/<[^>]*>/.test(val), "Invalid characters in address"),
  product: z.string().max(200).trim()
    .refine(val => !/<[^>]*>/.test(val), "Invalid characters in product")
    .optional(),
  // Honeypot field — real users never fill this (hidden in the form)
  website: z.string().optional(),
}).strict();

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxRequests = 3;
  const record = rateLimitStore.get(ip);
  if (!record) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  if (record.count >= maxRequests) return false;
  record.count++;
  return true;
}

// ─── Telegram ───────────────────────────────────────────────────────────────
async function sendTelegramNotification(data: z.infer<typeof OrderSchema>) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('[Telegram] ⚠️  Missing env vars — TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
    return;
  }

  const message = `🛍️ *طلب جديد!* ✨
━━━━━━━━━━━━━━━
👤 *الاسم:* ${data.name}
📱 *الهاتف:* \`${data.phone}\`
📍 *الولاية:* ${data.state} — ${data.city}
🏠 *العنوان:* ${data.address}
🎁 *المنتج:* ${data.product || 'غير محدد'}
🕐 *الوقت:* ${new Date().toLocaleString('fr-DZ', { timeZone: 'Africa/Algiers' })}
━━━━━━━━━━━━━━━`;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Telegram API error ${res.status}: ${errorBody}`);
  }

  const result = await res.json();
  console.log('[Telegram] ✅ Message sent — message_id:', result.result?.message_id);
}

// ─── Google Sheets ───────────────────────────────────────────────────────────
async function appendToGoogleSheet(data: z.infer<typeof OrderSchema>) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!sheetId) throw new Error('Missing env var: GOOGLE_SHEET_ID');
  if (!clientEmail) throw new Error('Missing env var: GOOGLE_CLIENT_EMAIL');
  if (!privateKey) throw new Error('Missing env var: GOOGLE_PRIVATE_KEY');

  // ✅ Check key format without exposing any part of the key in logs
  if (!privateKey.includes('-----BEGIN RSA PRIVATE KEY-----') &&
      !privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    throw new Error('GOOGLE_PRIVATE_KEY format is invalid — must start with BEGIN PRIVATE KEY header');
  }

  console.log('[Sheets] 🔑 Auth: using service account:', clientEmail);
  console.log('[Sheets] 📄 Sheet ID:', sheetId);

  const { GoogleSpreadsheet } = await import('google-spreadsheet');
  const { JWT } = await import('google-auth-library');

  const auth = new JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(sheetId, auth);

  try {
    await doc.loadInfo();
  } catch (authErr: any) {
    // ✅ Generic error — no key content exposed
    throw new Error(
      `[Sheets] Authentication failed — check: (1) service account has Editor access, ` +
      `(2) GOOGLE_SHEET_ID is correct, (3) GOOGLE_PRIVATE_KEY formatting is valid`
    );
  }

  console.log('[Sheets] ✅ Authenticated — doc title:', doc.title);

  const sheet = doc.sheetsByIndex[0];
  console.log('[Sheets] 📊 Writing to sheet:', sheet.title);

  try {
    await sheet.loadHeaderRow();
    console.log('[Sheets] 📋 Detected headers:', sheet.headerValues);

    const expectedHeaders = ['Timestamp', 'Name', 'Phone', 'State', 'City', 'Address', 'Product'];
    const missing = expectedHeaders.filter(h => !sheet.headerValues.includes(h));
    if (missing.length > 0) {
      throw new Error(
        `Sheet is missing columns: [${missing.join(', ')}]. ` +
        `Actual headers are: [${sheet.headerValues.join(', ')}]`
      );
    }
  } catch (headerErr: any) {
    if (headerErr.message?.includes('missing columns') || headerErr.message?.includes('Actual headers')) {
      throw headerErr;
    }
    throw new Error(
      `[Sheets] Could not load header row — sheet may be empty. ` +
      `Add headers manually: Timestamp | Name | Phone | State | City | Address | Product`
    );
  }

  await sheet.addRow({
    Timestamp: new Date().toISOString(),
    Name: sanitizeString(data.name),
    Phone: data.phone,
    State: sanitizeString(data.state),
    City: sanitizeString(data.city),
    Address: sanitizeString(data.address),
    Product: data.product ? sanitizeString(data.product) : 'غير محدد',
  });

  console.log('[Sheets] ✅ Row added successfully');
}

// ─── Main Handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'طلبات كثيرة جداً — يرجى الانتظار قليلاً' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validationResult = OrderSchema.safeParse(body);

    if (!validationResult.success) {
      console.error('[Validation] ❌ Schema errors:', validationResult.error.flatten());
      return NextResponse.json(
        { error: 'Invalid input data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // ✅ Honeypot check — bots fill hidden fields, real users don't
    if (data.website && data.website.trim().length > 0) {
      console.warn('[Security] 🍯 Honeypot triggered — bot detected from IP:', ip);
      // Return fake success so bots don't know they were caught
      return NextResponse.json(
        { success: true, message: 'Order submitted successfully' },
        { status: 200 }
      );
    }

    console.log('[Order] 📥 New order received — name:', data.name, '| product:', data.product);

    // ✅ Telegram و Sheets يعملان بالتوازي
    const [telegramResult, sheetsResult] = await Promise.allSettled([
      sendTelegramNotification(data),
      appendToGoogleSheet(data),
    ]);

    if (telegramResult.status === 'rejected') {
      console.error('[Telegram] ❌ FAILED:', telegramResult.reason?.message);
    }

    if (sheetsResult.status === 'rejected') {
      console.error('[Sheets] ❌ FAILED:', sheetsResult.reason?.message);
      return NextResponse.json(
        { error: 'فشل حفظ الطلب — يرجى المحاولة مجدداً' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Order submitted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[Order] ❌ Unexpected error:', error.message);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}