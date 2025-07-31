import React, { useState, useMemo } from "react";
import type { HostedVideo, VideoCategory } from "@/types/videos/hostedVideos";
import { allHostedVideos } from "@/data/videos/hostedVideos";
import { HostedVideoCard } from "./HostedVideoCard";
import { HostedVideoDialog } from "./HostedVideoDialog";

type FilterCategory = VideoCategory | "All";

export const HostedVideoSection: React.FC = () => {
  // State to manage which video is shown in the dialog
  const [selectedVideo, setSelectedVideo] = useState<HostedVideo | null>(null);

  const featuredVideo = useMemo(
    () => allHostedVideos.find((video) => video.isFeatured),
    []
  );

  const gridVideos = useMemo(
    () => allHostedVideos.filter((video) => !video.isFeatured),
    []
  );

  const allCategories = useMemo(() => {
    const categories = new Set<FilterCategory>();
    gridVideos.forEach((video) => {
      video.categories.forEach((cat) => categories.add(cat));
    });
    return ["All", ...Array.from(categories)].sort() as FilterCategory[];
  }, [gridVideos]);

  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") {
      return gridVideos;
    }
    return gridVideos.filter((video) =>
      video.categories.includes(activeCategory as VideoCategory)
    );
  }, [gridVideos, activeCategory]);

  return (
    <>
      <h2 className="text-4xl sm:text-5xl font-bold mb-4">Footages</h2>
      <p className="text-lg font-normal italic text-pretty text-neutral-400 sm:text-xl/8 mx-auto mb-12 mt-8">
        Exclusive footage and behind-the-scenes content.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {allCategories.map((category) => (
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
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <HostedVideoCard
              key={video.id}
              video={video}
              onClick={() => setSelectedVideo(video)}
            />
          ))
        ) : (
          <p className="text-neutral-400 text-lg col-span-full">
            No videos found for this category.
          </p>
        )}
      </div>

      {/* Only visible when a video is selected */}
      <HostedVideoDialog
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
};
