'use client';

import { useState } from 'react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "كيف يتم التوصيل؟",
      answer: "Delivery typically takes 3-5 business days to all 58 wilayas in Algeria. We offer free shipping on all orders. يستغرق التوصيل عادة 3-5 أيام عمل إلى جميع الولايات الـ 58 في الجزائر. نحن نقدم الشحن المجاني على جميع الطلبات.",
    },
    {
      question: "هل يستمر التوهج لفترة طويلة؟",
      answer: "Our bags use special luminous materials that absorb light during the day and emit a soft glow in the dark. The glow lasts for several hours and recharges when exposed to light. حقائبنا تستخدم مواد لامعة خاصة تمتص الضوء خلال النهار وتصدر توهجاً ناعماً في الظلام. يستمر التوهج لعدة ساعات ويعاد شحنه عند التعرض للضوء.",
    },
    {
      question: "هل يمكنني اختيار اللون؟",
      answer: "Yes! We offer multiple color options including pink, blue, and purple variants. Each color has the same beautiful glow effect. نعم! نحن نقدم خيارات ألوان متعددة بما في ذلك الوردي والأزرق والبنفسجي. كل لون له نفس تأثير التوهج الجميل.",
    },
    {
      question: "هل يتوفر التوصيل لجميع الولايات؟",
      answer: "Absolutely! We deliver to all 58 wilayas across Algeria with free shipping nationwide. نعم بالتأكيد! نحن نوصّل إلى جميع الولايات الـ 58 في جميع أنحاء الجزائر مع شحن مجاني على مستوى البلاد.",
    },
    {
      question: "كيف أُقدِّم طلبي؟",
      answer: "Simply fill out the order form on our website with your details and preferred product. We'll contact you to confirm your order before delivery. ما عليك سوى ملء نموذج الطلب على موقعنا بتفاصيلك والمنتج المفضل. سنتواصل معك لتأكيد طلبك قبل التسليم.",
    },
    {
      question: "هل الحقيبة مقاومة للماء؟",
      answer: "Our bags are water-resistant to some extent but not fully waterproof. We recommend avoiding heavy rain and storing them properly when not in use. حقائبنا مقاومة للماء إلى حد ما ولكنها ليست مقاومة للماء بالكامل. ننصح بتجنب الأمطار الغزيرة وتخزينها بشكل صحيح عند عدم الاستخدام.",
    },
  ];

  return (
    <section id="faq" className="py-16 px-4 sm:px-8 bg-brand-dark">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-lavender text-base sm:text-lg">
            الأسئلة الشائعة — إجابات واضحة لكل استفسار ✨
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/4 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between min-h-[44px] transition-all duration-300 hover:bg-white/8"
              >
                <p className="text-white font-semibold text-sm sm:text-base">
                  {faq.question}
                </p>
                <svg
                  className={`w-5 h-5 text-brand-pink transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 pt-2">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
