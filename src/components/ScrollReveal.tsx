"use client";

import { useEffect } from "react";

/**
 * ScrollReveal — client-side utility component that:
 * 1. Uses IntersectionObserver to add `.active` class to `.reveal` elements as they enter the viewport
 * 2. Handles smooth scroll for `#hash` anchor links (Safari/older browser fallback)
 *
 * Renders nothing to the DOM — pure side-effect component.
 */
export default function ScrollReveal() {
  useEffect(() => {
    // ── Intersection Observer for reveal animations ──────────────────
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    document
      .querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    // ── Smooth scroll for internal anchor links ──────────────────────
    const handleSmoothScroll = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: (target as HTMLElement).offsetTop - 80,
          behavior: "smooth",
        });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) =>
      anchor.addEventListener("click", handleSmoothScroll)
    );

    return () => {
      observer.disconnect();
      anchors.forEach((anchor) =>
        anchor.removeEventListener("click", handleSmoothScroll)
      );
    };
  }, []);

  return null;
}
