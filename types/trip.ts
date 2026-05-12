export type TripUI = {
  id: string;
  title: string;
  slug: string;

  // Media
  image: string;
  images: string[];

  // Basic Info
  location: string;
  duration: string;
  rating: number;

  // Content
  description: string;
  highlights: string[];

  // Pricing
  price: number;
  priceLabel: string; // e.g. "per person"

  // Itinerary
  itinerary: {
    label: string;
    title: string;
    description: string;
    date?: string;
  }[];

  // Extra Info
  includes?: string;
  excludes?: string;

  // Dates
  availableDates?: {
    label: string;
    startDate: string;
    endDate: string;
  }[];

  // Guides
  guides?: {
    name: string;
    title: string;
    image: string;
    rating: string;
    bio: string;
    phoneNumber: string;
  }[];

  // Map
  pickupLocations?: {
    label: string;
    lat: number;
    lng: number;
    address: string;
  }[];
};
