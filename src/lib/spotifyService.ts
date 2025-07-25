import type { GenreWithSpotifyData } from "@/types/genres";

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyAlbum {
  images: SpotifyImage[];
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
}

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const TRACKS_ENDPOINT = "https://api.spotify.com/v1/tracks?ids=";

/**
 * Fetches a Spotify API access token using client credentials.
 * This function is kept internal to the service.
 */
const getAccessToken = async (): Promise<string> => {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(TOKEN_URL, {
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

/**
 * Fetches detailed track information from Spotify for a given list of track IDs.
 * @param trackIds An array of Spotify Track IDs.
 * @returns A Map where keys are track IDs and values are objects with track details.
 */
export const fetchTrackDetails = async (
  trackIds: string[]
): Promise<Map<string, Partial<GenreWithSpotifyData>>> => {
  if (!trackIds || trackIds.length === 0) {
    return new Map();
  }

  const accessToken = await getAccessToken();
  const CHUNK_SIZE = 50;
  const trackIdChunks: string[][] = [];

  for (let i = 0; i < trackIds.length; i += CHUNK_SIZE) {
    trackIdChunks.push(trackIds.slice(i, i + CHUNK_SIZE));
  }

  const fetchPromises = trackIdChunks.map((chunk) => {
    const ids = chunk.join(",");
    return fetch(`${TRACKS_ENDPOINT}${ids}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });

  const responses = await Promise.all(fetchPromises);
  let allApiTracks: SpotifyTrack[] = [];
  for (const response of responses) {
    if (response.ok) {
      const apiData = await response.json();
      allApiTracks = allApiTracks.concat(apiData.tracks);
    } else {
      console.error("A Spotify API chunk request failed:", response.status);
    }
  }

  const trackDataMap = new Map<string, Partial<GenreWithSpotifyData>>();
  allApiTracks.forEach((track) => {
    if (track) {
      trackDataMap.set(track.id, {
        artist: track.artists.map((artist) => artist.name).join(", "),
        trackName: track.name,
        // The line below is the only change needed
        coverArtUrl: track.album.images[0]?.url || undefined,
      });
    }
  });

  return trackDataMap;
};
