import type { APIRoute } from "astro";
import { allSets } from "@/data/sets";

export const GET: APIRoute = async () => {
  const soundcloudData = [];
  const oembedEndpoint = "https://soundcloud.com/oembed";

  for (const set of allSets) {
    try {
      // Call SoundCloud's oEmbed API for each track URL
      const response = await fetch(
        `${oembedEndpoint}?format=json&url=${set.soundcloudUrl}`
      );
      if (!response.ok) continue;

      const apiData = await response.json();

      // Extract the track ID from the embed HTML for the player
      const trackIdMatch = apiData.html.match(/tracks%2F(\d+)/);
      const trackId = trackIdMatch ? parseInt(trackIdMatch[1], 10) : null;

      // Combine local data with data from the API
      soundcloudData.push({
        ...set, // (Local Data: id, title, artist, event, location)
        coverArtUrl: apiData.thumbnail_url, // Album Cover
        apiTitle: apiData.title, // API title for reference
        apiArtist: apiData.author_name,
        fetchedTrackId: trackId,
      });
    } catch (error) {
      console.error(`Failed to fetch data for ${set.soundcloudUrl}`, error);
    }
  }

  return new Response(JSON.stringify(soundcloudData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
