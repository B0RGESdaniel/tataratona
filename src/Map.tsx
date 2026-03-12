import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { pubs } from "./pubs";
import beerMug from "./assets/beer-mug.png";

interface MapControllerProps {
  target?: [number, number] | null;
}

function MapController({ target }: MapControllerProps) {
  const map = useMap();

  if (target) {
    map.flyTo(target, 18, { duration: 0.8 });
  }

  return null;
}

export function Map({ target }: MapControllerProps) {
  const customIcon = L.icon({
    iconUrl: beerMug,
    iconSize: [50, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
    className: "drop-shadow-2xl",
  });
  return (
    <MapContainer
      center={[-22.902109839094475, -43.10685698806076]}
      zoom={14}
      className="w-full h-[650px]"
      scrollWheelZoom={false}
    >
      <MapController target={target} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {pubs.map((pub, index) => (
        <Marker
          key={index}
          position={[pub.position[0], pub.position[1]]}
          title={pub.name}
          icon={customIcon}
        >
          <Popup>{`#${index + 1} - ${pub.name}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
