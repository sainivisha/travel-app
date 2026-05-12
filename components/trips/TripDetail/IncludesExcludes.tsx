interface IncludesExcludesProps {
  includes: string[];
  excludes: string[];
}

export default function IncludesExcludes({
  includes,
  excludes,
}: IncludesExcludesProps) {
  if (!includes.length && !excludes.length) return null;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {includes.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            ✔ What's included
          </h2>
          <ul className="space-y-3">
            {includes.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <span className="text-green-500 mt-1">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {excludes.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-red-500">
            ✖ What's not included
          </h2>
          <ul className="space-y-3">
            {excludes.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <span className="text-red-500 mt-1">✖</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
