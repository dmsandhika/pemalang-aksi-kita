import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Report, categoryLabels, categoryColors, statusLabels, PEMALANG_CENTER } from "@/data/mockData";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function createColoredIcon(color: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background:${color};width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
}

function FitBounds({ reports }: { reports: Report[] }) {
  const map = useMap();
  useEffect(() => {
    if (reports.length > 0) {
      const bounds = L.latLngBounds(reports.map((r) => [r.lat, r.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [reports, map]);
  return null;
}

interface ReportMapProps {
  reports: Report[];
  height?: string;
  showPopups?: boolean;
  fitBounds?: boolean;
}

export default function ReportMap({
  reports,
  height = "400px",
  showPopups = true,
  fitBounds = false,
}: ReportMapProps) {
  return (
    <div className="map-container" style={{ height }}>
      <MapContainer
        center={PEMALANG_CENTER}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fitBounds && <FitBounds reports={reports} />}
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.lat, report.lng]}
            icon={createColoredIcon(categoryColors[report.category])}
          >
            {showPopups && (
              <Popup maxWidth={280}>
                <div className="space-y-2 p-1">
                  <img
                    src={report.photo}
                    alt={report.title}
                    className="h-32 w-full rounded object-cover"
                  />
                  <h3 className="text-sm font-semibold">{report.title}</h3>
                  <p className="text-xs text-gray-600">{report.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className="rounded-full px-2 py-0.5 text-white"
                      style={{ backgroundColor: categoryColors[report.category] }}
                    >
                      {categoryLabels[report.category]}
                    </span>
                    <span className="font-medium">{statusLabels[report.status]}</span>
                  </div>
                  <p className="text-xs text-gray-500">{report.address}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(report.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
