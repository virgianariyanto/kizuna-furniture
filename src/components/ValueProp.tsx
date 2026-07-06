const values = [
  {
    icon: "eco",
    title: "Sustainable Materials",
    description:
      "Responsibly sourced hardwoods and organic textiles, chosen for longevity and minimal environmental impact.",
    stat: "100% FSC",
    statLabel: "Certified Wood",
    delay: "100ms",
  },
  {
    icon: "handyman",
    title: "Artisan Crafted",
    description:
      "Each piece is hand-finished by master craftspeople using centuries-old joinery techniques passed down through generations.",
    stat: "40+ Hours",
    statLabel: "Per Piece",
    delay: "200ms",
  },
  {
    icon: "local_shipping",
    title: "White-Glove Delivery",
    description:
      "Complimentary in-home assembly and full packaging removal for every large furniture piece we deliver.",
    stat: "Zero Hassle",
    statLabel: "Guaranteed",
    delay: "300ms",
  },
];

export default function ValueProp() {
  return (
    <section className="bg-inverse-surface py-section-padding-mobile md:py-section-padding-desktop">
      <div className="px-gutter max-w-container-max mx-auto">

        {/* ── Section Header ─────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-0 pb-10 border-b border-inverse-on-surface/10 reveal reveal-up">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[1px] w-8 bg-secondary-fixed-dim" />
              <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-secondary-fixed-dim">
                Our Promise
              </span>
            </div>
            <h2
              className="font-display-lg text-inverse-on-surface"
              style={{ fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1.1 }}
            >
              The KIZUNA{" "}
              <span className="italic text-secondary-fixed-dim">Standard</span>
            </h2>
          </div>

          <a
            href="#"
            className="hidden md:inline-flex items-center gap-3 font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed-dim/60 transition-colors duration-300 hover:text-inverse-on-surface"
          >
            Our Story
            <span className="inline-block transition-transform duration-300 hover:translate-x-1">→</span>
          </a>
        </div>

        {/* ── Value Rows ──────────────────────────────────────────── */}
        <div>
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10 border-b border-inverse-on-surface/10 py-10 md:py-12 cursor-default reveal reveal-up"
              style={{ transitionDelay: value.delay }}
            >
              {/* Hover background reveal */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* ── Number ── */}
              <span
                className="relative select-none flex-shrink-0 font-display-lg leading-none text-inverse-on-surface/[0.06] transition-all duration-700 group-hover:text-secondary-fixed-dim/20"
                style={{ fontSize: "clamp(56px, 6vw, 80px)" }}
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* ── Animated divider line ── */}
              <div className="hidden md:block h-[1px] w-10 flex-shrink-0 bg-inverse-on-surface/15 transition-all duration-500 group-hover:w-16 group-hover:bg-secondary-fixed-dim" />

              {/* ── Content ── */}
              <div className="relative flex-1 min-w-0">
                <h3
                  className="mb-2.5 font-headline-sm text-inverse-on-surface transition-colors duration-300 group-hover:text-secondary-fixed-dim"
                  style={{ fontSize: "20px", lineHeight: 1.2 }}
                >
                  {value.title}
                </h3>
                <p
                  className="font-body-md max-w-md leading-relaxed"
                  style={{ fontSize: "14px", color: "rgba(243, 240, 236, 0.45)" }}
                >
                  {value.description}
                </p>
              </div>

              {/* ── Stat callout ── */}
              <div className="relative hidden sm:flex flex-col items-end flex-shrink-0 min-w-[100px] text-right">
                <span
                  className="font-display-lg text-inverse-on-surface/10 leading-none transition-all duration-500 group-hover:text-secondary-fixed-dim/40"
                  style={{ fontSize: "28px" }}
                >
                  {value.stat}
                </span>
                <span
                  className="font-label-caps text-[9px] uppercase tracking-[0.25em] transition-colors duration-300"
                  style={{ color: "rgba(243, 240, 236, 0.3)" }}
                >
                  {value.statLabel}
                </span>
              </div>

              {/* ── Icon box ── */}
              <div className="relative flex h-12 w-12 md:h-14 md:w-14 flex-shrink-0 items-center justify-center border border-inverse-on-surface/10 transition-all duration-500 group-hover:border-secondary-fixed-dim/50 group-hover:bg-secondary/10">
                <span
                  className="material-symbols-outlined transition-colors duration-300 text-inverse-on-surface/30 group-hover:text-secondary-fixed-dim"
                  style={{
                    fontVariationSettings: "'FILL' 0",
                    fontSize: "20px",
                  }}
                >
                  {value.icon}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom tagline ─────────────────────────────────────── */}
        <div className="mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal reveal-up" style={{ transitionDelay: "400ms" }}>
          <p
            className="font-body-md italic max-w-xs"
            style={{ color: "rgba(243, 240, 236, 0.25)", fontSize: "14px" }}
          >
            "Design is not just what it looks like — design is how it works."
          </p>
          <a
            href="#shop"
            className="inline-flex items-center gap-3 font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed-dim border border-secondary-fixed-dim/30 px-8 py-4 transition-all duration-300 hover:bg-secondary-fixed-dim hover:text-inverse-surface"
          >
            Shop All Pieces
          </a>
        </div>

      </div>
    </section>
  );
}
