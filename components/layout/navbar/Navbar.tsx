"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import UserMenu from "./UserMenu";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import DestinationDropdown from "./DestinationDropdown";
import ActivityDropdown from "./ActivityDropdown";
import { useSearch } from "@/hooks/useSearch";
import { useDestinations } from "@/hooks/useDestinations";
import { useTrips } from "@/hooks/useTrips";
import MobileMenu from "./MobileMenu";

type Destination = {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  level: number;
  image?: string;
  description?: string;
};

type Country = {
  id: number;
  name: string;
};

type DestinationWithCountry = Destination & {
  country: Country;
};

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeContinent, setActiveContinent] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<DestinationWithCountry | null>(
    null,
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [activeActivityId, setActiveActivityId] = useState<number | null>(null);

  const [activeMenuType, setActiveMenuType] = useState<
    "top" | "continent" | "activity"
  >("top");

  const { search, setSearch, debouncedSearch, recentSearches, saveSearch } =
    useSearch();

  const {
    destinations,
    continents,
    filteredDestinations,
    getDestinationsByContinent,
  } = useDestinations(debouncedSearch);

  const { visibleTrips, visibleCities } = useTrips({
    destinations,
    activeMenuType,
    activeContinent,
    activeActivityId,
    getDestinationsByContinent,
  });

  const closeMenu = useCallback(() => {
    setActiveIndex(null);
    setActiveContinent(null);
    setHoveredItem(null);
    setActiveMenuType("top");
    setActiveActivityId(null);
    setSearch("");
  }, [setSearch]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;

      if (!dropdownRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [closeMenu]);

  useEffect(() => {
    if (filteredDestinations.length > 0) {
      setHoveredItem(filteredDestinations[0]);
    }
  }, [filteredDestinations]);

  const links = [
    { name: "Destinations", hasSearch: true },
    { name: "Activities", href: "/activities" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-blue-600 font-semibold">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/">
          <Image src="/assets/logo.jpeg" alt="logo" width={180} height={50} />
        </Link>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((link, index) => (
            <div
              key={link.name}
              onMouseEnter={() => {
                setActiveIndex(index);
                setActiveContinent(null);
                setActiveActivityId(null);
                setActiveMenuType("top");
              }}
              className="flex items-center gap-1 cursor-pointer text-lg"
            >
              {link.name}
              {link.hasSearch && <ChevronDown size={16} />}
            </div>
          ))}
        </nav>

        <UserMenu />

        <MobileMenu links={links} />
      </div>
      <DestinationDropdown
        activeIndex={activeIndex}
        continents={continents}
        activeContinent={activeContinent}
        setActiveContinent={setActiveContinent}
        search={search}
        setSearch={setSearch}
        closeMenu={closeMenu}
        dropdownRef={dropdownRef}
        closeTimeoutRef={closeTimeoutRef}
        recentSearches={recentSearches}
        // 🔥 ADD THESE
        filteredDestinations={filteredDestinations}
        getDestinationsByContinent={getDestinationsByContinent}
        saveSearch={saveSearch}
        highlightText={highlightText}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
      />

      <ActivityDropdown
        activeIndex={activeIndex}
        closeMenu={closeMenu}
        closeTimeoutRef={closeTimeoutRef}
        dropdownRef={dropdownRef}
        continents={continents}
        activeContinent={activeContinent}
        setActiveContinent={setActiveContinent}
        visibleTrips={visibleTrips}
        visibleCities={visibleCities}
        activeMenuType={activeMenuType}
        setActiveMenuType={setActiveMenuType}
        setActiveActivityId={setActiveActivityId}
      />
    </header>
  );
}
