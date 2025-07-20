import type { Genre } from "@/data/genres";

// Combined data structure post Spotify API fetch
export interface GenreWithSpotifyData extends Genre {
  category: string | null;
  artist?: string;
  trackName?: string;
  coverArtUrl?: string;
}
