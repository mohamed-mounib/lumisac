import Image from 'next/image';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 pt-14 lg:pt-16 overflow-hidden"
    >
      {/* Radial Glow Background */}
      <div className="absolute inset-0 bg-brand-dark">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(192, 132, 252, 0.15), transparent 70%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Glow Different.
              <br />
              <span className="text-brand-pink">Carry Art.</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-brand-lavender mb-8 max-w-xl mx-auto lg:mx-0">
              اقتنيها اليوم — تُوصَل إلى باب منزلك، لا مثيل لها! ✨
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
              <a
                href="#collection"
                className="w-full sm:w-auto min-h-[44px] px-8 py-3 bg-gradient-to-r from-brand-pink to-brand-fuchsia text-white font-semibold rounded-full animate-pulse-glow hover:scale-105 transition-all duration-300"
              >
                Shop the Collection
              </a>
              <a
                href="#about"
                className="w-full sm:w-auto min-h-[44px] px-8 py-3 border-2 border-brand-lavender text-brand-lavender font-semibold rounded-full hover:bg-brand-lavender hover:text-brand-void transition-all duration-300"
              >
                How it's Made
              </a>
            </div>

            {/* Floating Animated Badge */}
            <div className="inline-block px-4 py-2 bg-brand-fuchsia/20 border border-brand-fuchsia/30 rounded-full animate-float">
              <span className="text-brand-lavender text-sm font-medium">🌟 Handmade in Algeria</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              <Image
                src="/images/sac_in_the_night.png"
                alt="LumiSac - Glow in the Dark Bag"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
