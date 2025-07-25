import React from "react";
import { useVideos } from "@/hooks/useVideos";
import { YouTubeFeature } from "@/components/videos/youtube/YouTubeFeature";
import { YouTubeSection } from "@/components/videos/youtube/YouTubeSection";
import { Skeleton } from "@/components/ui/skeleton";

export const VideoSection: React.FC = () => {
  const { loading, featuredVideo, gridVideos } = useVideos();

  return (
    <div className="bg-black text-neutral-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl py-4 px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          <a href="/videos" className="hover:text-cyan-400">
            Videos
          </a>
        </h1>
        <p className="text-lg font-normal italic text-pretty text-neutral-400 sm-text-xl/8 mx-auto mb-12 mt-8">
          Exclusive recorded live performances and footage from floatingpoint.
        </p>

        <div className="mb-16">
          {loading ? (
            <Skeleton className="aspect-video w-full rounded-3xl bg-neutral-800" />
          ) : featuredVideo ? (
            <YouTubeFeature video={featuredVideo} />
          ) : (
            <p className="text-neutral-400 text-lg">
              No featured video available.
            </p>
          )}
        </div>

        <YouTubeSection videos={gridVideos} isLoading={loading} />
      </div>
    </div>
  );
};
