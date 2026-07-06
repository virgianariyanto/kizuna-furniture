const categories = [
  {
    name: "Living",
    image: "/category-living.png",
    delay: "100ms",
  },
  {
    name: "Dining",
    image: "/category-dining.png",
    delay: "200ms",
  },
  {
    name: "Workspace",
    image: "/category-workspace.png",
    delay: "300ms",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-section-padding-mobile md:py-section-padding-desktop px-gutter max-w-container-max mx-auto">
      <div className="flex justify-between items-end mb-16 reveal reveal-up">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary mb-4">
            Curated Spaces
          </h2>
          <p className="font-body-md text-on-surface-variant">
            Design for every corner of your intentional life.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="group cursor-pointer reveal reveal-up"
            style={{ transitionDelay: cat.delay }}
          >
            <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('${cat.image}')` }}
                role="img"
                aria-label={`${cat.name} furniture category`}
              />
            </div>
            <div className="text-center">
              <h3 className="font-label-caps text-label-caps uppercase tracking-[0.2em] mb-2">
                {cat.name}
              </h3>
              <div className="w-8 h-[1px] bg-outline mx-auto transition-all duration-300 group-hover:w-16" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
