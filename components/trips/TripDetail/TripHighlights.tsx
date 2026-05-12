import { getHighlightIcon } from "@/lib/utils/trip";

interface TripHighlightsProps {
  highlights: string[];
}

export default function TripHighlights({ highlights }: TripHighlightsProps) {
  if (!highlights?.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Highlights</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="flex items-start gap-4 bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center text-lg">
              {getHighlightIcon(h)}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{h}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
