import React, { useState, useMemo } from "react";
import { YouTubeCard } from "@/components/videos/youtube/YouTubeCard";
import type { ProcessedVideo } from "@/types/videos";
import { type VideoCategory } from "@/data/videos";
import { Skeleton } from "@/components/ui/skeleton";

type FilterCategory = VideoCategory | "All";

interface YouTubeSectionProps {
  videos: ProcessedVideo[];
  isLoading: boolean;
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({
  videos,
  isLoading,
}) => {
  const allCategories = useMemo(() => {
    const categories = new Set<FilterCategory>();
    videos.forEach((video) => {
      video.categories.forEach((cat) => categories.add(cat));
    });
    return ["All", ...Array.from(categories)].sort() as FilterCategory[];
  }, [videos]);

  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");

  const reversedFilteredVideos = useMemo(() => {
    const filtered =
      activeCategory === "All"
        ? videos
        : videos.filter((video) =>
            video.categories.includes(activeCategory as VideoCategory)
          );
    return [...filtered].reverse();
  }, [videos, activeCategory]);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {allCategories.map((category: FilterCategory) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full border text-sm font-medium transition-colors ${
              activeCategory === category
                ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                : "border-gray-700 text-neutral-400 hover:border-gray-500 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <Skeleton key={i} className="aspect-[16/13] w-full rounded-3xl bg-neutral-800" />
          ))
        ) : reversedFilteredVideos.length > 0 ? (
          reversedFilteredVideos.map((video) => (
            <YouTubeCard key={video.id} video={video} />
          ))
        ) : (
          <p className="text-neutral-400 text-lg col-span-full">
            No videos found for this category.
          </p>
        )}
      </div>
    </div>
  );
};