import React, { useState, useMemo } from "react";
import { YouTubeCard } from "@/components/videos/youtube/YouTubeCard.tsx";
import { type VideoData, type VideoCategory } from "@/data/videos";

type FilterCategory = VideoCategory | "All";

interface YouTubeSectionProps {
  videos: VideoData[];
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({
  videos: allVideos,
}) => {
  const allCategories = useMemo(() => {
    const categories = new Set<FilterCategory>();

    allVideos.forEach((video) => {
      video.categories.forEach((cat) => categories.add(cat));
    });

    return ["All", ...Array.from(categories)].sort() as FilterCategory[];
  }, [allVideos]);

  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") {
      return allVideos;
    }

    return allVideos.filter((video) =>
      video.categories.includes(activeCategory as VideoCategory)
    );
  }, [allVideos, activeCategory]);

  return (
    <section className="bg-black text-neutral-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {allCategories.map((category: FilterCategory) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border transition-colors ${
                activeCategory === category
                  ? "border-cyan-400 text-white"
                  : "border-gray-700 text-neutral-400 hover:border-gray-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <YouTubeCard key={video.id} video={video} />
            ))
          ) : (
            <p className="text-neutral-400 text-lg col-span-full">
              No videos found for this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
