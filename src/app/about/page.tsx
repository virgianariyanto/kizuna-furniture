"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export default function About() {
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
        activePage="About"
        alwaysShow={true}
      />

      <main className="flex-1">
        {/* ─── HERO HEADER ────────────────────────────────────────────── */}
        <section className="bg-surface px-10 pt-40 pb-16 md:px-16 lg:px-20 lg:pt-48 xl:px-28">
          <div className="max-w-container-max mx-auto text-center md:text-left">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] block mb-3">
              About Kizuna
            </span>
            <h1 className="font-display-lg text-primary text-4xl md:text-6xl tracking-tight leading-none mb-6">
              Our Story
            </h1>
            <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Kizuna was founded on a simple premise: that our immediate environments deeply shape our inner peace. We design furniture that serves as a quiet canvas for intentional living.
            </p>
          </div>
        </section>

        {/* ─── SECTION 1: THE PHILOSOPHY (SPLIT) ───────────────────────── */}
        <section className="px-10 py-16 md:px-16 lg:px-20 xl:px-28 border-t border-outline-variant/15">
          <div className="max-w-container-max mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            {/* Story text */}
            <div className="w-full lg:w-1/2">
              <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest block mb-4 font-semibold">
                Design Ethos
              </span>
              <h2 className="font-display-lg text-2xl md:text-3xl text-primary mb-6 leading-tight">
                Where Copenhagen Meets Kyoto
              </h2>
              <div className="space-y-4 text-on-surface-variant leading-relaxed">
                <p>
                  Kizuna (絆) means 'bond' or 'connection' in Japanese. For us, this name represents the vital link between human craftsmanship, natural materials, and the spaces we inhabit.
                </p>
                <p>
                  Our designs are born at the intersection of Scandinavian functionality and Japanese wabi-sabi philosophy. We believe that furniture should not shout for attention. Instead, it should quietly support daily rituals—a morning cup of tea, hours of focused work, or a shared family dinner.
                </p>
                <p>
                  By focusing on clean joints, soft organic curves, and structural longevity, we create furniture that feels grounding, spacious, and honest.
                </p>
              </div>
            </div>

            {/* Showcase Image */}
            <div className="w-full lg:w-1/2 aspect-[4/3] bg-surface-container relative overflow-hidden shadow-sm">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/hero.png')" }}
                role="img"
                aria-label="Sun-drenched minimalist Japandi living room"
              />
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: HONEST MATERIALS ─────────────────────────────── */}
        <section className="px-10 py-24 md:px-16 lg:px-20 xl:px-28 bg-surface-container-low/30 border-t border-b border-outline-variant/15">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16">
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] block mb-3">
                Craft Foundations
              </span>
              <h2 className="font-display-lg text-2xl md:text-3xl text-primary font-medium">
                Honest Materials
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Material 1 */}
              <div className="bg-surface border border-outline-variant/15 p-8 flex flex-col justify-between aspect-[3/4]">
                <div>
                  <span className="font-display-lg text-2xl text-outline-variant/60 block mb-6">01</span>
                  <h3 className="font-label-caps text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                    European White Oak
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Sourced from sustainably managed forests in France and Germany. White Oak is prized for its high density, warm golden tones, and robust grain patterns. Finished with natural plant-based oils that let the timber breathe.
                  </p>
                </div>
                <div className="h-16 bg-surface-container-low mt-8 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/category-dining.png')" }} />
              </div>

              {/* Material 2 */}
              <div className="bg-surface border border-outline-variant/15 p-8 flex flex-col justify-between aspect-[3/4]">
                <div>
                  <span className="font-display-lg text-2xl text-outline-variant/60 block mb-6">02</span>
                  <h3 className="font-label-caps text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                    Mulberry Washi Paper
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Handmade by artisans using ancestral fibers of the mulberry tree. Unlike Western wood-pulp papers, washi scatters light organically across its textured fibers, creating a diffuse, warm aura in place of harsh glare.
                  </p>
                </div>
                <div className="h-16 bg-surface-container-low mt-8 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/product-yumi-lamp.png')" }} />
              </div>

              {/* Material 3 */}
              <div className="bg-surface border border-outline-variant/15 p-8 flex flex-col justify-between aspect-[3/4]">
                <div>
                  <span className="font-display-lg text-2xl text-outline-variant/60 block mb-6">03</span>
                  <h3 className="font-label-caps text-xs uppercase tracking-widest text-primary font-semibold mb-4">
                    Belgian Flax Linen
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    100% natural, slubby flax linen woven in traditional Belgian mills. Highly breathable and hypoallergenic, our linen grows softer and more comfortable with use, developing a rich lived-in character.
                  </p>
                </div>
                <div className="h-16 bg-surface-container-low mt-8 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/product-sora-chair.png')" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: SUSTAINABILITY & VALUE ───────────────────────── */}
        <section className="px-10 py-24 md:px-16 lg:px-20 xl:px-28">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              <div>
                <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest block mb-4 font-semibold">
                  Responsibility
                </span>
                <h2 className="font-display-lg text-2xl md:text-3xl text-primary mb-6 leading-tight">
                  Built to Outlive the Tree
                </h2>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  Fast furniture is designed to be replaced, contributing to landfill waste and rapid deforestation. At Kizuna, our core metric of sustainability is **longevity**. We design joinery and select solid timbers so that each sideboard, dining table, and chair can outlive the tree it was crafted from.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-label-caps text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                    FSC Forestry
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Every piece of timber we cut is FSC-certified, ensuring healthy forest regeneration, local economic support, and wildlife preservation.
                  </p>
                </div>

                <div>
                  <h3 className="font-label-caps text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                    Organic Finishes
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    We use zero-VOC, natural seed-oils and wax. It is safe for homes, children, and pets, and allows wood to be easily spot-sanded and repaired.
                  </p>
                </div>

                <div>
                  <h3 className="font-label-caps text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                    Quiet Supply Chains
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    We source, cut, and finish lumber close to our workshops, eliminating unnecessary transportation carbon footprint.
                  </p>
                </div>

                <div>
                  <h3 className="font-label-caps text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                    Modular Integrity
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Hardware, brackets, and cushions are modular. If a cushion wears or a joint loosens, it is easily replaced without discarding the frame.
                  </p>
                </div>
              </div>
            </div>
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
