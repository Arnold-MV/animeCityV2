"use client";

import { useState } from "react";
import { TrailerModal } from "./components/TrailerModal/TrailerModal";
import { CardVideo } from "./components/CardVideo/CardVideo";
import { Search } from "./components/Search/Search";

export default function Home() {
  const [selectedVideoKey, setSelectedVideoKey] = useState<string | null>(null);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchSoloLevelingTrailer = async () => {
    setIsLoadingTrailer(true);
    const query = `
      query {
        Media(search: "Ore-dake-Level-Up-na-Ken-Season-2--Arise-from-the-Shadow", type: ANIME) {
          trailer {
            id
            site
          }
        }
      }
    `;

    try {
      const res = await fetch("/api/anime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      const trailer = data.Media.trailer;
      if (trailer && trailer.site.toLowerCase() === "youtube") {
        setSelectedVideoKey(trailer.id);
      } else {
        alert("Trailer no disponible");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert("Error al cargar el trailer");
    } finally {
      setIsLoadingTrailer(false);
    }
  };

  return (
    <>
      <section className="w-full relative h-auto ">
        <img
          className="mask-b-from-20% mask-b-to-99% max-[602px]:hidden -z-1 brightness-70 object-fill absolute top-0 left-0 w-full h-auto "
          src="/img/soloLevelingBanner.webp"
          alt="Logo"
        />

        <div className="z-10 max-[602px]:hidden pt-10 lg:h-[90vh] max-lg:pt-28 flex flex-col justify-end  items-start px-4 text-slate-100">
          <span className="lg:text-3xl md:text-2xl text-xl  font-semibold flex items-center gap-1.5">
            <svg
              className="text-red-700"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              height="30px"
              width="30px"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M92.043 24.678c-2.944.002-5.89.177-8.828.535C36.212 30.937 9.05 81.023 22.537 137.08c3.273 13.606 8.647 26.307 15.57 37.668-.006-.09-.007-.177-.013-.266 1.35 2.25 2.966 4.417 4.85 6.438 11.252 12.063 27.762 13.945 36.796 4.672 9.034-9.273 7.16-26.484-4.09-38.547-1.41 7.565-7.797 13.434-15.77 13.434-8.998 0-16.35-7.356-16.35-16.355 0-1.885.26-3.35.824-4.92C54 117.51 73.796 100.763 98.912 96.082c30.028-5.596 59.188 7.624 75.38 31.316 4.616 13.202 6.077 24.766 5.616 35.514-.84 19.612-8.37 37.303-17.142 57.244-12.184 27.692-26.016 59.814-22.526 104.215 1.285 57.826 31.464 113.704 84.887 145.392 82.36 48.853 188.73 21.7 237.592-60.64 48.86-82.338 21.713-188.687-60.648-237.54-13.1-7.77-26.807-13.61-40.795-17.617 45.042 34.597 60.388 96.118 36.68 147.875-.532-4.287-1.34-8.593-2.44-12.897-13.92-54.505-68.97-88.07-123.476-74.158-8.882 2.263-16.897 6.52-24.515 10.807 35.86-5.066 70.14 16.573 79.31 52.47 9.83 38.507-13.138 77.213-51.657 87.04-9.925 2.535-19.965 2.87-29.563 1.326-7.373-2.62-14.602-5.98-21.586-10.123-14.722-8.732-26.925-20.077-36.413-33.076-16.793-32.11-20.372-62.952-8.217-94.378l-.035-.014.508-1.154c8.797-19.996 17.684-40.13 18.707-63.97.397-9.248-.45-18.94-2.855-29.228-.53-5.94-1.51-12-2.987-18.136-12.644-52.555-56.53-91.7-100.695-91.672zm282.39 57.53c-28.528-.353-54.46 19.41-67.154 61.7 30.764-33.286 128.965-6.368 182.1 96.524C476.72 139.258 421.974 82.794 374.43 82.207z"></path>
            </svg>
            SERIE
          </span>
          <h1 className="font-bold text-4xl  xl:text-6xl lg:text-6xl">
            Ore dake Level Up na Ken: Season 2
          </h1>
          <p className="  md:w-xl md:text-lg lg:w-2xl xl:w-3xl xl:text-2xl  lg:text-xl mt-6">
            Lo que no te mata te hace más fuerte, pero en el caso de Sung
            Jinwoo, lo que lo mató lo hizo más fuerte. Después de ser
            brutalmente asesinado por monstruos en una mazmorra de alto rango,
            Jinwoo regresó con el Sistema, un programa que solo él puede ver y
            que eleva su nivel en todos los sentidos. Ahora, está decidido a
            descubrir los secretos detrás de sus poderes y la mazmorra que los
            engendró.
          </p>
          <button
            disabled={isLoadingTrailer}
            onClick={fetchSoloLevelingTrailer}
            className="text-lg xl:text-xl font-semibold mt-7 px-7 py-2.5 bg-red-700 rounded-full hover:bg-red-800 transition-all cursor-pointer flex items-center gap-2.5"
          >
            <svg
              width="18px"
              height="18px"
              viewBox="-0.5 0 7 7"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-347.000000, -3766.000000)"
                  fill="currentColor"
                >
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path d="M296.494737,3608.57322 L292.500752,3606.14219 C291.83208,3605.73542 291,3606.25002 291,3607.06891 L291,3611.93095 C291,3612.7509 291.83208,3613.26444 292.500752,3612.85767 L296.494737,3610.42771 C297.168421,3610.01774 297.168421,3608.98319 296.494737,3608.57322"></path>
                  </g>
                </g>
              </g>
            </svg>
            Reproducir
          </button>
        </div>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CardVideo searchTerm={searchTerm} />
      </section>
      {selectedVideoKey && (
        <TrailerModal
          videoKey={selectedVideoKey}
          onClose={() => setSelectedVideoKey(null)}
        />
      )}
    </>
  );
}
