import React, { useState, useEffect } from "react";
import { useSets } from "@/hooks/useSets";
import type { ProcessedSet } from "@/types/sets";
import { SetFeature } from "./SetFeature";
import { SetCard } from "./SetCard";
import { SkeletonFeature } from "./SetFeature.skeleton";
import { SkeletonCard } from "./SetCard.skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // <-- Add this import

const generateSetId = (set: ProcessedSet) => `set-${set.id}`;

interface SetsSectionProps {
  displayMode?: "grid" | "carousel";
}

export const SetSection: React.FC<SetsSectionProps> = ({
  displayMode = "grid",
}) => {
  const { loading, events, featuredSet, gridSets } = useSets();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleFilterClick = (eventName: string | null) => {
    const newFilter = activeFilter === eventName ? null : eventName;
    setActiveFilter(newFilter);

    if (!newFilter || !gridSets) return;
    const targetSet = gridSets.find((set) => set.event === newFilter);
    if (!targetSet) return;

    if (displayMode === "carousel" && api) {
      const targetIndex = gridSets.findIndex((set) => set.event === newFilter);
      if (targetIndex > -1) api.scrollTo(targetIndex, false);
    } else if (displayMode === "grid") {
      const targetId = generateSetId(targetSet);
      document
        .getElementById(targetId)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const renderSetCards = (setsToRender: ProcessedSet[]) => {
    if (!setsToRender) return null;
    return setsToRender.map((set) => {
      const shouldDeemphasize = activeFilter && set.event !== activeFilter;
      const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (shouldDeemphasize) {
          e.preventDefault();
          setActiveFilter(null);
        }
      };
      const card = (
        <SetCard
          key={set.id}
          id={generateSetId(set)}
          set={set}
          onCardClick={handleCardClick}
          className={
            shouldDeemphasize
              ? "opacity-50 blur-sm scale-95 cursor-pointer"
              : "opacity-100 blur-none scale-100"
          }
        />
      );
      if (displayMode === "carousel") {
        return (
          <CarouselItem
            key={set.id}
            className="pl-4 basis-full sm:basis-1/2 md:basis-1/3"
          >
            {card}
          </CarouselItem>
        );
      }
      return card;
    });
  };

  return (
    <section className="bg-black text-neutral-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl py-4 px-6 lg:px-8 text-center">
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <a
              href="/sets"
              className={
                displayMode === "carousel" ? "hover:text-cyan-400" : ""
              }
            >
              Recorded Sets
            </a>
          </h1>
          <p className="text-lg font-normal italic text-pretty text-neutral-400 sm:text-xl/8 mx-auto mb-12 mt-8">
            Dive into our archive of live performances and exclusive mixes from
            underground electronic artists.
          </p>
        </div>

        {loading ? (
          <div>
            <div className="mb-24">
              <SkeletonFeature />
            </div>
            <div className="flex justify-center flex-wrap gap-4 mb-12">
              <Skeleton className="h-10 w-28 rounded-full bg-neutral-800" />
              <Skeleton className="h-10 w-32 rounded-full bg-neutral-800" />
            </div>
            {displayMode === "carousel" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {featuredSet && (
              <div className="mb-24">
                <SetFeature set={featuredSet} />
              </div>
            )}
            <div className="flex justify-center flex-wrap gap-4 mb-12">
              {events.map((event) => (
                <button
                  key={event}
                  onClick={() => handleFilterClick(event)}
                  className={`px-6 py-2 rounded-full border text-sm font-medium transition-colors ${
                    activeFilter === event
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-gray-700 text-neutral-400 hover:border-gray-500 hover:text-white"
                  }`}
                >
                  {event}
                </button>
              ))}
            </div>
            {displayMode === "carousel" ? (
              <div>
                <Carousel
                  setApi={setApi}
                  opts={{ align: "start", loop: false }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {gridSets && renderSetCards(gridSets)}
                  </CarouselContent>
                </Carousel>
                <div className="flex items-center justify-center space-x-4 mt-8">
                  <button
                    onClick={() => api?.scrollPrev()}
                    disabled={!api?.canScrollPrev()}
                    className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white hover:border-neutral-500 transition-colors"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex items-center justify-center space-x-2">
                    {Array.from({ length: count }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          current === index + 1
                            ? "bg-neutral-400"
                            : "bg-neutral-700 hover:bg-neutral-500"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => api?.scrollNext()}
                    disabled={!api?.canScrollNext()}
                    className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white hover:border-neutral-500 transition-colors"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {gridSets && renderSetCards(gridSets)}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
