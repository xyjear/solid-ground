"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const offices = [
  { name: "Калининград", coords: [54.7104, 20.4522] as [number, number], address: "ул. Победы, 25", phone: "+7 (4012) 99-88-77", objects: 3 },
  { name: "Санкт-Петербург", coords: [59.9343, 30.3351] as [number, number], address: "пр. Невский, 100", phone: "+7 (812) 555-44-33", objects: 15 },
  { name: "Москва", coords: [55.7558, 37.6173] as [number, number], address: "ул. Строителей, 15", phone: "+7 (495) 123-45-67", objects: 28 },
  { name: "Краснодар", coords: [45.0355, 38.9753] as [number, number], address: "ул. Красная, 50", phone: "+7 (861) 222-33-44", objects: 12 },
  { name: "Ростов-на-Дону", coords: [47.2357, 39.7015] as [number, number], address: "пр. Ворошиловский, 30", phone: "+7 (863) 111-22-33", objects: 6 },
  { name: "Казань", coords: [55.7879, 49.1233] as [number, number], address: "ул. Баумана, 20", phone: "+7 (843) 777-88-99", objects: 9 },
  { name: "Екатеринбург", coords: [56.8389, 60.6057] as [number, number], address: "пр. Ленина, 45", phone: "+7 (343) 444-55-66", objects: 7 },
  { name: "Новосибирск", coords: [55.0084, 82.9357] as [number, number], address: "ул. Советская, 30", phone: "+7 (383) 333-44-55", objects: 5 },
];

function makeIcon(size: number, active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="width:${size}px;height:${size}px;background:#D4A843;border:2px solid ${active ? "#fff" : "#0a0a0a"};border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 12px rgba(212,168,67,${active ? "0.6" : "0.3"});transition:all 0.3s"><div style="width:${active ? 10 : 7}px;height:${active ? 10 : 7}px;background:#0a0a0a;border-radius:50%;transform:rotate(45deg)"></div></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -(size + 6)],
  });
}

function FlyToActive({ activeRegion }: { activeRegion: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (activeRegion) {
      const office = offices.find((o) => o.name === activeRegion);
      if (office) {
        map.flyTo(office.coords, 10, { duration: 1.2 });
      }
    } else {
      map.flyTo([55, 83], 4, { duration: 1.2 });
    }
  }, [activeRegion, map]);
  return null;
}

function CtrlScrollZoom() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -1 : 1;
        map.setZoom(map.getZoom() + delta, { animate: true });
      } else {
        e.preventDefault();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [map]);

  return null;
}

export default function MapContent({
  activeRegion,
  onSelectRegion,
}: {
  activeRegion: string | null;
  onSelectRegion: (name: string | null) => void;
}) {
  return (
    <>
      <style>{`
        .leaflet-container {
          background: #0a0a0a;
          font-family: Manrope, sans-serif;
        }
        .leaflet-popup-content-wrapper {
          background: #1a1a1a;
          color: #fff;
          border: 1px solid rgba(212, 168, 67, 0.3);
          border-radius: 12px;
          padding: 4px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
        }
        .leaflet-popup-tip {
          background: #1a1a1a;
          border: 1px solid rgba(212, 168, 67, 0.3);
        }
        .leaflet-popup-content {
          margin: 12px 16px;
          font-size: 14px;
          line-height: 1.5;
          min-width: 180px;
        }
        .leaflet-popup-content h3 {
          color: #D4A843;
          font-family: Outfit, sans-serif;
          font-weight: 700;
          font-size: 18px;
          margin: 0 0 8px;
        }
        .leaflet-popup-content p {
          color: rgba(255,255,255,0.6);
          margin: 2px 0;
          font-size: 13px;
        }
        .leaflet-popup-content .objects {
          color: #D4A843;
          font-weight: 600;
          margin-top: 8px;
          font-size: 14px;
        }
        .leaflet-control-zoom a {
          background: #1a1a1a !important;
          color: #fff !important;
          border-color: rgba(212,168,67,0.3) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #2a2a2a !important;
        }
        .leaflet-control-attribution {
          background: rgba(10,10,10,0.8) !important;
          color: rgba(255,255,255,0.3) !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a {
          color: rgba(212,168,67,0.5) !important;
        }
      `}</style>
      <MapContainer
        center={[55, 83]}
        zoom={4}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FlyToActive activeRegion={activeRegion} />
        <CtrlScrollZoom />
        {offices.map((office) => (
          <Marker
            key={office.name}
            position={office.coords}
            icon={makeIcon(office.name === activeRegion ? 36 : 28, office.name === activeRegion)}
            eventHandlers={{
              click: () => onSelectRegion(office.name === activeRegion ? null : office.name),
            }}
          >
            <Popup>
              <h3>{office.name}</h3>
              <p>{office.address}</p>
              <p>{office.phone}</p>
              <p className="objects">{office.objects} построенных объектов</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
