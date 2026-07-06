"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-gutter pointer-events-none">
      <nav
        className={`flex justify-between items-center px-10 w-full max-w-4xl bg-surface/80 backdrop-blur-xl border border-outline-variant/20 rounded-full shadow-sm transition-all duration-500 ease-in-out pointer-events-auto ${
          scrolled ? "py-2 bg-surface/95" : "py-4"
        }`}
      >
        {/* Brand Logo */}
        <Link
          className="font-display-lg text-2xl md:text-3xl text-primary tracking-[0.15em] font-medium hover:opacity-70 transition-opacity"
          href="/"
        >
          KIZUNA
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {["Shop", "Collections", "Journal", "About"].map((item) => (
            <a
              key={item}
              className="font-label-caps text-[11px] text-on-surface-variant hover:text-primary transition-colors duration-300 relative nav-underline uppercase tracking-[0.25em]"
              href="#"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6 text-primary">
          <button
            className="hover:opacity-70 transition-opacity duration-300 flex items-center"
            aria-label="Search"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <button
            className="hover:opacity-70 transition-opacity duration-300 flex items-center"
            aria-label="Account"
          >
            <span className="material-symbols-outlined">person</span>
          </button>
          <button
            className="hover:opacity-70 transition-opacity duration-300 flex items-center relative"
            aria-label="Shopping bag"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="absolute -top-1 -right-1 text-[10px] bg-primary text-on-primary rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
