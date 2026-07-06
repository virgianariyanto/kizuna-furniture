const exploreLinks = ["Living", "Dining", "Workspace", "Lighting"];
const serviceLinks = [
  "Shipping & Returns",
  "Sustainability",
  "Contact",
  "Privacy Policy",
];

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant">
      {/* Main Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-gutter py-section-padding-mobile md:py-section-padding-desktop max-w-container-max mx-auto">
        {/* Brand Column */}
        <div className="md:col-span-4">
          <a
            className="font-display-lg text-headline-md text-primary mb-6 block"
            href="/"
          >
            KIZUNA
          </a>
          <p className="font-body-md text-on-surface-variant max-w-xs mb-8">
            Elevating everyday life through intentional design and
            Japanese-Scandi craftsmanship.
          </p>
          <div className="flex space-x-4">
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#"
              aria-label="Website"
            >
              <span className="material-symbols-outlined">public</span>
            </a>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors"
              href="#"
              aria-label="Instagram"
            >
              <span className="material-symbols-outlined">camera</span>
            </a>
          </div>
        </div>

        {/* Explore Column */}
        <div className="md:col-span-2">
          <h4 className="font-label-caps text-label-caps text-primary uppercase mb-6">
            Explore
          </h4>
          <ul className="space-y-4">
            {exploreLinks.map((item) => (
              <li key={item}>
                <a
                  className="font-body-md text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Column */}
        <div className="md:col-span-2">
          <h4 className="font-label-caps text-label-caps text-primary uppercase mb-6">
            Service
          </h4>
          <ul className="space-y-4">
            {serviceLinks.map((item) => (
              <li key={item}>
                <a
                  className="font-body-md text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="md:col-span-4">
          <h4 className="font-label-caps text-label-caps text-primary uppercase mb-6">
            Newsletter
          </h4>
          <p className="font-body-md text-on-surface-variant mb-6">
            Join our journal for seasonal inspiration and early access to
            collections.
          </p>
          <form className="flex border-b border-primary">
            <input
              className="bg-transparent border-none focus:ring-0 w-full py-2 font-body-md outline-none placeholder:text-on-surface-variant/60"
              placeholder="Email address"
              type="email"
              aria-label="Email address for newsletter"
            />
            <button
              className="font-label-caps text-label-caps text-primary uppercase tracking-widest py-2 whitespace-nowrap hover:opacity-70 transition-opacity"
              type="submit"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-gutter py-8 border-t border-outline-variant/30 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest">
          © 2024 KIZUNA. CREATED FOR INTENTIONAL LIVING.
        </span>
        <div className="flex space-x-8">
          <a
            className="font-label-caps text-[10px] text-on-surface-variant hover:text-primary uppercase tracking-widest transition-colors"
            href="#"
          >
            Terms
          </a>
          <a
            className="font-label-caps text-[10px] text-on-surface-variant hover:text-primary uppercase tracking-widest transition-colors"
            href="#"
          >
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
