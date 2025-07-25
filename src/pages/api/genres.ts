import type { APIRoute } from "astro";
import { allGenres, genreCategoryMap } from "@/data/genres";
import type { GenreWithSpotifyData } from "@/types/genres";
import { fetchTrackDetails } from "@/lib/spotifyService";

export const GET: APIRoute = async ({ url }) => {
  const enrich = url.searchParams.get("enrich") !== "false";

  // --- Non-Enriched Data ---
  if (!enrich) {
    const baseGenres = allGenres.map((genre) => ({
      ...genre,
      category: genreCategoryMap.get(genre.name) || null,
    }));
    return new Response(JSON.stringify(baseGenres), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // --- Enrichment Logic ---
  try {
    const allTrackIds = allGenres
      .map((genre) => genre.spotifyTrackId)
      .filter((id): id is string => !!id);

    // Call our service to handle all the complex Spotify logic
    const trackDataMap = await fetchTrackDetails(allTrackIds);

    // Map the results back to our genre objects
    const genresWithSpotifyData: GenreWithSpotifyData[] = allGenres.map(
      (genre) => {
        const spotifyData = genre.spotifyTrackId
          ? trackDataMap.get(genre.spotifyTrackId)
          : {};
        return {
          ...genre,
          category: genreCategoryMap.get(genre.name) || null,
          ...spotifyData,
        };
      }
    );

    return new Response(JSON.stringify(genresWithSpotifyData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/genres route:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
