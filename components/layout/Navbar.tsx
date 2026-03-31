"use client";

import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import UserMenu from "../navbar/UserMenu";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { getFlag, getTypeIcon } from "@/utils/getCountryFlag";
import { fuzzyMatch } from "@/utils";

type Destination = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  type?: string;
  image?: string;
  description?: string;
  destinationType?: string;
};

type Country = {
  id: number;
  name: string;
};

type DestinationWithCountry = Destination & {
  country: Country;
};

type Activity = {
  id: number;
  name: string;
  slug: string;
  icon: string;
};

type Trip = {
  id: number;
  title: string;
  slug: string;
  destinationId: number;
  rating: number;
  image: string;
  activityIds?: number[];
};

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeContinent, setActiveContinent] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<DestinationWithCountry | null>(
    null,
  );
  const [search, setSearch] = useState("");

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeActivityId, setActiveActivityId] = useState<number | null>(null);

  const [activeMenuType, setActiveMenuType] = useState<
    "top" | "continent" | "activity"
  >("top");

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [destRes, actRes, tripRes] = await Promise.all([
          fetch("/api/admin/destinations"),
          fetch("/api/admin/activities"),
          fetch("/api/admin/trips"),
        ]);

        const [destinations, activities, trips] = await Promise.all([
          destRes.json(),
          actRes.json(),
          tripRes.json(),
        ]);

        setDestinations(destinations);
        setActivities(activities);
        setTrips(trips);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const closeMenu = () => {
    setActiveIndex(null);
    setActiveContinent(null);
    setHoveredItem(null);
    setSearch("");
  };

  const topExperiences = useMemo(() => {
    return [...trips].sort((a, b) => b.rating - a.rating).slice(0, 6);
  }, [trips]);

  const filteredTrips = useMemo(() => {
    if (!activeActivityId) return topExperiences;

    return trips
      .filter((trip) => trip.activityIds?.includes(activeActivityId))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }, [activeActivityId, trips, topExperiences]);

  const destinationMap = useMemo(() => {
    const map = new Map<number, Destination>();
    destinations.forEach((d) => map.set(d.id, d));
    return map;
  }, [destinations]);

  const activityCities = useMemo(() => {
    return filteredTrips
      .map((trip) => destinationMap.get(trip.destinationId))
      .filter(Boolean)
      .slice(0, 6);
  }, [filteredTrips, destinationMap]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!dropdownRef.current) return;

      if (!dropdownRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

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

  const continents = useMemo(
    () => destinations.filter((d) => d.parentId === null),
    [destinations],
  );

  const getDestinationsByContinent = useCallback(
    (continentId: number): DestinationWithCountry[] => {
      const countries = destinations.filter(
        (d) => d.parentId === continentId && d.type === "country",
      );

      return countries.flatMap((country) => {
        const children = destinations.filter((d) => d.parentId === country.id);

        return [
          {
            ...country,
            country: {
              id: country.id,
              name: country.name,
            },
          },

          ...children.map((dest) => ({
            ...dest,
            country: {
              id: country.id,
              name: country.name,
            },
          })),
        ];
      });
    },
    [destinations],
  );

  const getSubtitle = (dest: Destination, country: Country) => {
    const map: Record<string, string> = {
      city: `City in ${country.name}`,
      region: `Region in ${country.name}`,
      island: `Island in ${country.name}`,
      attraction: `Attraction in ${country.name}`,
    };
    return map[dest.destinationType || ""] || "";
  };

  // const filteredDestinations = useMemo((): DestinationWithCountry[] => {
  //   if (!activeContinent) return [];

  //   let data = getDestinationsByContinent(activeContinent);

  //   if (debouncedSearch.length >= 3) {
  //     data = data.filter((d) => fuzzyMatch(d.name, debouncedSearch));
  //   }

  //   return data.slice(0, 15);
  // }, [activeContinent, debouncedSearch, getDestinationsByContinent]);

  const filteredDestinations = useMemo((): DestinationWithCountry[] => {
    if (!destinations.length) return [];

    let data: DestinationWithCountry[] = [];

    // 🔍 GLOBAL SEARCH MODE
    if (debouncedSearch.length >= 3) {
      const countries = destinations.filter((d) => d.type === "country");

      data = destinations
        .filter((d) => d.parentId !== null) // skip continents
        .map((dest) => {
          const country = countries.find((c) => c.id === dest.parentId);

          return {
            ...dest,
            country: {
              id: country?.id || 0,
              name: country?.name || "",
            },
          };
        })
        .filter((d) => fuzzyMatch(d.name, debouncedSearch));
    }

    // 🌍 CONTINENT MODE
    else if (activeContinent) {
      data = getDestinationsByContinent(activeContinent);
    }

    return data.slice(0, 15);
  }, [
    activeContinent,
    debouncedSearch,
    destinations,
    getDestinationsByContinent,
  ]);

  const visibleTrips = useMemo(() => {
    // 🔴 TOP
    if (activeMenuType === "top") {
      return topExperiences;
    }

    // 🌍 CONTINENT
    if (activeMenuType === "continent" && activeContinent) {
      const cities = getDestinationsByContinent(activeContinent);

      return trips
        .filter((trip) => cities.some((c) => c.id === trip.destinationId))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
    }

    // 🧭 ACTIVITY
    if (activeMenuType === "activity" && activeActivityId) {
      return trips
        .filter((trip) => trip.activityIds?.includes(activeActivityId))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);
    }

    return topExperiences;
  }, [
    activeMenuType,
    activeContinent,
    activeActivityId,
    trips,
    topExperiences,
  ]);

  const visibleCities = useMemo(() => {
    // 🔴 TOP
    if (activeMenuType === "top") {
      return topExperiences
        .map((trip) => destinationMap.get(trip.destinationId))
        .filter(Boolean)
        .slice(0, 6);
    }

    // 🌍 CONTINENT
    if (activeMenuType === "continent" && activeContinent) {
      return getDestinationsByContinent(activeContinent).slice(0, 6);
    }

    // 🧭 ACTIVITY
    if (activeMenuType === "activity" && activeActivityId) {
      return trips
        .filter((t) => t.activityIds?.includes(activeActivityId))
        .map((t) => destinationMap.get(t.destinationId))
        .filter(Boolean)
        .slice(0, 6);
    }

    return [];
  }, [
    activeMenuType,
    activeContinent,
    activeActivityId,
    trips,
    destinationMap,
    topExperiences,
    getDestinationsByContinent,
  ]);

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

  const highlightText = (text: string, search: string) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");

    return text.split(regex).map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={i} className="font-semibold text-black">
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
        {/* LOGO */}
        <Link href="/">
          <Image
            src="https://travellingcambodia.com/wp-content/uploads/2026/03/logo_main.png"
            alt="logo"
            width={180}
            height={50}
          />
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((link, index) => (
            <div
              key={link.name}
              onMouseEnter={() => {
                setActiveIndex(index);
                setActiveContinent(null);
                setActiveActivityId(null);
              }}
              className="flex items-center gap-1 cursor-pointer"
            >
              {link.name}
              {link.hasSearch && <ChevronDown size={16} />}
            </div>
          ))}
        </nav>

        <UserMenu />

        {/* MOBILE */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-10">
              {links.map((link) => (
                <Link key={link.name} href={link.href || "#"}>
                  {link.name}
                </Link>
              ))}
              <Button className="mt-4">Book Now</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {activeIndex === 0 && (
        <div
          className="fixed left-1/2 -translate-x-1/2 top-[80px] z-50 w-full px-6"
          onMouseEnter={() => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          }}
          onMouseLeave={() => {
            closeTimeoutRef.current = setTimeout(() => {
              closeMenu();
            }, 150);
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div
              ref={dropdownRef}
              className="bg-white rounded-2xl shadow-2xl p-6 border"
            >
              <input
                placeholder="Search destinations..."
                className="w-full mb-4 p-3 border rounded-lg text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search.length === 0 && recentSearches.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2">Recent searches</p>

                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item) => (
                      <button
                        key={item}
                        onClick={() => setSearch(item)}
                        className="px-3 py-1 text-xs bg-gray-100 rounded-full hover:bg-gray-200"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-8">
                <div className="w-1/4 border-r pr-6">
                  {continents.map((c) => (
                    <div
                      key={c.id}
                      onMouseEnter={() => setActiveContinent(c.id)}
                      className={`group flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                     ${activeContinent === c.id ? "bg-gray-100" : "hover:bg-gray-100"}`}
                    >
                      {/* DOT */}
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-200
                        ${
                          activeContinent === c.id
                            ? "bg-red-500 scale-110"
                            : "bg-gray-300 group-hover:bg-gray-400"
                        }`}
                      />

                      <span
                        className={`text-[20px] transition-all duration-200
                        ${
                          activeContinent === c.id
                            ? "text-black font-extrabold translate-x-1"
                            : "text-gray-500 font-normal group-hover:text-gray-700 group-hover:translate-x-1"
                        }`}
                      >
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex-1 max-h-[400px] overflow-y-auto">
                  <div className="grid grid-cols-3 gap-3 auto-rows-min">
                    {filteredDestinations.map((item) => (
                      <Link
                        key={item.id}
                        href={`/destinations/${item.slug}`}
                        onMouseEnter={() => setHoveredItem(item)}
                        onClick={() => {
                          saveSearch(item.name);
                          closeMenu();
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                      >
                        <div className="relative w-10 h-10 min-w-[40px] min-h-[40px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          <Image
                            src={item.image || ""}
                            alt={item.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium leading-tight truncate flex items-center gap-1">
                              <span>
                                {getTypeIcon(item.destinationType || item.type)}
                              </span>

                              <span className="truncate">
                                {highlightText(item.name, search)}
                              </span>
                            </p>

                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              {item.type === "country" && (
                                <span>{getFlag(item.name)}</span>
                              )}

                              {getSubtitle(item, item.country)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {activeContinent &&
                    getDestinationsByContinent(activeContinent).length > 15 && (
                      <div className="pt-4">
                        <Link
                          href={`/destinations/${
                            continents.find((c) => c.id === activeContinent)
                              ?.slug
                          }`}
                          onClick={closeMenu}
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          View all destinations →
                        </Link>
                      </div>
                    )}
                </div>

                {/* <div className="w-[300px]">
                  {hoveredItem && (
                    <div>
                      <Image
                        src={hoveredItem.image || ""}
                        alt={hoveredItem.name}
                        width={300}
                        height={200}
                        className="rounded-xl object-cover mb-3"
                      />
                      <h3 className="font-semibold text-lg">
                        {hoveredItem.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {hoveredItem.description}
                      </p>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeIndex === 1 && (
        <div
          className="fixed left-1/2 -translate-x-1/2 top-[80px] z-50 w-full px-6"
          onMouseEnter={() => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          }}
          onMouseLeave={() => {
            closeTimeoutRef.current = setTimeout(closeMenu, 150);
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div
              ref={dropdownRef}
              className="bg-white rounded-2xl shadow-2xl p-6 border"
            >
              <div className="flex gap-8">
                {/* LEFT */}
                <div className="w-1/4 border-r pr-6">
                  <ul className="space-y-2 text-sm">
                    {/* 🔴 TOP */}
                    <li
                      onMouseEnter={() => {
                        setActiveMenuType("top");
                        setActiveContinent(null);
                        setActiveActivityId(null);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
                        activeMenuType === "top"
                          ? "bg-gray-100 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Top experiences
                    </li>

                    {/* 🌍 CONTINENTS */}
                    {continents.map((continent) => (
                      <li
                        key={continent.id}
                        onMouseEnter={() => {
                          setActiveMenuType("continent");
                          setActiveContinent(continent.id);
                          setActiveActivityId(null);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
                          activeMenuType === "continent" &&
                          activeContinent === continent.id
                            ? "bg-gray-100 font-medium"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            activeMenuType === "continent" &&
                            activeContinent === continent.id
                              ? "bg-red-500"
                              : "bg-gray-300"
                          }`}
                        />
                        {continent.name}
                      </li>
                    ))}

                    {/* 🧭 ACTIVITIES */}
                    {/* <div className="mt-4 pt-4 border-t">
                      {activities.map((activity) => (
                        <li
                          key={activity.id}
                          onMouseEnter={() => {
                            setActiveMenuType("activity");
                            setActiveActivityId(activity.id);
                            setActiveContinent(null);
                          }}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
                            activeMenuType === "activity" &&
                            activeActivityId === activity.id
                              ? "bg-gray-100 font-medium"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              activeMenuType === "activity" &&
                              activeActivityId === activity.id
                                ? "bg-red-500"
                                : "bg-gray-300"
                            }`}
                          />
                          {activity.name}
                        </li>
                      ))}
                    </div> */}
                  </ul>
                </div>

                {/* RIGHT */}
                <div className="flex-1 grid grid-cols-2 gap-10">
                  {/* COLUMN 1 */}
                  <div>
                    <p className="text-sm font-semibold mb-4">
                      Top experiences
                    </p>

                    <div className="space-y-3">
                      {visibleTrips.map((trip) => (
                        <Link
                          key={trip.id}
                          href={`/trips/${trip.slug}`}
                          onClick={closeMenu}
                          className="flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={trip.image}
                              alt={trip.title}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>

                          <span className="text-sm">{trip.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* COLUMN 2 */}
                  <div>
                    <p className="text-sm font-semibold mb-4">
                      Things to do in…
                    </p>

                    <div className="space-y-3">
                      {visibleCities.map((city) => (
                        <Link
                          key={city?.id}
                          href={`/destinations/${city?.slug}`}
                          onClick={closeMenu}
                          className="flex items-center gap-3"
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={city?.image || ""}
                              alt={city?.name || ""}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>

                          <span className="text-sm">
                            Things to do in {city?.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
