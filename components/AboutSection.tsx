import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 sm:px-8 bg-brand-dark">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-1 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/woman_wearing_the_sac.png"
                alt="Woman wearing LumiSac"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="order-2 lg:order-2">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-6">
              Our Story
            </h2>
            <p className="text-gray-400 text-base mb-4 leading-relaxed">
              Every Lumisac bag is a unique piece of art, handcrafted with passion
              and precision in Algeria. We combine traditional crochet techniques
              with modern luminous materials to create accessories that truly
              stand out.
            </p>
            <p className="text-brand-lavender text-base mb-4 leading-relaxed">
              كل حقيبة من لوميساك هي قطعة فنية فريدة، مصنوعة يدوياً بشغف
              ودقة في الجزائر. نحن نجمع بين تقنيات الكروشيه التقليدية والمواد
              اللامعة الحديثة لإنشاء إكسسوارات تبرز حقاً.
            </p>
            <p className="text-gray-400 text-base mb-6 leading-relaxed">
              Our glow-in-the-dark technology ensures your bag shines beautifully
              in low light, making it perfect for evening outings and special
              occasions. Each piece tells a story of craftsmanship and creativity.
            </p>
            <p className="text-brand-lavender text-base mb-6 leading-relaxed">
              تضمن تقنية التوهج في الظلم لدينا أن تتوهج حقيبتك بشكل جميل في الإضاءة
              المنخفضة، مما يجعلها مثالية للخروج في المساء والمناسبات الخاصة.
              كل قطعة تحكي قصة الحرفية والإبداع.
            </p>

            {/* How it Glows Callout */}
            <div className="bg-brand-fuchsia/10 border border-brand-fuchsia/30 rounded-xl p-6 mb-6">
              <h3 className="text-brand-pink font-semibold text-lg mb-3 flex items-center gap-2">
                <span>✨</span>
                How it Glows
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our bags use special glow-in-the-dark yarn that absorbs light during
                the day and emits a soft, beautiful glow at night. Simply expose your
                bag to natural or artificial light for a few minutes, and watch it
                come alive in the dark!
              </p>
              <p className="text-brand-lavender text-sm leading-relaxed mt-2">
                تستخدم حقائبنا خيوطاً خاصة تتوهج في الظلام تمتص الضوء خلال النهار
                وتصدر توهجاً ناعماً وجميلاً في الليل. ما عليك سوى تعريض حقيبتك
                للضوء الطبيعي أو الصناعي لبضع دقائق، وشاهد كيف تكتسب حياة في الظلام!
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 min-h-[44px] min-w-[44px] flex items-center justify-center bg-brand-pink/20 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-pink" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">100% Handmade</h3>
                  <p className="text-gray-500 text-sm">مصنوعة يدوياً بالكامل</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 min-h-[44px] min-w-[44px] flex items-center justify-center bg-brand-lavender/20 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-lavender" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Premium Quality</h3>
                  <p className="text-gray-500 text-sm">جودة عالية ممتازة</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 min-h-[44px] min-w-[44px] flex items-center justify-center bg-brand-fuchsia/20 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-fuchsia" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Glow Technology</h3>
                  <p className="text-gray-500 text-sm">تقنية التوهج</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 min-h-[44px] min-w-[44px] flex items-center justify-center bg-brand-pink/20 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 text-brand-pink" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Made in Algeria</h3>
                  <p className="text-gray-500 text-sm">صنع في الجزائر 🇩🇿</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
