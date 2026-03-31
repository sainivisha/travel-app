"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

export default function TripsFilters({
  filters,
  setFilters,
  destinations,
  tripTypes,
  activities,
}: any) {
  const [open, setOpen] = useState({
    destination: true,
    tripTypes: true,
    activities: true,
  });

  const toggle = (id: number, key: string) => {
    setFilters((prev: any) => {
      const arr = prev[key];

      return {
        ...prev,
        [key]: arr.includes(id)
          ? arr.filter((i: number) => i !== id)
          : [...arr, id],
      };
    });
  };

  const clearAll = () => {
    setFilters({
      search: "",
      destination: "",
      tripTypes: [],
      activities: [],
      chips: [],
    });
  };

  const totalFilters = filters.tripTypes.length + filters.activities.length;

  const toggleSection = (key: string) => {
    setOpen((prev: any) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="sticky top-24">
      <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-6">
        {/* 🔥 HEADER */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">
            Filters
            {totalFilters > 0 && (
              <span className="ml-2 text-md text-gray-400">
                ({totalFilters})
              </span>
            )}
          </h3>

          {totalFilters > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-gray-500 hover:text-black"
            >
              Clear all
            </button>
          )}
        </div>

        {/* 🔍 SEARCH */}
        <div>
          <p className="text-md font-medium mb-2">Search</p>

          <Input
            placeholder="Search tours..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>

        {/* 🌍 DESTINATION */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer mb-2"
            onClick={() => toggleSection("destination")}
          >
            <p className="text-md font-medium">Destination</p>
            <ChevronDown
              size={16}
              className={`transition ${open.destination ? "rotate-180" : ""}`}
            />
          </div>

          {open.destination && (
            <select
              value={filters.destination}
              onChange={(e) =>
                setFilters({ ...filters, destination: e.target.value })
              }
              className="w-full border border-gray-200 bg-gray-50 px-3 py-2 rounded-xl"
            >
              <option value="">All destinations</option>
              {destinations?.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* 🧭 TRIP TYPES */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer mb-2"
            onClick={() => toggleSection("tripTypes")}
          >
            <p className="text-md font-medium">Trip Type</p>
            <ChevronDown
              size={16}
              className={`transition ${open.tripTypes ? "rotate-180" : ""}`}
            />
          </div>

          {open.tripTypes && (
            <div className="space-y-2">
              {tripTypes.map((t: any) => {
                const checked = filters.tripTypes.includes(t.id);

                return (
                  <label
                    key={t.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(t.id, "tripTypes")}
                      className="hidden"
                    />

                    {/* custom checkbox */}
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition
                        ${
                          checked
                            ? "bg-black border-black"
                            : "border-gray-300 group-hover:border-gray-500"
                        }`}
                    >
                      {checked && (
                        <div className="w-2 h-2 bg-white rounded-sm" />
                      )}
                    </div>

                    <span className="text-sm text-gray-700 group-hover:text-black">
                      {t.name}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* 🎯 ACTIVITIES */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer mb-2"
            onClick={() => toggleSection("activities")}
          >
            <p className="text-md font-medium">Activities</p>
            <ChevronDown
              size={16}
              className={`transition ${open.activities ? "rotate-180" : ""}`}
            />
          </div>

          {open.activities && (
            <div className="space-y-2 max-h-52 overflow-auto pr-1">
              {activities.map((a: any) => {
                const checked = filters.activities.includes(a.id);

                return (
                  <label
                    key={a.id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(a.id, "activities")}
                      className="hidden"
                    />

                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition
                        ${
                          checked
                            ? "bg-black border-black"
                            : "border-gray-300 group-hover:border-gray-500"
                        }`}
                    >
                      {checked && (
                        <div className="w-2 h-2 bg-white rounded-sm" />
                      )}
                    </div>

                    <span className="text-sm text-gray-700 group-hover:text-black">
                      {a.name}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
