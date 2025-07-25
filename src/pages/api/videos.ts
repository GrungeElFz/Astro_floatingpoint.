import type { APIRoute } from "astro";
import { allVideos } from "@/data/videos";
import { fetchYouTubeVideoDetails } from "@/lib/youtubeService";
import type { ProcessedVideo } from "@/types/videos";

export const GET: APIRoute = async () => {
  const videoIds = allVideos.map((v) => v.youtubeId);
  const videoDetailsMap = await fetchYouTubeVideoDetails(videoIds);

  const processedVideos: ProcessedVideo[] = allVideos.map((video) => {
    const details = videoDetailsMap.get(video.youtubeId);
    return {
      ...video,
      duration: details?.duration,
    };
  });

  return new Response(JSON.stringify(processedVideos), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
