"use client";

import { Input } from "@/components/ui/input";

export default function TripsFilters({
  filters,
  setFilters,
  tripTypes,
  activities,
  sort,
  setSort,
}: any) {
  const toggle = (id: number, key: string) => {
    setFilters((prev: any) => {
      const arr = prev[key] || [];

      return {
        ...prev,
        [key]: arr.includes(id)
          ? arr.filter((i: number) => i !== id)
          : [...arr, id],
      };
    });
  };

  return (
    <div className="space-y-8">
      {/* SEARCH */}
      <Input
        placeholder="Search trips..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="rounded-xl bg-gray-100 border-0 px-4 py-3"
      />

      {/* SORT */}
      <div>
        <p className="text-sm font-semibold mb-3">Sort</p>

        <div className="flex gap-2 flex-wrap">
          {["recommended", "price_low", "price_high", "rating"].map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-4 py-2 text-xs rounded-lg transition
                ${
                  sort === s
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVITIES */}
      <div>
        <p className="text-sm font-semibold mb-3">Activities</p>

        <div className="grid grid-cols-2 gap-2">
          {activities.map((a: any) => {
            const active = filters.activities.includes(a.id);

            return (
              <button
                key={a.id}
                onClick={() => toggle(a.id, "activities")}
                className={`text-left px-3 py-2 text-sm rounded-lg border transition
                  ${
                    active
                      ? "border-sky-500 bg-sky-500 text-white"
                      : "border-gray-200 bg-white"
                  }`}
              >
                {a.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
