"use client";

import { useState } from "react";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section
      className="relative flex h-screen min-h-[700px] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ─── LEFT PANEL ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex w-full flex-col justify-center bg-surface px-10 py-32 md:px-16 lg:w-[45%] lg:px-20 xl:px-28">

        {/* Ghost numeral — decorative background element */}
        <span
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display-lg leading-none text-on-surface/[0.04]"
          style={{ fontSize: "clamp(140px, 15vw, 240px)" }}
          aria-hidden="true"
        >
          01
        </span>

        {/* Eyebrow label */}
        {/* <div
          className="hero-item mb-10 flex items-center gap-4"
          style={{ animationDelay: "0ms" }}
        >
          <div className="h-[1px] w-10 bg-secondary" />
          <span className="font-label-caps text-label-caps uppercase tracking-[0.3em] text-secondary">
            New Collection · 2024
          </span>
        </div> */}

        {/* Headline — mixed roman + italic */}
        <h1
          className="hero-item mb-8 font-display-lg text-primary"
          style={{
            fontSize: "clamp(44px, 5.2vw, 76px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            animationDelay: "80ms",
          }}
        >
          <span className="block">Artistry</span>
          <span className="block italic text-secondary">in Every</span>
          <span className="block">Detail.</span>
        </h1>

        {/* Decorative rule with dot */}
        <div
          className="hero-item mb-8 flex items-center gap-3"
          style={{ animationDelay: "180ms" }}
          aria-hidden="true"
        >
          <div className="h-[1px] w-14 bg-outline-variant" />
          <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
        </div>

        {/* Body text */}
        <p
          className="hero-item mb-10 max-w-sm font-body-lg text-body-lg text-on-surface-variant"
          style={{ animationDelay: "260ms" }}
        >
          Curated minimalist furniture for the modern home. Where Scandinavian
          functionality meets Japanese rustic charm.
        </p>

        {/* CTAs */}
        <div
          className="hero-item mb-16 flex flex-wrap items-center gap-6"
          style={{ animationDelay: "360ms" }}
        >
          <a
            className="btn-hover-invert inline-block bg-primary px-10 py-5 font-label-caps text-label-caps uppercase tracking-widest text-on-primary"
            href="#shop"
          >
            Explore Collection
          </a>
          <a
            className="relative font-label-caps text-label-caps uppercase tracking-widest text-primary transition-colors duration-300 hover:text-secondary nav-underline"
            href="#"
          >
            View Lookbook
          </a>
        </div>

        {/* Category tags */}
        <div
          className="hero-item flex items-center gap-2"
          style={{ animationDelay: "440ms" }}
        >
          {["Living", "Dining", "Workspace", "Lighting"].map((cat, i, arr) => (
            <span key={cat} className="flex items-center gap-2">
              <a
                href="#"
                className="font-label-caps text-[10px] uppercase tracking-[0.25em] text-on-surface-variant transition-colors duration-300 hover:text-primary"
              >
                {cat}
              </a>
              {i < arr.length - 1 && (
                <span className="text-outline-variant/60 text-xs">·</span>
              )}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-10 hidden flex-col items-center gap-2 md:flex lg:left-20 xl:left-28">
          <span className="font-label-caps text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/60">
            Scroll
          </span>
          <div className="scroll-indicator h-8 w-[1px] bg-outline-variant" />
        </div>
      </div>

      {/* ─── RIGHT PANEL ────────────────────────────────────────────── */}
      <div className="relative hidden flex-1 lg:block">
        {/* Parallax hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero.png')",
            transform: `scale(1.06) translate(${(mousePos.x - 0.5) * -10}px, ${(mousePos.y - 0.5) * -10}px)`,
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          role="img"
          aria-label="Sun-drenched Japandi living room with white oak furniture"
        />

        {/* Left-edge gradient — seamless blend with left panel */}
        <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />

        {/* Top vignette */}
        <div className="absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-surface/30 to-transparent" />

        {/* ── Floating Material Card ── */}
        <div
          className="hero-item absolute bottom-16 left-10 z-20 max-w-[200px] border border-outline-variant/30 bg-surface/80 px-5 py-4 shadow-sm backdrop-blur-xl"
          style={{ animationDelay: "600ms" }}
        >
          <p className="mb-1.5 font-label-caps text-[9px] uppercase tracking-[0.3em] text-secondary">
            Featured Material
          </p>
          <p className="mb-0.5 font-headline-sm text-[17px] leading-tight text-primary">
            White Oak
          </p>
          <p className="font-body-md text-[12px] text-on-surface-variant">
            FSC-certified · Hand-finished
          </p>
        </div>

        {/* ── Stats pill ── top-right corner */}
        <div
          className="hero-item absolute right-10 top-1/3 z-20 flex flex-col items-end gap-1 text-right"
          style={{ animationDelay: "700ms" }}
        >
          <span className="font-label-caps text-[9px] uppercase tracking-[0.3em] text-on-surface-variant/70">
            Handcrafted pieces
          </span>
          <span
            className="font-display-lg text-primary/20"
            style={{ fontSize: "72px", lineHeight: 1 }}
          >
            240+
          </span>
        </div>
      </div>

      {/* ─── MOBILE BACKGROUND (below lg) ──────────────────────────── */}
      <div className="absolute inset-0 -z-10 lg:hidden">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero.png')",
            opacity: 0.12,
          }}
        />
      </div>
    </section>
  );
}
