'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function CollectionGrid() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const products = [
    {
      id: 1,
      name: "حقيبة الصباح",
      price: "3500 DZD",
      description: "حقيبة أنيقة تتوهج في الظلام مع نقوش كروشيه دقيقة",
      image: "/images/sac_in_the_morning.png",
    },
    {
      id: 2,
      name: "النسخة الزرقاء ✨",
      price: "4000 DZD",
      description: "توهج أزرق ساحر مع تصميم عصري مميز",
      image: "/images/sac_in_the_night_blue.png",
    },
    {
      id: 3,
      name: "النسخة البنفسجية ✨",
      price: "4000 DZD",
      description: "توهج بنفسجي عميق مع لمسات أنيقة",
      image: "/images/sac_in_the_night_purple.png",
    },
    {
      id: 4,
      name: "الحقيبة المضيئة",
      price: "3500 DZD",
      description: "الحقيبة الأصلية التي تتوهج بشكل مذهل في الظلام",
      image: "/images/sac_in_the_night.png",
    },
    {
      id: 5,
      name: "إطلالة نهارية",
      price: "3800 DZD",
      description: "حقيبة عملية وأنيقة للاستخدام اليومي",
      image: "/images/woman_wearing_the_sac.png",
    },
    {
      id: 6,
      name: "إطلالة ليلية ✨",
      price: "3800 DZD",
      description: "مثالية للخروج في المساء مع توهج ساحر",
      image: "/images/woman_wearing_the_sac_in_the_night.png",
    },
  ];

  const handleOrderClick = (productName: string) => {
    const updated = selectedProducts.includes(productName)
      ? selectedProducts.filter((p) => p !== productName)
      : [...selectedProducts, productName];

    setSelectedProducts(updated);
    window.dispatchEvent(new CustomEvent('selectProduct', { detail: updated }));

    if (!selectedProducts.includes(productName)) {
      const orderSection = document.getElementById('order');
      if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collection" className="py-16 px-4 sm:px-8 bg-brand-void">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Collection
          </h2>
          <p className="text-brand-lavender text-base sm:text-lg">
            مجموعتنا الحصرية — كل حقيبة تحكي قصة فريدة ✨
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const isSelected = selectedProducts.includes(product.name);
            return (
              <div
                key={product.id}
                className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                  isSelected
                    ? 'bg-brand-fuchsia/10 shadow-glow border border-brand-fuchsia/60'
                    : 'bg-white/4 hover:shadow-glow border border-white/10'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10 bg-brand-fuchsia text-white text-xs font-bold px-2 py-1 rounded-full">
                    ✓ مختارة
                  </div>
                )}

                <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-brand-dark to-brand-void overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-4"
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="font-playfair text-lg sm:text-xl font-semibold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-pink font-bold text-lg">
                      {product.price}
                    </span>
                    <button
                      onClick={() => handleOrderClick(product.name)}
                      className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 min-h-[44px] border-2 ${
                        isSelected
                          ? 'bg-brand-fuchsia border-brand-fuchsia text-white shadow-glow'
                          : 'bg-brand-fuchsia/20 border-brand-fuchsia text-white hover:bg-brand-fuchsia hover:shadow-glow'
                      }`}
                    >
                      {isSelected ? '✓ تم الاختيار' : 'اطلبيها الآن'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedProducts.length > 0 && (
          <div className="mt-8 p-4 bg-brand-fuchsia/10 border border-brand-fuchsia/30 rounded-2xl text-center">
            <p className="text-brand-lavender text-sm mb-2">
              المنتجات المختارة ({selectedProducts.length}):
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {selectedProducts.map((p) => (
                <span key={p} className="px-3 py-1 bg-brand-fuchsia/20 border border-brand-fuchsia/40 rounded-full text-white text-sm">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm mb-4">Limited stock — don't miss out!</p>
          <p className="text-brand-lavender text-base mb-6">الكميات محدودة — لا تفوّتي الفرصة!</p>
          <button
            onClick={() => {
              const orderSection = document.getElementById('order');
              if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-block min-h-[44px] px-8 py-3 bg-gradient-to-r from-brand-pink to-brand-fuchsia text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
          >
            اطلبي الآن
          </button>
        </div>
      </div>
    </section>
  );
}