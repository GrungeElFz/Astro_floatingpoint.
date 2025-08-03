import React, { useState, useMemo, useEffect } from "react";
import type { HostedVideo, VideoCategory } from "@/types/videos/hostedVideos";
import { allHostedVideos } from "@/data/videos/hostedVideos";
import { HostedVideoCard } from "./HostedVideoCard";
import { HostedVideoDialog } from "./HostedVideoDialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

type FilterCategory = VideoCategory | "All";

interface HostedVideoSectionProps {
  displayMode?: "grid" | "carousel";
}

export const HostedVideoSection: React.FC<HostedVideoSectionProps> = ({
  displayMode = "grid",
}) => {
  const [selectedVideo, setSelectedVideo] = useState<HostedVideo | null>(null);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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

  const generateVideoId = (video: HostedVideo) => `hosted-video-${video.id}`;

  const handleCategoryClick = (category: FilterCategory) => {
    const newCategory = activeCategory === category ? "All" : category;
    setActiveCategory(newCategory);

    if (newCategory === "All" || !gridVideos.length) return;

    const targetVideo = gridVideos.find((video) =>
      video.categories.includes(newCategory as VideoCategory)
    );
    if (!targetVideo) return;

    if (displayMode === "carousel" && api) {
      const reversedGridVideos = [...gridVideos].reverse();
      const targetIndex = reversedGridVideos.findIndex((video) =>
        video.categories.includes(newCategory as VideoCategory)
      );
      if (targetIndex > -1) api.scrollTo(targetIndex);
    } else if (displayMode === "grid") {
      const targetId = generateVideoId(targetVideo);
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const renderVideoCards = (videos: HostedVideo[]) => {
    return [...videos].reverse().map((video) => {
      const shouldDeemphasize =
        activeCategory !== "All" &&
        !video.categories.includes(activeCategory as VideoCategory);

      const cardWrapper = (
        <div
          key={video.id}
          id={generateVideoId(video)}
          onClick={(e) => {
            if (shouldDeemphasize) {
              e.preventDefault();
              setActiveCategory("All");
            }
          }}
          className={
            shouldDeemphasize
              ? "opacity-50 blur-sm scale-95 cursor-pointer transition-all duration-300"
              : "opacity-100 blur-none scale-100 transition-all duration-300"
          }
        >
          <HostedVideoCard
            video={video}
            onClick={
              !shouldDeemphasize ? () => setSelectedVideo(video) : () => {}
            }
          />
        </div>
      );

      if (displayMode === "carousel") {
        return (
          <CarouselItem key={video.id} className="sm:basis-1/2 md:basis-1/3">
            {cardWrapper}
          </CarouselItem>
        );
      }
      return cardWrapper;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center mt-24">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 mt-24">Footages</h2>
        <p className="text-lg font-normal italic text-pretty text-neutral-400 sm:text-xl/8 mx-auto mb-12 mt-8">
          Exclusive footage and behind-the-scenes content.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
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

        {displayMode === "carousel" ? (
          <div>
            <Carousel
              setApi={setApi}
              opts={{ align: "start" }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {renderVideoCards(gridVideos)}
              </CarouselContent>
            </Carousel>
            <div className="flex items-center justify-center space-x-6 mt-12">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={!api?.canScrollPrev()}
                className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 hover:text-white hover:border-neutral-500"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="font-mono text-sm text-neutral-400 min-w-[50px]">
                {count > 0 ? `${current} / ${count}` : ""}
              </div>
              <button
                onClick={() => api?.scrollNext()}
                disabled={!api?.canScrollNext()}
                className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 hover:text-white hover:border-neutral-500"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderVideoCards(gridVideos)}
          </div>
        )}
      </div>

      <HostedVideoDialog
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
};
