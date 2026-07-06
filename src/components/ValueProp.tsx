const values = [
  {
    icon: "eco",
    title: "Sustainable Materials",
    description:
      "Responsibly sourced hardwoods and organic textiles chosen for longevity.",
    delay: "100ms",
  },
  {
    icon: "handyman",
    title: "Artisan Crafted",
    description:
      "Each piece is hand-finished by master craftspeople using traditional joinery.",
    delay: "200ms",
  },
  {
    icon: "local_shipping",
    title: "White-Glove Delivery",
    description:
      "Complimentary assembly and packaging removal for all large furniture pieces.",
    delay: "300ms",
  },
];

export default function ValueProp() {
  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop border-t border-outline-variant/30">
      <div className="px-gutter max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {values.map((value) => (
            <div
              key={value.title}
              className="reveal reveal-up"
              style={{ transitionDelay: value.delay }}
            >
              <div className="mb-6 flex justify-center">
                <span
                  className="material-symbols-outlined text-4xl text-secondary"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  {value.icon}
                </span>
              </div>
              <h3 className="font-label-caps text-label-caps uppercase tracking-widest mb-3">
                {value.title}
              </h3>
              <p className="font-body-md text-on-surface-variant px-4">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
