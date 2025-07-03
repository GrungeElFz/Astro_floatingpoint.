import React, { useMemo } from "react";
import { YouTubeFeature } from "@/components/videos/youtube/YouTubeFeature";
import { YouTubeSection } from "@/components/videos/youtube/YouTubeSection";
import type { VideoData } from "@/data/videos";

interface VideoSectionProps {
  videos: VideoData[];
  displayMode: "grid" | "carousel";
}

export const VideoSection: React.FC<VideoSectionProps> = ({
  videos: allVideos,
  displayMode,
}) => {
  // useMemo will prevent re-calculating these on every render
  const featuredVideo = useMemo(
    () => allVideos.find((video) => video.isFeatured),
    [allVideos]
  );

  const gridVideos = useMemo(
    () => allVideos.filter((video) => !video.isFeatured),
    [allVideos]
  );

  return (
    <div className="bg-black text-neutral-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {displayMode === "grid" && (
          <>
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">Videos</h1>
            <p className="text-lg font-normal italic text-pretty text-neutral-400 sm:text-xl/8 mx-auto mb-12">
              Exclusive recorded live performances and footages from
              floatingpoint.
            </p>
          </>
        )}

        {featuredVideo ? (
          <div className="mb-16">
            <YouTubeFeature video={featuredVideo} />
          </div>
        ) : (
          <p className="text-neutral-400 text-lg mb-16">
            No featured video available.
          </p>
        )}

        <YouTubeSection videos={gridVideos} />
      </div>
    </div>
  );
};
