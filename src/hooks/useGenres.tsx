import { useState, useEffect } from "react";
import type { GenreWithSpotifyData } from "@/types/genres";

export const useGenres = () => {
  const [genres, setGenres] = useState<GenreWithSpotifyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setIsLoading(true);
        // 1. Fetch base data for a fast initial render
        const baseResponse = await fetch("/api/genres?enrich=false");
        const baseData = await baseResponse.json();
        setGenres(baseData);
        setIsLoading(false); // Skeletons can now be removed

        // 2. Fetch enriched data in the background
        const enrichedResponse = await fetch("/api/genres");
        const enrichedData = await enrichedResponse.json();
        setGenres(enrichedData);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []); // Runs only once on mount

  return { genres, isLoading };
};
