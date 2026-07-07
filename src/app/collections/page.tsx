"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Types
interface ProductHighlight {
  name: string;
  price: number;
  image: string;
  material: string;
}

interface Collection {
  id: string;
  num: string;
  name: string;
  title: string;
  description: string;
  materials: string;
  image: string;
  highlights: ProductHighlight[];
}

interface CartItem {
  product: {
    id: string;
    name: string;
    material: string;
    price: number;
    image: string;
  };
  quantity: number;
}

// Collections Dataset
const collections: Collection[] = [
  {
    id: "Living",
    num: "01",
    name: "Living Space",
    title: "The Lounge Collection",
    description: "Rooted in simplicity, our living space collection focuses on low-slung profiles, soft organic curves, and natural textures. Designed to cultivate pauses, calm, and connection in the heart of your home.",
    materials: "FSC Ash Wood · Belgian Linen · Bouclé Crepe",
    image: "/category-living.png",
    highlights: [
      {
        name: "Sora Lounge Chair",
        price: 1250,
        image: "/product-sora-chair.png",
        material: "Ash & Linen"
      },
      {
        name: "Kuro Coffee Table",
        price: 890,
        image: "/product-kuro-table.png",
        material: "Scorched Oak"
      }
    ]
  },
  {
    id: "Dining",
    num: "02",
    name: "Dining Space",
    title: "The Gathering Collection",
    description: "Celebrating the shared art of connection, our dining room collection focuses on clean joinery, durable solid oak, and tactile warmth. Trestle foundations and chamfered details make every meal intentional.",
    materials: "Solid White Oak · Matte Protective Lacquer",
    image: "/category-dining.png",
    highlights: [
      {
        name: "Mori Sideboard",
        price: 2100,
        image: "/product-mori-sideboard.png",
        material: "White Oak"
      },
      {
        name: "Haru Dining Table",
        price: 1650,
        image: "/category-dining.png",
        material: "White Oak"
      }
    ]
  },
  {
    id: "Workspace",
    num: "03",
    name: "Workspace Space",
    title: "The Focus Collection",
    description: "A quiet sanctuary for mindful productivity. Ergonomically shaped walnut shells, top-grain leathers, and deep scorched oak textures support focused workflows and create a tactile sense of order.",
    materials: "Molded Walnut · Scorched Oak · Top-Grain Aniline Leather",
    image: "/category-workspace.png",
    highlights: [
      {
        name: "Tora Desk Chair",
        price: 780,
        image: "/category-workspace.png",
        material: "Walnut & Leather"
      },
      {
        name: "Shin Media Cabinet",
        price: 1850,
        image: "/product-mori-sideboard.png",
        material: "Scorched Oak"
      }
    ]
  },
  {
    id: "Lighting",
    num: "04",
    name: "Lighting & Accents",
    title: "The Aura Collection",
    description: "Light is the soul of space. Using traditional mulberry washi paper panels and hand-spun solid brass, this lighting collection diffuses a soft, warm glow that shapes the quiet atmosphere of your home.",
    materials: "Mulberry Washi Paper · Brushed Brass · Copper Accents",
    image: "/product-yumi-lamp.png",
    highlights: [
      {
        name: "Yumi Floor Lamp",
        price: 420,
        image: "/product-yumi-lamp.png",
        material: "Brass & Paper"
      },
      {
        name: "Sora Lounge Chair",
        price: 1250,
        image: "/product-sora-chair.png",
        material: "Ash & Linen"
      }
    ]
  }
];

export default function Collections() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
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

  // Save cart changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("kizuna-cart", JSON.stringify(newCart));
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
  };

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

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="bg-surface min-h-screen flex flex-col font-body-md text-on-surface">
      {/* Navbar */}
      <Header
        cartCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
        activePage="Collections"
        alwaysShow={true}
      />

      <main className="flex-1">
        {/* ─── HERO HEADER ────────────────────────────────────────────── */}
        <section className="bg-surface px-10 pt-40 pb-16 md:px-16 lg:px-20 lg:pt-48 xl:px-28">
          <div className="max-w-container-max mx-auto text-center md:text-left">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] block mb-3">
              Curated Spaces
            </span>
            <h1 className="font-display-lg text-primary text-4xl md:text-6xl tracking-tight leading-none mb-6">
              The Collections
            </h1>
            <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Explore intentional living room, dining, workspace, and lighting environments. Each collection is carefully designed to bring harmony, quiet luxury, and Scandinavian-Japanese simplicity into your home.
            </p>
          </div>
        </section>

        {/* ─── CURATED SHOWCASES ───────────────────────────────────────── */}
        <section className="px-10 py-12 md:px-16 lg:px-20 xl:px-28">
          <div className="max-w-container-max mx-auto space-y-32 md:space-y-48">
            {collections.map((col, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={col.id}
                  className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between"
                >
                  {/* Left Column: Visual Showcase (Alternating positions) */}
                  <div
                    className={`w-full lg:w-[50%] aspect-[3/4] relative overflow-hidden bg-surface-container shadow-sm group cursor-pointer ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url('${col.image}')` }}
                      role="img"
                      aria-label={`${col.name} showcase`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Right Column: Editorial Text (Alternating positions) */}
                  <div
                    className={`w-full lg:w-[42%] flex flex-col justify-center ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    {/* Numeral indicator */}
                    <span className="font-display-lg text-[64px] leading-none text-outline-variant/40 block mb-4 select-none">
                      {col.num}
                    </span>
                    
                    <h2 className="font-label-caps text-xs uppercase tracking-[0.25em] text-secondary font-semibold mb-2">
                      {col.name}
                    </h2>
                    
                    <h3 className="font-display-lg text-3xl md:text-4xl text-primary mb-6 leading-tight">
                      {col.title}
                    </h3>
                    
                    <p className="font-body-md text-on-surface-variant leading-relaxed mb-6">
                      {col.description}
                    </p>

                    <div className="mb-8 pb-8 border-b border-outline-variant/20">
                      <span className="font-label-caps text-[9px] uppercase tracking-wider text-on-surface-variant font-semibold block mb-2">
                        Featured Palette & Materials
                      </span>
                      <p className="text-xs text-primary font-medium">{col.materials}</p>
                    </div>

                    {/* Small Product Highlights */}
                    <div className="mb-10">
                      <h4 className="font-label-caps text-[9px] uppercase tracking-wider text-primary font-semibold block mb-4">
                        Collection Highlights
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {col.highlights.map((prod, i) => (
                          <Link 
                            key={i} 
                            href={`/shop?category=${col.id}`}
                            className="flex items-center gap-3 group/prod p-2 border border-outline-variant/15 bg-surface-container-lowest/60 hover:bg-surface-container-lowest hover:border-primary/20 transition-all duration-300"
                          >
                            <div className="w-12 h-12 bg-surface-container relative shrink-0 overflow-hidden">
                              <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/prod:scale-105"
                                style={{ backgroundImage: `url('${prod.image}')` }}
                              />
                            </div>
                            <div className="min-w-0">
                              <h5 className="font-body-md text-[13px] font-medium text-primary truncate leading-tight group-hover/prod:text-secondary transition-colors duration-300">
                                {prod.name}
                              </h5>
                              <span className="font-label-caps text-[10px] text-on-surface-variant">
                                ${prod.price.toLocaleString()}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/shop?category=${col.id}`}
                      className="btn-hover-invert inline-block self-start bg-primary px-8 py-4 font-label-caps text-xs uppercase tracking-widest text-on-primary"
                    >
                      Explore {col.name}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />

      {/* ─── SHOPPING CART DRAWER ────────────────────────────────────── */}
      <div 
        className={`fixed inset-0 z-[120] transition-opacity duration-500 ease-in-out ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />

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
                  Continue Browsing
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.product.id} className="flex gap-4 pb-6 border-b border-outline-variant/10">
                  <div className="w-20 h-20 bg-surface-container relative shrink-0">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.product.image}')` }}
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-body-md font-medium text-primary leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-on-surface-variant hover:text-error text-xs"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                      <p className="font-label-caps text-[9px] uppercase tracking-wider text-on-surface-variant mt-0.5">
                        {item.product.material}
                      </p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-outline-variant/30 text-xs">
                        <button
                          onClick={() => updateCartQty(item.product.id, -1)}
                          className="px-2.5 py-1 hover:bg-surface-container transition-colors text-primary"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-label-caps font-semibold text-primary">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.product.id, 1)}
                          className="px-2.5 py-1 hover:bg-surface-container transition-colors text-primary"
                        >
                          +
                        </button>
                      </div>
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
