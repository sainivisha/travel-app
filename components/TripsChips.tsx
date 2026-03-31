"use client";

export default function TripsChips({ filters, setFilters }) {
  const chips = [
    { label: "Entry tickets", key: "entry" },
    { label: "Guided tours", key: "guided" },
    { label: "Private tours", key: "private" },
    { label: "Bus tours", key: "bus" },
    { label: "Boat cruises", key: "boat" },
    { label: "Sightseeing", key: "sightseeing" },
  ];

  const toggleChip = (key: string) => {
    setFilters((prev: any) => {
      const exists = prev.chips?.includes(key);

      return {
        ...prev,
        chips: exists
          ? prev.chips.filter((c: string) => c !== key)
          : [...(prev.chips || []), key],
      };
    });
  };

  return (
    <div className="sticky top-[72px] z-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-3 overflow-x-auto">
        <div className="flex gap-3 whitespace-nowrap">
          {chips.map((chip) => {
            const active = filters.chips?.includes(chip.key);

            return (
              <button
                key={chip.key}
                onClick={() => toggleChip(chip.key)}
                className={`px-4 py-2 rounded-full text-md font-bold border transition
                  ${
                    active
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
