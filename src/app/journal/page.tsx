"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Article Interface
interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[]; // List of paragraphs/quotes/headings for rich rendering
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

// Articles Mock Dataset
const articles: Article[] = [
  {
    id: "designing-stillness",
    title: "Designing for Stillness: The Philosophy of Japandi Homes",
    category: "Space Design",
    date: "June 14, 2026",
    readTime: "6 min read",
    image: "/hero.png",
    excerpt: "Discover the deep intersection of Scandinavian functionalism and Japanese wabi-sabi. Learn how spatial layout and texture selection foster quiet contemplation.",
    content: [
      "h2: The Intersection of Two Worlds",
      "p: At first glance, Copenhagen and Kyoto may seem separated by vast geographical and cultural differences. However, in the realm of interior architecture, they share a singular, deep belief: that our homes should be quiet sanctuaries constructed with honesty, simplicity, and respect for nature.",
      "p: This quiet alignment is what we call Japandi—the synthesis of Scandinavian functionalism (Lagom and Hygge) and Japanese wabi-sabi (finding beauty in impermanence and imperfection). It is not merely a style; it is an intentional state of mind.",
      "quote: 'Simplicity is not the lack of clutter, but the presence of clarity.'",
      "h2: The Power of Spatial Layout",
      "p: In a Japandi space, what is left empty is as important as what is filled. In Japanese design, this concept is known as 'Ma' (negative space). It is the silence between notes that makes the music. By keeping furniture low-slung, ensuring pathways are unobstructed, and allowing light to flow freely, we create physical and mental breathing room.",
      "p: Low-profile seating, such as the Sora Lounge Chair, keeps the eye aligned lower to the ground. This simple shifts creates a grounding sensation that encourages restfulness and makes rooms feel taller and more spacious.",
      "h2: Textures that Speak",
      "p: To prevent minimalism from feeling sterile, Japandi relies heavily on rich, organic textures. We look to matte, open-grained woods like White Oak and Ash, slubby Belgian linen, and heavily textured cream bouclé crepe. These materials age beautifully, wearing their history as a badge of honor.",
      "p: When designing your home, seek to create soft contrasts. Pair a solid, dark Shou Sugi Ban scorched oak coffee table with a light, linen-clad lounge chair. Allow light from a paper lamp to diffuse softly over these surfaces, celebrating the natural variations of wood, fiber, and shadow."
    ]
  },
  {
    id: "art-washi-paper",
    title: "The Art of Washi Paper: Lighting the Modern Space",
    category: "Craftsmanship",
    date: "May 28, 2026",
    readTime: "4 min read",
    image: "/product-yumi-lamp.png",
    excerpt: "Exploring the delicate balance of handmade mulberry paper and brushed brass in contemporary lighting systems.",
    content: [
      "h2: Light is the Soul of Space",
      "p: In interior design, light should never be an afterthought. It is the invisible texture that defines how every other material is perceived. Traditional Japanese lighting relies heavily on Washi (mulberry paper) screens and lanterns, which filter harsh bulb light into a warm, uniform, and ethereal glow.",
      "p: Washi paper has been handmade in Japan for over a thousand years. Unlike wood-pulp papers, washi is made from the long fibers of the mulberry tree, which gives it a distinct fibrous texture that scatters light dynamically.",
      "quote: 'Light does not merely illuminate; it shapes our emotional relationship with our shelter.'",
      "h2: Balancing Old and New",
      "p: Modern lighting designs, like the Yumi Floor Lamp, bring this ancient paper craft into the contemporary era by pairing it with refined solid brass stems. The heavy, polished, and structured nature of brass stands in beautiful contrast to the lightweight, soft, and textured paper shade.",
      "p: Placing a paper floor lamp in a corner or beside low seating invites a gentle, calming aura that helps the brain transition from the high-contrast glare of screens to a state of soft relaxation."
    ]
  },
  {
    id: "oak-vs-ash",
    title: "Selecting Wood: White Oak vs. Ash in Minimalist Design",
    category: "Material Science",
    date: "April 12, 2026",
    readTime: "5 min read",
    image: "/category-dining.png",
    excerpt: "Understanding the grain structures, durability, and spatial warmth differences between European white oak and premium ash wood.",
    content: [
      "h2: Honesty in Lumber",
      "p: Wood is the core language of furniture design. It holds the history of the forest and carries organic life into our living spaces. In Japandi furniture, two wood types stand above all others: White Oak and Ash.",
      "p: While both are dense, durable hardwoods, they carry distinct visual signatures that affect the vibe of a room.",
      "h2: White Oak: Warmth and Weight",
      "p: European White Oak is legendary for its structural strength and tight grain. It has a medium-to-dark warm golden hue that adds immediate weight and quiet luxury to a space. It features beautiful ray flecks (the reflective lines in the wood grain) that give it a rich, multidimensional character.",
      "p: Designs like the Mori Sideboard and Haru Dining Table use White Oak to convey stability and legacy—pieces meant to be touched, used, and passed down generations.",
      "h2: Ash Wood: Light and Linearity",
      "p: Ash, by contrast, is much lighter in color, ranging from creamy white to pale straw. It features a bold, open, and linear grain pattern that looks extremely clean and modern. Ash is incredibly flexible and shock-resistant, making it perfect for bentwood designs and lightweight seating, like the Sora Lounge Chair.",
      "p: Choose Ash for smaller spaces or rooms where you want to maximize light. Choose Oak when you want to establish architectural grounding and visual depth."
    ]
  },
  {
    id: "mindful-spacing",
    title: "Mindful Spacing: Decluttering for Mental Clarity",
    category: "Lifestyle",
    date: "March 19, 2026",
    readTime: "4 min read",
    image: "/category-living.png",
    excerpt: "Practical insights on how furniture placement and open spatial lines affect daily focus and emotional rest.",
    content: [
      "h2: The Geometry of Peace",
      "p: Our brains are constantly processing the geometry of our environments. A cluttered room with cramped walkways triggers a subtle, ongoing stress response, while a room designed with generous negative space invites the nervous system to settle.",
      "p: In Japandi design, we practice 'intentional placement.' Every piece of furniture is chosen with a specific functional purpose and placed to allow energy and movement to flow freely.",
      "quote: 'To declutter is not to throw things away, but to decide what deserves space in your life.'",
      "h2: Key Spacing Rules",
      "p: 1. **Leave the Center Open**: Avoid placing heavy pieces in the direct center of paths. Keep coffee tables low and relatively compact.",
      "p: 2. **Allow breathing room around walls**: Pull sofas and sideboards a few inches away from the wall to create shadows and a feeling of airiness.",
      "p: 3. **Prioritize sightlines**: Situate seating to face window views or open doorways rather than blocking them. This expands the perceived horizon of your room."
    ]
  },
  {
    id: "sustainability-legacy",
    title: "FSC Timber: The Legacy of Sustainable Furniture",
    category: "Sustainability",
    date: "February 02, 2026",
    readTime: "7 min read",
    image: "/category-workspace.png",
    excerpt: "A deep dive into why responsibly harvested forestry is the foundation of long-term sustainable craft.",
    content: [
      "h2: Designing for Generations",
      "p: True sustainability is not a marketing term; it is the ultimate expression of craft. A piece of furniture is only sustainable if it is built to last longer than the tree took to grow, and if the harvesting of that tree left the forest healthy and thriving.",
      "p: This is why we exclusively use FSC (Forest Stewardship Council) certified timber. FSC certification ensures that wood is harvested from forests managed to preserve biodiversity, sustain the local economy, and protect wildlife habitats.",
      "h2: The Craft of Repair",
      "p: Beyond sourcing, sustainable design means choosing natural wood oils instead of thick plastic sealants. By hand-finishing our oak with organic oils, the wood remains breathing and active. If it gets scratched or stained, it can be sanded down and re-oiled, rather than discarded.",
      "p: Fast furniture is made to be replaced; Kizuna pieces are made to be repaired, loved, and passed down. That is our legacy."
    ]
  }
];

export default function Journal() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

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

  const featured = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <div className="bg-surface min-h-screen flex flex-col font-body-md text-on-surface">
      {/* Navbar */}
      <Header
        cartCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
        activePage="Journal"
        alwaysShow={true}
      />

      <main className="flex-1">
        {/* ─── HERO HEADER ────────────────────────────────────────────── */}
        <section className="bg-surface px-10 pt-40 pb-12 md:px-16 lg:px-20 lg:pt-48 xl:px-28">
          <div className="max-w-container-max mx-auto border-b border-outline-variant/20 pb-10">
            <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.3em] block mb-3">
              Kizuna Essays
            </span>
            <h1 className="font-display-lg text-primary text-4xl md:text-6xl tracking-tight leading-none mb-4">
              The Journal
            </h1>
            <p className="max-w-md font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Essays on intentional space design, ancestral woodwork craftsmanship, and the quiet art of wabi-sabi living.
            </p>
          </div>
        </section>

        {/* ─── FEATURED POST ──────────────────────────────────────────── */}
        {featured && (
          <section className="px-10 py-6 md:px-16 lg:px-20 xl:px-28">
            <div className="max-w-container-max mx-auto">
              <div 
                className="group flex flex-col lg:flex-row gap-8 lg:gap-16 items-center cursor-pointer"
                onClick={() => setActiveArticle(featured)}
              >
                {/* Image */}
                <div className="w-full lg:w-[58%] aspect-[16/10] overflow-hidden bg-surface-container relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-103"
                    style={{ backgroundImage: `url('${featured.image}')` }}
                    role="img"
                    aria-label={featured.title}
                  />
                  <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                </div>
                
                {/* Content */}
                <div className="w-full lg:w-[38%] flex flex-col justify-center">
                  <div className="flex items-center gap-3 font-label-caps text-[10px] uppercase tracking-wider text-secondary font-semibold mb-3">
                    <span>{featured.category}</span>
                    <span className="text-outline-variant/60">·</span>
                    <span className="text-on-surface-variant">{featured.date}</span>
                  </div>
                  
                  <h2 className="font-display-lg text-2xl md:text-3xl text-primary mb-4 leading-tight group-hover:text-secondary transition-colors duration-300">
                    {featured.title}
                  </h2>
                  
                  <p className="font-body-md text-on-surface-variant leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>

                  <div className="flex items-center gap-2 font-label-caps text-[10px] uppercase tracking-widest text-primary font-semibold border-b border-primary self-start pb-0.5 group-hover:text-secondary group-hover:border-secondary transition-all">
                    <span>Read Essay</span>
                    <span className="text-[12px]">{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── ESSAY GRID ─────────────────────────────────────────────── */}
        <section className="px-10 py-24 md:px-16 lg:px-20 xl:px-28 border-t border-outline-variant/15 mt-16 bg-surface-container-low/40">
          <div className="max-w-container-max mx-auto">
            <h3 className="font-label-caps text-label-caps text-primary uppercase tracking-[0.25em] mb-12 block font-semibold text-center md:text-left">
              Recent Essays
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {gridArticles.map((art) => (
                <div
                  key={art.id}
                  className="group flex flex-col justify-between cursor-pointer"
                  onClick={() => setActiveArticle(art)}
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="aspect-[4/3] bg-surface-container overflow-hidden mb-6 relative">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ backgroundImage: `url('${art.image}')` }}
                        role="img"
                        aria-label={art.title}
                      />
                    </div>

                    <div className="flex items-center gap-2 font-label-caps text-[9px] uppercase tracking-wider text-secondary font-semibold mb-2">
                      <span>{art.category}</span>
                      <span className="text-outline-variant/60">·</span>
                      <span className="text-on-surface-variant">{art.date}</span>
                    </div>

                    <h4 className="font-body-md font-semibold text-primary mb-3 leading-snug group-hover:text-secondary transition-colors duration-300">
                      {art.title}
                    </h4>

                    <p className="font-body-md text-xs text-on-surface-variant leading-relaxed line-clamp-3 mb-4">
                      {art.excerpt}
                    </p>
                  </div>

                  <span className="font-label-caps text-[10px] uppercase tracking-widest text-primary font-medium border-b border-primary/20 pb-0.5 self-start group-hover:border-primary transition-all">
                    Read · {art.readTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ─── IMMERSIVE READING MODAL ─────────────────────────────────── */}
      {activeArticle && (
        <div className="fixed inset-0 z-[130] flex items-center justify-end bg-black/40 backdrop-blur-sm animate-fade-in">
          {/* Backdrop Click to Close */}
          <div className="absolute inset-0" onClick={() => setActiveArticle(null)} />
          
          {/* Reading Drawer (Slides from Right, covers significant portion of screen for immersive reading) */}
          <div className="relative bg-surface w-full max-w-3xl h-full shadow-2xl overflow-y-auto flex flex-col z-10 animate-scale-up border-l border-outline-variant/20">
            {/* Header Toolbar */}
            <div className="sticky top-0 bg-surface/90 backdrop-blur-md px-8 py-6 border-b border-outline-variant/10 flex items-center justify-between z-20">
              <span className="font-label-caps text-[10px] text-secondary uppercase tracking-[0.2em] font-semibold">
                Kizuna Reading Room
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="hover:opacity-70 transition-opacity text-primary p-2 flex items-center justify-center border border-outline-variant/20 rounded-full bg-surface"
                aria-label="Close reader"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Reading Content */}
            <div className="px-8 py-12 md:px-16 max-w-2xl mx-auto flex-1">
              {/* Article Header */}
              <div className="text-center mb-10">
                <span className="font-label-caps text-[11px] text-secondary uppercase tracking-widest block mb-3 font-semibold">
                  {activeArticle.category}
                </span>
                <h1 className="font-display-lg text-primary text-3xl md:text-4xl leading-tight mb-4">
                  {activeArticle.title}
                </h1>
                <div className="flex items-center justify-center gap-3 text-xs text-on-surface-variant font-label-caps">
                  <span>{activeArticle.date}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Cover Image in Reader */}
              <div className="w-full aspect-[16/9] bg-surface-container overflow-hidden mb-12 shadow-sm">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${activeArticle.image}')` }}
                />
              </div>

              {/* Rich Body Content */}
              <div className="prose prose-neutral max-w-none space-y-6 pb-24">
                {activeArticle.content.map((block, index) => {
                  const [type, ...textParts] = block.split(":");
                  const text = textParts.join(":");
                  
                  if (type === "h2") {
                    return (
                      <h2 key={index} className="font-display-lg text-xl md:text-2xl text-primary pt-6 font-semibold border-t border-outline-variant/10 mt-8 mb-4">
                        {text}
                      </h2>
                    );
                  }
                  if (type === "quote") {
                    return (
                      <blockquote key={index} className="border-l-2 border-secondary pl-6 py-2 my-8 italic font-display-lg text-lg text-secondary leading-relaxed bg-surface-container-lowest pr-4">
                        {text}
                      </blockquote>
                    );
                  }
                  // Default to paragraph
                  return (
                    <p key={index} className="font-body-md text-on-surface-variant leading-relaxed text-[15px] text-justify md:text-left">
                      {text}
                    </p>
                  );
                })}
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
