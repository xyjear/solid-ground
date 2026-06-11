"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

export default function AnchorHandler() {
  const lenis = useLenis();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      lenis?.scrollTo(`#${id}`);
      history.replaceState(null, "", window.location.pathname);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [lenis]);

  return null;
}
