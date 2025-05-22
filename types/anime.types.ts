export interface AnimeBase {
  id: number;
  title: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

export interface AnimeMovie extends AnimeBase {
  type: "movie";
  runtime: number;
}

export interface AnimeSeries extends AnimeBase {
  type: "tv";
  number_of_seasons: number;
  number_of_episodes: number;
}

export type Anime = AnimeMovie | AnimeSeries;

export interface Video {
  id: string;
  key: string; // YouTube video ID
  name: string;
  site: string; // "YouTube", etc.
  type: string; // "Trailer", "Teaser", etc.
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
