const products = [
  {
    name: "Sora Lounge Chair",
    material: "Ash & Linen",
    price: "$1,250",
    image: "/product-sora-chair.png",
    delay: "100ms",
  },
  {
    name: "Kuro Coffee Table",
    material: "Scorched Oak",
    price: "$890",
    image: "/product-kuro-table.png",
    delay: "200ms",
  },
  {
    name: "Yumi Floor Lamp",
    material: "Brass & Paper",
    price: "$420",
    image: "/product-yumi-lamp.png",
    delay: "300ms",
  },
  {
    name: "Mori Sideboard",
    material: "White Oak",
    price: "$2,100",
    image: "/product-mori-sideboard.png",
    delay: "400ms",
  },
];

export default function BestSellers() {
  return (
    <section
      className="bg-surface-container-low py-section-padding-mobile md:py-section-padding-desktop"
      id="shop"
    >
      <div className="px-gutter max-w-container-max mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 reveal reveal-up">
          <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] block mb-4">
            Selected Pieces
          </span>
          <h2 className="font-headline-md text-headline-md text-primary">
            Best Sellers
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product) => (
            <div
              key={product.name}
              className="group reveal reveal-up"
              style={{ transitionDelay: product.delay }}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-surface-container mb-6">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${product.image}')` }}
                  role="img"
                  aria-label={`${product.name} — ${product.material}`}
                />
                {/* Add to Cart Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <button className="w-full bg-primary/90 hover:bg-primary text-on-primary font-label-caps text-label-caps py-4 uppercase tracking-widest backdrop-blur-md transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-body-md text-primary mb-1">{product.name}</h4>
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    {product.material}
                  </p>
                </div>
                <span className="font-body-md text-primary">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
