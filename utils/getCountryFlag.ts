export const getFlag = (countryName: string) => {
  const map: Record<string, string> = {
    India: "🇮🇳",
    Japan: "🇯🇵",
    Thailand: "🇹🇭",
    "United States": "🇺🇸",
    France: "🇫🇷",
    Italy: "🇮🇹",
    Egypt: "🇪🇬",
    Australia: "🇦🇺",
    Indonesia: "🇮🇩",
    "United Arab Emirates": "🇦🇪",
    Maldives: "🇲🇻",
  };

  return map[countryName] || "🌍";
};

export const getTypeIcon = (type?: string) => {
  const map: Record<string, string> = {
    country: "🌍",
    city: "🏙️",
    region: "🗺️",
    island: "🏝️",
    attraction: "🎡",
  };

  return map[type || ""] || "📍";
};

