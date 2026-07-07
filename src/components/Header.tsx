"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header({
  cartCount = 0,
  onCartClick,
  activePage,
  alwaysShow = false,
}: {
  cartCount?: number;
  onCartClick?: () => void;
  activePage?: string;
  alwaysShow?: boolean;
} = {}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisible = alwaysShow || scrolled;

  const navItems = [
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "Journal", href: "/journal" },
    { name: "About", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-6 inset-x-0 z-50 flex justify-center px-gutter transition-all duration-500 ease-in-out pointer-events-none ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-28 opacity-0"
      }`}
    >
      <nav
        className={`flex justify-between items-center px-10 w-full max-w-4xl bg-surface/90 backdrop-blur-xl border border-outline-variant/20 rounded-full shadow-sm py-3 transition-all duration-500 ease-in-out ${
          isVisible ? "pointer-events-auto" : "pointer-events-none"
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
          {navItems.map((item) => (
            <Link
              key={item.name}
              className={`font-label-caps text-[11px] hover:text-primary transition-colors duration-300 relative nav-underline uppercase tracking-[0.25em] ${
                activePage === item.name
                  ? "text-primary font-semibold border-b border-primary/20 pb-0.5"
                  : "text-on-surface-variant"
              }`}
              href={item.href}
            >
              {item.name}
            </Link>
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
            onClick={onCartClick}
            className="hover:opacity-70 transition-opacity duration-300 flex items-center relative pointer-events-auto"
            aria-label="Shopping bag"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-primary text-on-primary rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
