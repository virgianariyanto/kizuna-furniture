"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Product Type Definition
interface Product {
  id: string;
  name: string;
  material: string;
  price: number;
  category: string;
  image: string;
  description: string;
  specs: string[];
}

// Cart Item Type Definition
interface CartItem {
  product: Product;
  quantity: number;
}

// Expanded premium Japandi products list
const products: Product[] = [
  {
    id: "sora-chair",
    name: "Sora Lounge Chair",
    material: "Ash & Linen",
    price: 1250,
    category: "Living",
    image: "/product-sora-chair.png",
    description: "Defined by its lightweight frame and plush upholstered cushions, the Sora Lounge Chair embodies Japandi minimalism. Its low profile and sloped seat invite relaxed contemplation and deep rest.",
    specs: ["W 78 x D 82 x H 72 cm", "Solid FSC Ash wood frame", "100% natural Belgian linen fabric", "Hand-finished organic oil coating"],
  },
  {
    id: "kuro-table",
    name: "Kuro Coffee Table",
    material: "Scorched Oak",
    price: 890,
    category: "Living",
    image: "/product-kuro-table.png",
    description: "The Kuro Coffee Table features a rich, deep charred finish inspired by traditional Japanese Shou Sugi Ban techniques. Bold geometry and soft curved details balance raw strength with quiet grace.",
    specs: ["Diameter 90 x H 38 cm", "Solid European White Oak", "Traditional hand-scorched finishing", "Natural protective beeswax coat"],
  },
  {
    id: "yumi-lamp",
    name: "Yumi Floor Lamp",
    material: "Brass & Paper",
    price: 420,
    category: "Lighting",
    image: "/product-yumi-lamp.png",
    description: "Casting a warm, diffuse light, the Yumi Floor Lamp features handmade washi paper panels supported by a sleek, hand-spun solid brass framework. A perfect marriage of classic craftsmanship and modern design.",
    specs: ["W 35 x D 35 x H 155 cm", "Handmade mulberry washi paper", "Solid brushed brass support stem", "E27 bulb compatible, integrated dimming"],
  },
  {
    id: "mori-sideboard",
    name: "Mori Sideboard",
    material: "White Oak",
    price: 2100,
    category: "Dining",
    image: "/product-mori-sideboard.png",
    description: "A masterclass in functional storage. The Mori Sideboard is crafted from premium White Oak and features sliding slatted doors that create an elegant, changing play of light and shadow in your room.",
    specs: ["W 160 x D 45 x H 75 cm", "Solid White Oak frame & veneer doors", "Soft-close quiet sliding track", "Adjustable interior shelving modules"],
  },
  {
    id: "haru-dining-table",
    name: "Haru Dining Table",
    material: "White Oak",
    price: 1650,
    category: "Dining",
    image: "/category-dining.png",
    description: "A natural focal point for dining and connection. The Haru Dining Table features clean lines, refined chamfered edge details, and robust trestle legs crafted entirely from white oak to seat family and friends.",
    specs: ["W 200 x D 90 x H 75 cm", "Solid European White Oak", "Seats up to 8 people comfortably", "Natural matte water-based polyurethane seal"],
  },
  {
    id: "tora-desk-chair",
    name: "Tora Desk Chair",
    material: "Walnut & Leather",
    price: 780,
    category: "Workspace",
    image: "/category-workspace.png",
    description: "Designed for mindful productivity. The Tora Desk Chair features an ergonomic molded plywood shell faced with premium black leather padding, supported by a solid walnut frame and rolling base.",
    specs: ["W 62 x D 60 x H 84 cm", "Molded walnut plywood shell", "Top-grain aniline soft leather upholstery", "Swivel base with silent castors"],
  },
  {
    id: "nami-easy-sofa",
    name: "Nami Easy Sofa",
    material: "Bouclé Crepe",
    price: 3200,
    category: "Living",
    image: "/category-living.png",
    description: "Sculptural forms meet ultimate lounge comfort. The Nami Easy Sofa offers low-slung, deep seating wrapped in a luxurious cream bouclé cover. Its organic curved silhouette flows naturally in modern spaces.",
    specs: ["W 220 x D 95 x H 68 cm", "High-resiliency foam and feather core", "Premium heavy-texture bouclé fabric", "Hidden solid wood base frame"],
  },
  {
    id: "shin-cabinet",
    name: "Shin Media Cabinet",
    material: "Scorched Oak",
    price: 1850,
    category: "Workspace",
    image: "/product-mori-sideboard.png",
    description: "Optimize your workspace or living room with style. The Shin Media Cabinet provides ample cord organization and sleek storage wrapped in beautiful scorched black oak slats.",
    specs: ["W 140 x D 40 x H 55 cm", "Scorched black oak veneer", "Integrated cable routing cutouts", "Sleek magnetic catch doors"],
  }
];

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [gridVisible, setGridVisible] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("kizuna-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data", e);
      }
    }
  }, []);

  // Save cart to localStorage when changed
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("kizuna-cart", JSON.stringify(newCart));
  };

  // Add Item to Cart
  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let newCart = [...cart];
    
    if (existingIndex >= 0) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({ product, quantity });
    }
    
    saveCart(newCart);
    setIsCartOpen(true); // Automatically open cart drawer
  };

  // Remove Item from Cart
  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
  };

  // Update Cart Quantity
  const updateCartQty = (productId: string, change: number) => {
    const newCart = cart.map((item) => {
      if (item.product.id === productId) {
        const newQty = item.quantity + change;
        return { ...item, quantity: newQty < 1 ? 1 : newQty };
      }
      return item;
    });
    saveCart(newCart);
  };

  // Filter & Sort Products
  const categories = ["All", "Living", "Dining", "Workspace", "Lighting"];

  // Handle Category Change with animation
  const handleCategoryChange = (category: string) => {
    setGridVisible(false);
    setTimeout(() => {
      setSelectedCategory(category);
      setGridVisible(true);
    }, 200);
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "All") return true;
    return p.category === selectedCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Price: Low to High") {
      return a.price - b.price;
    }
    if (sortBy === "Price: High to Low") {
      return b.price - a.price;
    }
    // Default (Featured / No Sort)
    return 0;
  });

  // Derived values
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="bg-surface min-h-screen flex flex-col font-body-md text-on-surface">
      {/* Dynamic Header */}
      <Header 
        cartCount={totalCartItems} 
        onCartClick={() => setIsCartOpen(true)} 
        activePage="Shop" 
        alwaysShow={true} 
      />

      <main className="flex-1">
        {/* ─── SHOP HERO BANNER ───────────────────────────────────────── */}
        <section className="bg-surface px-10 pt-40 pb-16 md:px-16 lg:px-20 lg:pt-48 xl:px-28">
          <div className="max-w-container-max mx-auto border-b border-outline-variant/20 pb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] block mb-3">
                  Kizuna Collection
                </span>
                <h1 className="font-display-lg text-primary text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none">
                  Shop All Pieces
                </h1>
              </div>
              <p className="max-w-md font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Curated minimalist furniture designed for intentional living. Hand-finished oak, natural linen, and timeless Japandi aesthetics.
              </p>
            </div>
          </div>
        </section>

        {/* ─── FILTERS & SORTING TOOLBAR ───────────────────────────────── */}
        <section className="px-10 py-6 md:px-16 lg:px-20 xl:px-28 bg-surface">
          <div className="max-w-container-max mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-outline-variant/10 pb-6 bg-surface">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`font-label-caps text-xs uppercase tracking-widest py-1.5 transition-all duration-300 relative ${
                    selectedCategory === category
                      ? "text-primary font-semibold border-b border-primary"
                      : "text-on-surface-variant/75 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3">
              <span className="font-label-caps text-[11px] uppercase tracking-wider text-on-surface-variant">
                Sort By
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-surface-container-low border border-outline-variant/30 px-4 py-2 pr-10 text-xs font-label-caps uppercase tracking-wider text-primary focus:outline-none focus:border-primary rounded-none cursor-pointer"
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none text-primary">
                  keyboard_arrow_down
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRODUCT GRID ───────────────────────────────────────────── */}
        <section className="px-10 py-12 md:px-16 lg:px-20 xl:px-28">
          <div className="max-w-container-max mx-auto">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-body-lg text-on-surface-variant mb-4">No pieces found in this category.</p>
                <button 
                  onClick={() => handleCategoryChange("All")}
                  className="font-label-caps text-xs uppercase tracking-widest border-b border-primary pb-1 text-primary hover:text-secondary transition-colors"
                >
                  View All Pieces
                </button>
              </div>
            ) : (
              <div 
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16 transition-opacity duration-300 ${
                  gridVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group flex flex-col justify-between"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-square overflow-hidden bg-surface-container mb-6 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ backgroundImage: `url('${product.image}')` }}
                        role="img"
                        aria-label={product.name}
                      />
                      {/* Action buttons overlay */}
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <div className="w-full flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                            }}
                            className="flex-1 bg-surface/90 hover:bg-surface text-primary font-label-caps text-[10px] py-3.5 uppercase tracking-widest backdrop-blur-md shadow-sm transition-all text-center border border-outline-variant/20"
                          >
                            Quick View
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, 1);
                            }}
                            className="flex-1 bg-primary text-on-primary hover:bg-secondary font-label-caps text-[10px] py-3.5 uppercase tracking-widest transition-all text-center shadow-sm"
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex justify-between items-start cursor-pointer" onClick={() => setSelectedProduct(product)}>
                      <div>
                        <h3 className="font-body-md font-medium text-primary mb-1 hover:text-secondary transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="font-label-caps text-[10px] tracking-wider text-on-surface-variant uppercase">
                          {product.material}
                        </p>
                      </div>
                      <span className="font-body-md text-primary font-medium">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* ─── QUICK VIEW MODAL ────────────────────────────────────────── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          {/* Modal Background Click to Close */}
          <div className="absolute inset-0" onClick={() => setSelectedProduct(null)} />
          
          {/* Modal Card */}
          <div className="relative bg-surface border border-outline-variant/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row z-10 animate-scale-up">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-20 bg-surface/80 hover:bg-surface text-primary rounded-full p-2 border border-outline-variant/20 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Left Column: Image */}
            <div className="w-full md:w-1/2 aspect-square bg-surface-container relative">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${selectedProduct.image}')` }}
                role="img"
                aria-label={selectedProduct.name}
              />
            </div>

            {/* Right Column: Info & Options */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between bg-surface-container-lowest">
              <div>
                <span className="font-label-caps text-[10px] text-secondary uppercase tracking-[0.25em] block mb-2">
                  {selectedProduct.category} Collection
                </span>
                <h2 className="font-display-lg text-primary text-3xl mb-1 leading-tight">
                  {selectedProduct.name}
                </h2>
                <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-6 pb-6 border-b border-outline-variant/10">
                  {selectedProduct.material}
                </p>

                <p className="font-body-md text-on-surface-variant leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>

                {/* Specs List */}
                <div className="mb-8">
                  <h4 className="font-label-caps text-[10px] uppercase tracking-widest text-primary mb-3 font-semibold">
                    Specifications
                  </h4>
                  <ul className="space-y-1.5 text-xs text-on-surface-variant/90">
                    {selectedProduct.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-secondary-fixed-dim" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-6 pt-6 border-t border-outline-variant/10">
                  <span className="font-label-caps text-xs uppercase tracking-widest text-on-surface-variant">Price</span>
                  <span className="font-display-lg text-2xl text-primary font-medium">
                    ${selectedProduct.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct, 1);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-primary text-on-primary hover:bg-secondary font-label-caps text-xs py-4 uppercase tracking-widest transition-all text-center"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-6 border border-outline-variant/30 hover:border-primary text-primary font-label-caps text-xs py-4 uppercase tracking-widest transition-all"
                  >
                    Keep Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── SHOPPING CART DRAWER ────────────────────────────────────── */}
      <div 
        className={`fixed inset-0 z-[120] transition-opacity duration-500 ease-in-out ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />

        {/* Drawer container */}
        <div 
          className={`absolute inset-y-0 right-0 w-full max-w-md bg-surface border-l border-outline-variant/20 shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-in-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
              <h2 className="font-label-caps text-xs font-semibold uppercase tracking-widest text-primary">
                Your Bag ({totalCartItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="hover:opacity-70 transition-opacity text-primary p-2 flex items-center justify-center"
              aria-label="Close cart"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-outline-variant/60 text-4xl mb-3">shopping_bag</span>
                <p className="font-body-md text-on-surface-variant mb-6">Your shopping bag is currently empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="font-label-caps text-[10px] uppercase tracking-widest bg-primary text-on-primary px-8 py-3.5 hover:bg-secondary transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 pb-6 border-b border-outline-variant/10">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-surface-container relative shrink-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.product.image}')` }}
                      role="img"
                      aria-label={item.product.name}
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-body-md font-medium text-primary leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-on-surface-variant hover:text-error text-xs"
                          aria-label="Remove item"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                      <p className="font-label-caps text-[9px] uppercase tracking-wider text-on-surface-variant mt-0.5">
                        {item.product.material}
                      </p>
                    </div>

                    <div className="flex justify-between items-end">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-outline-variant/30 text-xs">
                        <button
                          onClick={() => updateCartQty(item.product.id, -1)}
                          className="px-2.5 py-1 hover:bg-surface-container transition-colors text-primary font-medium"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-label-caps font-semibold text-primary">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.product.id, 1)}
                          className="px-2.5 py-1 hover:bg-surface-container transition-colors text-primary font-medium"
                        >
                          +
                        </button>
                      </div>
                      {/* Price */}
                      <span className="font-body-md text-primary font-medium">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-outline-variant/10 bg-surface-container-lowest">
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-caps text-xs uppercase tracking-widest text-on-surface-variant">Subtotal</span>
                <span className="font-body-lg text-lg text-primary font-semibold">
                  ${cartSubtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[10px] text-on-surface-variant/80 mb-6">
                Shipping and taxes calculated at checkout. Enjoy complimentary shipping on orders over $1,500.
              </p>
              
              <button
                onClick={() => alert("Checkout integration placeholder. Thank you for shopping with Kizuna!")}
                className="w-full bg-primary text-on-primary hover:bg-secondary font-label-caps text-xs py-4.5 uppercase tracking-widest transition-all text-center shadow-md font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
