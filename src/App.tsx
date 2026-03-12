import { useState } from "react";
import { Map } from "./Map";
import { pubs } from "./pubs";
import { ExternalLink, MapPin } from "lucide-react";
import clsx from "clsx";

export function App() {
  const [target, setTarget] = useState<[number, number]>();
  const [itemToShow, setItemToShow] = useState("Bares");

  function showInMap(position: number[]) {
    setItemToShow("Mapa");
    setTarget([position[0], position[1]]);
  }

  return (
    <div
      className={clsx(
        "w-full bg-[#F5E9DA]",
        itemToShow === "Mapa" && "h-screen",
      )}
    >
      <header className="flex flex-col items-center justify-center px-2 py-6 gap-4">
        <div className="p-2 drop-shadow-md flex flex-col items-center gap-4">
          <div className="flex flex-col items-center text-[#C22026]">
            <h1 className="text-2xl font-black">
              🏃‍♀️🎂 <span className="italic font-bold">TATA</span>RATONA 🍺🏃‍♀️
            </h1>
            <span>24 anos = 24 bares</span>
          </div>
          <span className="text-xl font-semibold text-[#F26522] border-y border-amber-700">
            <span className="font-black">28.03</span> - 14h
          </span>
        </div>

        <div className="flex items-center p-1 rounded-md bg-[#9E6240] gap-1">
          <button
            className={clsx(
              "flex items-center justify-center text-[#F8F2DC] px-3 py-1 rounded-md",
              "transition-colors duration-200",
              itemToShow === "Bares"
                ? "bg-[#DEA47E] text-amber-950"
                : "cursor-pointer",
            )}
            type="button"
            onClick={() => setItemToShow("Bares")}
          >
            🍺 Bares
          </button>
          <button
            className={clsx(
              "flex items-center justify-center text-[#F8F2DC] px-3 py-1 rounded-md",
              "transition-colors duration-200",
              itemToShow === "Mapa"
                ? "bg-[#DEA47E] text-amber-950"
                : "cursor-pointer",
            )}
            type="button"
            onClick={() => setItemToShow("Mapa")}
          >
            🗺️ Mapa
          </button>
        </div>
      </header>
      <div className="px-2 rounded-2xl">
        {itemToShow === "Mapa" && (
          <div>
            <Map target={target} />
          </div>
        )}
        {itemToShow === "Bares" && (
          <div>
            <div className="px-4 flex flex-col gap-4 pb-4">
              {pubs.map((pub, index) => (
                <div className="w-full flex items-center gap-4 border-b border-amber-600 p-3 drop-shadow-lg last:border-none">
                  <span className="font-bold text-lg text-[#6B4226] text-right">
                    #{index + 1}
                  </span>
                  <div className="flex flex-col w-full items-start gap-2">
                    <h2 className="font-semibold text-lg text-[#6B4226]">
                      {pub.name}{" "}
                      {index === 0 && (
                        <span className="text-sm font-normal text-[#C22026]">
                          🚩Largada
                        </span>
                      )}
                    </h2>
                    <div className="inline-flex w-full gap-2">
                      <button
                        className="text-[#F26522] border-2 border-[#F26522] text-nowrap px-2 py-2 rounded-md flex items-center justify-center gap-2"
                        onClick={() => showInMap(pub.position)}
                      >
                        <MapPin size={18} />
                        Mostrar no mapa
                      </button>
                      <a
                        className="bg-[#F26522] text-gray-100 text-nowrap px-2 py-2 rounded-md flex items-center justify-center gap-2"
                        href={pub.linkMaps}
                        target="_blank"
                      >
                        Maps
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
