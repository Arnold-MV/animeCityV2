"use client";

import { useEffect, useState } from "react";
import { TrailerModal } from "../TrailerModal/TrailerModal";
import Image from "next/image";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";

interface Anime {
  id: number;
  title: string;
  poster: string;
  trailerId?: string;
  trailerSite?: string;
}

interface CardVideoProps {
  filter?: string; // ej: "MOVIE", "TV", etc.
  searchTerm?: string;
}

export const CardVideo = ({ filter, searchTerm }: CardVideoProps) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideoKey, setSelectedVideoKey] = useState<string | null>(null);

  const fetchAnimes = async (pageToFetch: number) => {
    try {
      setIsLoading(true);
      const query = searchTerm
        ? `
    query ($page: Int, $search: String) {
      Page(page: $page, perPage: 30) {
        pageInfo {
          hasNextPage
        }
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
          }
          coverImage {
            large
          }
          trailer {
            id
            site
          }
        }
      }
    }
  `
        : `
    query ($page: Int, $format: MediaFormat) {
      Page(page: $page, perPage: 30) {
        pageInfo {
          hasNextPage
        }
        media(type: ANIME, sort: POPULARITY_DESC, format: $format) {
          id
          title {
            romaji
          }
          coverImage {
            large
          }
          trailer {
            id
            site
          }
        }
      }
    }
  `;

      const res = await fetch("/api/anime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: searchTerm
            ? { page: pageToFetch, search: searchTerm }
            : { page: pageToFetch, format: filter },
        }),
      });

      const { data } = await res.json();

      type ApiAnime = {
        id: number;
        title: { romaji: string };
        coverImage: { large: string };
        trailer?: { id?: string; site?: string };
      };

      const newAnimes = data.Page.media
        .map((anime: ApiAnime) => ({
          id: anime.id,
          title: anime.title.romaji,
          poster: anime.coverImage.large,
          trailerId: anime.trailer?.id,
          trailerSite: anime.trailer?.site,
        }))
        // Filtramos aquí para que solo queden los que tienen trailer y poster válido
        .filter(
          (a: Anime) =>
            a.trailerId &&
            a.trailerSite?.toLowerCase() === "youtube" &&
            a.poster &&
            a.poster !== ""
        );

      setAnimes((prev) => {
        const existingIds = new Set(prev.map((a) => a.id));
        const filteredNew: Anime[] = newAnimes.filter(
          (a: Anime) => !existingIds.has(a.id)
        );
        return [...prev, ...filteredNew];
      });

      setHasNextPage(data.Page.pageInfo.hasNextPage);
      setIsLoading(false);
    } catch (e) {
      console.error("Error al cargar animes:", e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAnimes([]);
    setPage(1);
    fetchAnimes(1);
  }, [filter, searchTerm]);

  useEffect(() => {
    if (page !== 1) {
      fetchAnimes(page);
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleClick = (trailerId?: string, trailerSite?: string) => {
    if (trailerId && trailerSite?.toLowerCase() === "youtube") {
      setSelectedVideoKey(trailerId);
    } else {
      alert("Trailer no disponible");
    }
  };

  return (
    <>
      <div className="mt-8 px-4 gap-4 grid justify-center grid-cols-[repeat(auto-fill,_minmax(150px,_150px))]">
        {animes.map((anime) => (
          <div key={anime.id}>
            <button className="cursor-pointer relative w-full shadow-sm h-56">
              <Image
                src={anime.poster}
                alt={anime.title}
                fill
                className="rounded-lg object-cover"
                onClick={() => handleClick(anime.trailerId, anime.trailerSite)}
              />
            </button>
            <h2 className="text-center mt-1 text-sm">{anime.title}</h2>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <LoadMoreButton onClick={handleLoadMore} isLoading={isLoading} />
      )}

      {selectedVideoKey && (
        <TrailerModal
          videoKey={selectedVideoKey}
          onClose={() => setSelectedVideoKey(null)}
        />
      )}
    </>
  );
};
