export function transformTrip(apiTrip: any): TripUI {
  return {
    id: apiTrip.id,
    title: apiTrip.title,
    slug: apiTrip.slug,

    image: apiTrip.gallery?.images?.[0]?.url || "",
    images: apiTrip.gallery?.images?.map((img: any) => img.url) || [],

    video: apiTrip.gallery?.videoUrl,

    location:
      apiTrip.pickupLocations?.map((l: any) => l.label).join(", ") || "",

    duration: `${apiTrip.dates?.days || 0} Days / ${
      apiTrip.dates?.nights || 0
    } Nights`,

    description: apiTrip.overview || "",
    highlights: apiTrip.keywords || [],

    itinerary: apiTrip.itinerary || [],

    includes: apiTrip.tripIncludes,
    excludes: apiTrip.tripExcludes,

    facts: apiTrip.tripFacts || [],
    faq: apiTrip.faq || [],

    attachments: apiTrip.downloadableAttachments || [],

    priceCategories: apiTrip.price?.priceCategories || [],

    availableDates: apiTrip.dates?.fixedDepartures || [],

    guides: apiTrip.guides || [],

    pickupLocations: apiTrip.pickupLocations || [],
  };
}

export function parseList(html?: string): string[] {
  if (!html) return [];
  return html
    .replace(/<\/li>/g, "|")
    .replace(/<[^>]+>/g, "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function extractHighlights(text: string): string[] {
  if (!text) return [];
  return text
    .replace(/<[^>]+>/g, "")
    .split(".")
    .slice(0, 3)
    .map((t) => t.trim())
    .filter(Boolean);
}

export function getHighlightIcon(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("fort") || t.includes("palace")) return "🏰";
  if (t.includes("food") || t.includes("dinner")) return "🍜";
  if (t.includes("culture") || t.includes("show")) return "🎭";
  if (t.includes("guide")) return "🧑‍🏫";
  if (t.includes("hotel") || t.includes("stay")) return "🏨";
  if (t.includes("market") || t.includes("shopping")) return "🛍️";
  if (t.includes("transport") || t.includes("pickup")) return "🚗";
  return "✨";
}
