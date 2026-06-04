export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-fuchsia/20 py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-brand-pink mb-4">
              ✨ LumiSac
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              Handmade luminous crochet bags from Algeria
            </p>
            <p className="text-brand-lavender text-sm">
              حقائب كروشيه لامعة مصنوعة يدوياً من الجزائر
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 text-sm hover:text-brand-pink transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#collection" className="text-gray-400 text-sm hover:text-brand-pink transition-colors">
                  Collection
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 text-sm hover:text-brand-pink transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#order" className="text-gray-400 text-sm hover:text-brand-pink transition-colors">
                  Order
                </a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 min-h-[44px] min-w-[44px] flex items-center justify-center bg-brand-fuchsia/20 rounded-full hover:bg-brand-fuchsia hover:text-white text-brand-pink transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069 3.204 0 3.584.012 4.849.069 3.227.149 4.771 1.699 4.919 4.92.058 1.265.07 1.645.07 4.849 0 3.204-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 min-h-[44px] min-w-[44px] flex items-center justify-center bg-brand-fuchsia/20 rounded-full hover:bg-brand-fuchsia hover:text-white text-brand-pink transition-all duration-300"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.66-6.61V17.9a4.83 4.83 0 0 1-3.77-4.25 4.83 4.83 0 0 1 3.77-4.25z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-fuchsia/10 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 LumiSac — Handmade in Algeria 🇩🇿
          </p>
        </div>
      </div>
    </footer>
  );
}
