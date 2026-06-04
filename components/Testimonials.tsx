import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      name: "أميرة بن علي",
      location: "وهران",
      rating: 5,
      text: "حقيبة رائعة جداً! التفاصيل مذهلة والجودة تفوق التوقعات. استخدمتها في حفل زفاف وكانت محط إعجاب الجميع. أنصح بشدة بالشراء من لوميساك.",
    },
    {
      name: "سارة محمد",
      location: "الجزائر العاصمة",
      rating: 5,
      text: "صناعة يدوية ممتازة، الحقيبة تتوهج بشكل جميل في الظلام. التوصيل كان سريعاً والتغليف ممتاز. سأطلب بالتأكيد موديلات أخرى.",
    },
    {
      name: "ليلى حمادي",
      location: "قسنطينة",
      rating: 5,
      text: "أفضل هدية قدمتها لصديقتي في عيد ميلادها. أحبتها كثيراً! التصميم فريد والألوان جميلة جداً. شكراً لوميساك على هذا المنتج الرائع.",
    },
    {
      name: "نور الدين يوسف",
      location: "سطيف",
      rating: 5,
      text: "اشتريت الحقيبة لزوجتي وكانت سعيدة جداً. الجودة عالية والسعر معقول مقارنة بالجودة. التوصيل مجاني إلى جميع الولايات، هذا رائع!",
    },
    {
      name: "مريم بلقاسم",
      location: "تلمسان",
      rating: 5,
      text: "الإضاءة في الظلام ساحرة حقاً. الحقيبة عملية وأنيقة في نفس الوقت. استخدمها يومياً وتتحمل الاستخدام الكثيف. منتج جزائري نفتخر به!",
    },
    {
      name: "خديجة عماري",
      location: "عنابة",
      rating: 5,
      text: "حصلت على الكثير من الإعجابات عندما خرجت بها. الصناعة دقيقة جداً والخيوط قوية. سأطلب هدية لأختي أيضاً. عمل رائع!",
    },
  ];

  return (
    <section id="testimonials" className="py-16 px-4 sm:px-8 bg-brand-void relative overflow-hidden">
      {/* Background Image with Dimmed Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/woman_wearing_the_sac_in_the_night.png"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-brand-void/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-brand-lavender text-base sm:text-lg">
            آراء عملائنا — ثقتنا أكبر دليل على جودتنا ✨
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/4 backdrop-blur-sm rounded-2xl p-6 hover:shadow-glow transition-all duration-300"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-brand-pink"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {testimonial.text}
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 min-h-[44px] min-w-[44px] bg-gradient-to-br from-brand-pink/30 to-brand-fuchsia/30 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
