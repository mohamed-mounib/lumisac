export default function SocialProofTicker() {
  const messages = [
    "سارة من الجزائر العاصمة — 'حقيبة رائعة، التفاصيل مذهلة!' ✨",
    "أميرة من وهران — 'الجودة تفوق التوقعات، شكراً لكم!' 💜",
    "ليلى من قسنطينة — 'أحببتها كثيراً، سأطلب أخرى!' 🌟",
    "نور من سطيف — 'التوصيل سريع والمنتج جميل جداً!' 🚀",
    "مريم من تلمسان — 'أفضل هدية قدمتها لصديقتي!' 🎁",
    "خديجة من عنابة — 'الإضاءة في الظلام ساحرة!' ✨",
    "فاطمة من بجاية — 'صناعة يدوية ممتازة، أنصح بها!' 👍",
    "آمنة من البليدة — 'حصلت على الكثير من الإعجابات!' 💕",
  ];

  return (
    <div className="bg-brand-dark/50 border-y border-brand-fuchsia/20 overflow-hidden py-3">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...messages, ...messages, ...messages].map((message, index) => (
          <span
            key={index}
            className="mx-8 text-sm text-gray-300 flex items-center gap-2"
          >
            <span className="text-brand-pink">✨</span>
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
