export interface YouTubeVideoDetails {
  duration: string;
}

/**
 * Fetches details for a list of YouTube video IDs using the YouTube Data API.
 */
export const fetchYouTubeVideoDetails = async (
  videoIds: string[]
): Promise<Map<string, YouTubeVideoDetails>> => {
  const apiKey = import.meta.env.YOUTUBE_API_KEY;
  if (!apiKey || videoIds.length === 0) {
    console.warn(
      "YOUTUBE_API_KEY not found in .env file. Skipping video enrichment."
    );
    return new Map();
  }

  const detailsMap = new Map<string, YouTubeVideoDetails>();
  const idsString = videoIds.join(",");
  const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${idsString}&key=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`YouTube API request failed: ${response.statusText}`);
    }
    const data = await response.json();

    data.items?.forEach((item: any) => {
      const formatDuration = (isoDuration: string) => {
        const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        if (!match) return "0:00";
        const hours = parseInt(match[1] || "0");
        const minutes = parseInt(match[2] || "0");
        const seconds = parseInt(match[3] || "0");
        if (hours > 0) {
          return `${hours}:${String(minutes).padStart(2, "0")}:${String(
            seconds
          ).padStart(2, "0")}`;
        }
        return `${minutes}:${String(seconds).padStart(2, "0")}`;
      };

      detailsMap.set(item.id, {
        duration: formatDuration(item.contentDetails.duration),
      });
    });
  } catch (error) {
    console.error("Error fetching YouTube video details:", error);
  }

  return detailsMap;
};
