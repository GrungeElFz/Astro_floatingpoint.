import { useState, useEffect, useMemo } from "react";
import type { ProcessedVideo } from "@/types/videos";

export const useVideos = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/videos");
        if (!response.ok) throw new Error("Failed to fetch videos");
        const data: ProcessedVideo[] = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const featuredVideo = useMemo(
    () => videos.find((video) => video.isFeatured),
    [videos]
  );

  const gridVideos = useMemo(
    () => videos.filter((video) => !video.isFeatured),
    [videos]
  );

  return { loading, featuredVideo, gridVideos };
};
