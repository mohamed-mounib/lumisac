'use client';

import { useState, FormEvent, useEffect } from 'react';
import { wilayas } from '@/lib/wilayas';

export default function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [phoneError, setPhoneError] = useState('');
  const [productError, setProductError] = useState('');

  useEffect(() => {
    const handleProductSelect = (e: CustomEvent) => {
      const detail = e.detail;
      setSelectedProducts(Array.isArray(detail) ? detail : []);
      if (Array.isArray(detail) && detail.length > 0) {
        setProductError('');
      }
    };
    window.addEventListener('selectProduct', handleProductSelect as EventListener);
    return () => window.removeEventListener('selectProduct', handleProductSelect as EventListener);
  }, []);

  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => setSubmitStatus('idle'), 4000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validatePhone = (phone: string): boolean => {
    return /^(05|06|07)[0-9]{8}$/.test(phone);
  };

  const removeProduct = (name: string) => {
    const updated = selectedProducts.filter((p) => p !== name);
    setSelectedProducts(updated);
    window.dispatchEvent(new CustomEvent('selectProduct', { detail: updated }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setPhoneError('');
    setProductError('');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // 🍯 Honeypot check
    const honeypot = formData.get('website') as string;
    if (honeypot) {
      setIsSubmitting(false);
      return;
    }

    // ✅ Product validation — إجباري
    if (selectedProducts.length === 0) {
      setProductError('يرجى اختيار منتج واحد على الأقل من الكولكشن أعلاه ↑');
      setIsSubmitting(false);
      const collectionSection = document.getElementById('collection');
      if (collectionSection) collectionSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!validatePhone(data.phone as string)) {
      setPhoneError('رقم الهاتف غير صحيح');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...data,
        website: undefined,
        product: selectedProducts.join(' + '),
      };

      if (process.env.NODE_ENV === 'development') {
        console.log('[OrderForm] 📤 Sending payload:', JSON.stringify(payload, null, 2));
      }

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let responseData: any = null;
      try {
        responseData = await response.json();
      } catch {
        responseData = { error: `Non-JSON response (status ${response.status})` };
      }

      if (process.env.NODE_ENV === 'development') {
        console.log(`[OrderForm] 📥 Response — status: ${response.status}`, responseData);
      }

      if (response.ok) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
        setSelectedProducts([]);
        window.dispatchEvent(new CustomEvent('selectProduct', { detail: [] }));
      } else {
        const apiError = responseData?.error || responseData?.message || `HTTP ${response.status}`;
        console.error('[OrderForm] ❌ API error:', apiError);
        setErrorMessage(
          process.env.NODE_ENV === 'development' ? `خطأ: ${apiError}` : 'حدث خطأ — يرجى المحاولة مجدداً'
        );
        setSubmitStatus('error');
      }
    } catch (networkError: any) {
      console.error('[OrderForm] ❌ Network error:', networkError.message);
      setErrorMessage(
        process.env.NODE_ENV === 'development'
          ? `خطأ في الشبكة: ${networkError.message}`
          : 'تعذّر الاتصال بالخادم — تحقق من الإنترنت'
      );
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="py-16 px-4 sm:px-8 bg-brand-void">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
            ✨ اطلبي الآن — Order Now!
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-brand-dark/50 backdrop-blur-sm border border-brand-fuchsia/30 rounded-2xl p-6 sm:p-8"
        >
          {/* 🍯 Honeypot */}
          <input
            type="text"
            name="website"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            style={{ display: 'none' }}
          />

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-white font-medium mb-2 text-sm sm:text-base">
              Full Name / الاسم الكامل *
            </label>
            <input
              type="text" id="name" name="name" required minLength={2} maxLength={100}
              className="w-full px-4 py-3 bg-white/4 border border-brand-fuchsia/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-fuchsia transition-colors text-base"
              placeholder="الاسم الكامل..."
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-white font-medium mb-2 text-sm sm:text-base">
              Phone Number / رقم الهاتف *
            </label>
            <input
              type="tel" id="phone" name="phone" required pattern="^(05|06|07)[0-9]{8}$"
              className="w-full px-4 py-3 bg-white/4 border border-brand-fuchsia/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-fuchsia transition-colors text-base"
              placeholder="05XXXXXXXX"
              onChange={(e) => {
                if (e.target.value && !validatePhone(e.target.value)) setPhoneError('رقم الهاتف غير صحيح');
                else setPhoneError('');
              }}
            />
            {phoneError && <p className="text-red-400 text-xs mt-1">{phoneError}</p>}
          </div>

          {/* Wilaya */}
          <div>
            <label htmlFor="state" className="block text-white font-medium mb-2 text-sm sm:text-base">
              Wilaya / الولاية *
            </label>
            <select
              id="state" name="state" required
              className="w-full px-4 py-3 bg-[#12101f] border border-brand-fuchsia/20 rounded-lg text-white focus:outline-none focus:border-brand-fuchsia transition-colors text-base [&>option]:bg-[#12101f] [&>option]:text-white"
            >
              <option value="">-- اختاري الولاية --</option>
              {wilayas.map((wilaya) => (
                <option key={wilaya.code} value={wilaya.name}>
                  {wilaya.code} - {wilaya.name} ({wilaya.nameAr})
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-white font-medium mb-2 text-sm sm:text-base">
              City/Commune / البلدية *
            </label>
            <input
              type="text" id="city" name="city" required minLength={2} maxLength={100}
              className="w-full px-4 py-3 bg-white/4 border border-brand-fuchsia/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-fuchsia transition-colors text-base"
              placeholder="البلدية..."
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-white font-medium mb-2 text-sm sm:text-base">
              Delivery Address / عنوان التوصيل *
            </label>
            <textarea
              id="address" name="address" required minLength={5} maxLength={500} rows={3}
              className="w-full px-4 py-3 bg-white/4 border border-brand-fuchsia/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-fuchsia transition-colors text-base resize-none"
              placeholder="العنوان بالتفصيل..."
            />
          </div>

          {/* Selected Products */}
          <div>
            <label className="block text-white font-medium mb-2 text-sm sm:text-base">
              Selected Products / المنتجات المختارة *
            </label>
            {selectedProducts.length === 0 ? (
              <div className={`p-3 rounded-lg border ${productError ? 'border-red-500/50 bg-red-500/10' : 'border-brand-fuchsia/20 bg-white/4'}`}>
                <p className={`text-sm ${productError ? 'text-red-400' : 'text-gray-500'}`}>
                  {productError || 'لم يتم اختيار أي منتج — اختاري من الكولكشن أعلاه ↑'}
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedProducts.map((p) => (
                  <div key={p} className="flex items-center gap-2 px-3 py-1.5 bg-brand-fuchsia/20 border border-brand-fuchsia/40 rounded-full">
                    <span className="text-brand-lavender text-sm font-medium">{p}</span>
                    <button
                      type="button"
                      onClick={() => removeProduct(p)}
                      className="text-brand-fuchsia hover:text-white transition-colors text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={isSubmitting}
            className="w-full min-h-[44px] px-8 py-3 bg-gradient-to-r from-brand-pink to-brand-fuchsia text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                جاري الإرسال...
              </span>
            ) : (
              '🛒 تأكيد الطلب — Place My Order!'
            )}
          </button>

          {submitStatus === 'success' && (
            <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center">
              <p className="font-semibold">✅ تم استلام طلبك! سنتواصل معك قريباً 🌟</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-center">
              <p className="font-semibold">❌ {errorMessage || 'حدث خطأ — يرجى المحاولة مجدداً'}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}