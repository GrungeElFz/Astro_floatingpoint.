import type { APIRoute } from "astro";
import { allGenres, genreCategoryMap } from "@/data/genres";
import type { GenreWithSpotifyData } from "@/types/genres";

const getAccessToken = async () => {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    console.error(
      "Failed to fetch Spotify access token:",
      await response.text()
    );
    throw new Error("Spotify authentication failed.");
  }

  const data = await response.json();
  return data.access_token;
};

export const GET: APIRoute = async () => {
  try {
    const accessToken = await getAccessToken();
    const trackIds = allGenres.map((genre) => genre.spotifyTrackId).join(",");

    const tracksEndpoint = `https://api.spotify.com/v1/tracks?ids=${trackIds}`;

    const response = await fetch(tracksEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API request failed: ${response.statusText}`);
    }

    const apiData = await response.json();

    const trackDataMap = new Map();
    apiData.tracks.forEach((track: any) => {
      if (track) {
        trackDataMap.set(track.id, {
          artist: track.artists.map((_artist: any) => _artist.name).join(", "),
          trackName: track.name,
          coverArtUrl: track.album.images[0]?.url || null,
        });
      }
    });

    const genresWithSpotifyData: GenreWithSpotifyData[] = allGenres.map(
      (genre) => {
        const spotifyData = trackDataMap.get(genre.spotifyTrackId!);
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
    console.error("Error in /api/spotify route:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
