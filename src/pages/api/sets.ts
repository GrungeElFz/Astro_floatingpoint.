import type { APIRoute } from "astro";
import { allSets } from "@/data/sets";
import type { ProcessedSet } from "@/types/sets";

export const GET: APIRoute = async () => {
  const oembedEndpoint = "https://soundcloud.com/oembed";

  const fetchPromises = allSets.map(async (set) => {
    try {
      const response = await fetch(
        `${oembedEndpoint}?format=json&url=${set.soundcloudUrl}`
      );

      if (!response.ok) {
        // On failure, return the original data with placeholder fields
        return { ...set, coverArtUrl: "", fetchedTrackId: null };
      }

      const apiData = await response.json();
      const trackIdMatch = apiData.html.match(/tracks%2F(\d+)/);
      const trackId = trackIdMatch ? parseInt(trackIdMatch[1], 10) : null;

      return {
        ...set,
        coverArtUrl: apiData.thumbnail_url,
        fetchedTrackId: trackId,
        apiTitle: apiData.title,
        apiArtist: apiData.author_name,
      };
    } catch (error) {
      console.error(`Failed to fetch data for ${set.soundcloudUrl}`, error);
      // Return base data on caught errors
      return { ...set, coverArtUrl: "", fetchedTrackId: null };
    }
  });

  // Wait for all fetches to complete
  const soundcloudData: ProcessedSet[] = await Promise.all(fetchPromises);

  return new Response(JSON.stringify(soundcloudData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
