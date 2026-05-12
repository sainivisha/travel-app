"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo } from "react";

// ✅ Fix marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function TripMap({ locations }: any) {
  // ✅ Normalize + filter (supports BOTH formats)
  const validLocations = useMemo(
    () =>
      (locations || [])
        .map((loc: any) => ({
          lat: loc.latitude ?? loc.lat,
          lng: loc.longitude ?? loc.lng,
          label: loc.label,
          address: loc.address,
        }))
        .filter(
          (loc: any) =>
            typeof loc.lat === "number" && typeof loc.lng === "number",
        ),
    [locations],
  );

  // ✅ Guard
  if (!validLocations.length) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center border rounded-xl">
        <p className="text-gray-500">No pickup locations available</p>
      </div>
    );
  }

  // ✅ Auto-fit bounds
  const bounds = validLocations.map((loc: any) => [loc.lat, loc.lng]);

  return (
    <MapContainer
      bounds={bounds as any}
      className="w-full h-[350px] rounded-xl"
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {validLocations.map((loc: any, i: number) => (
        <Marker
          key={i}
          position={[loc.lat, loc.lng]}
          eventHandlers={{
            click: () => {
              window.open(
                `https://www.google.com/maps?q=${loc.lat},${loc.lng}`,
                "_blank",
              );
            },
          }}
        >
          <Popup>
            <div className="space-y-1">
              <p className="font-semibold">{loc.label}</p>
              {loc.address && (
                <p className="text-sm text-gray-500">{loc.address}</p>
              )}

              <a
                href={`https://www.google.com/maps?q=${loc.lat},${loc.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm"
              >
                Open in Google Maps →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
