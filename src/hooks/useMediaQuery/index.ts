import { useEffect, useState } from "react";

/**
 * Hook que escuta uma media query CSS e retorna se ela bate atualmente.
 * Tipicamente usado para alternar comportamentos entre desktop e mobile
 * (ex.: `useMediaQuery("(max-width: 767px)")`).
 *
 * SSR-safe: durante o primeiro render no servidor (sem `window`), retorna
 * `false` — o consumidor deve evitar branchear conteúdo crítico apenas no
 * resultado deste hook se o flash de re-hidratação for inaceitável.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const list = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent): void => setMatches(event.matches);
    setMatches(list.matches);
    list.addEventListener("change", handler);
    return () => {
      list.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}
