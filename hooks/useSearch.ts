import { useEffect, useState } from "react";

export function useSearch() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // load recent
  useEffect(() => {
    const saved = localStorage.getItem("recent-searches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const saveSearch = (term: string) => {
    if (!term || term.length < 3) return;

    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(
      0,
      5,
    );

    setRecentSearches(updated);
    localStorage.setItem("recent-searches", JSON.stringify(updated));
  };

  return {
    search,
    setSearch,
    debouncedSearch,
    recentSearches,
    saveSearch,
  };
}
