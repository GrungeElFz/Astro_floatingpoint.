import React, { useState, useEffect, useRef } from "react";
import { genreCategoryNames } from "@/data/genres";
import type { GenreWithSpotifyData } from "@/types/genres";
import { GenreCard } from "@/components/genres/GenreCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

const GenreCardSkeleton: React.FC = () => (
  <div className="rounded-3xl bg-white/5 border border-white/10 h-full flex flex-col">
    <div className="p-6 flex flex-col flex-grow">
      <div className="animate-pulse">
        <div className="h-4 bg-neutral-700 rounded w-3/4 mb-4 mx-auto"></div>
      </div>
      <div className="animate-pulse flex-grow mb-8">
        <div className="h-3 bg-neutral-700 rounded w-full mb-2"></div>
        <div className="h-3 bg-neutral-700 rounded w-5/6 mb-2 mx-auto"></div>
      </div>
    </div>
    <div className="animate-pulse p-2 pt-0">
      <div className="aspect-square bg-neutral-800 rounded-xl"></div>
    </div>
  </div>
);

export const GenreSection: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [genres, setGenres] = useState<GenreWithSpotifyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const carouselContainerRef = useRef<HTMLDivElement>(null);

  // Phase 1: Fetch base data for an instant UI render.
  useEffect(() => {
    const fetchBaseGenres = async () => {
      try {
        const response = await fetch("/api/genres?enrich=false");
        if (!response.ok) {
          throw new Error("Failed to fetch base genres");
        }
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBaseGenres();
  }, []);

  // Phase 2: Asynchronously enrich the data with Spotify info.
  useEffect(() => {
    // Don't run this enrichment logic while the initial data is loading.
    if (isLoading) {
      return;
    }

    const enrichGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        if (!response.ok) {
          throw new Error("Failed to enrich genres");
        }
        const enrichedData = await response.json();
        setGenres(enrichedData);
      } catch (error) {
        console.error("Error enriching genres:", error);
        // If this fails, the cards will gracefully remain in their base state.
      }
    };

    enrichGenres();
  }, [isLoading]); // This effect runs once after the initial loading is complete.

  // This effect handles carousel state and remains largely the same.
  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    updateState();
    api.on("select", updateState);
    api.on("reInit", updateState);

    return () => {
      api.off("select", updateState);
      api.off("reInit", updateState);
    };
  }, [api]);

  const handleFilterClick = (category: string) => {
    const newFilter = activeFilter === category ? null : category;
    setActiveFilter(newFilter);
  };

  const visibleGenres = activeFilter
    ? genres.filter((g) => g.category === activeFilter)
    : genres;

  return (
    <section className="bg-black text-neutral-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl py-4 px-6 lg:px-8 text-center">
        <div className="mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            Our Genre Preferences
          </h2>
          <p className="text-lg font-normal italic text-pretty text-neutral-400 sm:text-xl/8 mx-auto mt-8">
            Exploring the depths of electronic music's most innovative and
            boundary-pushing subgenres.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {genreCategoryNames.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterClick(category)}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-colors ${
                activeFilter === category
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                  : "border-gray-700 text-neutral-400 hover:border-gray-500 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <Carousel
          ref={carouselContainerRef}
          setApi={setApi}
          opts={{ align: "start", loop: false }}
          className="w-full"
          // Add a key to force re-initialization when the filter changes
          key={activeFilter}
        >
          <CarouselContent className="-ml-4 py-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <GenreCardSkeleton />
                  </CarouselItem>
                ))
              : visibleGenres.map((genre) => (
                  <CarouselItem
                    key={genre.name}
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <GenreCard genre={genre} />
                  </CarouselItem>
                ))}
          </CarouselContent>

          <div className="flex items-center justify-center space-x-6 mt-12">
            <button
              onClick={() => api?.scrollPrev()}
              disabled={!api?.canScrollPrev()}
              className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white hover:border-neutral-500 transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="font-mono text-sm text-neutral-400 min-w-[50px]">
              {count > 0 ? `${current} / ${count}` : "0 / 0"}
            </div>
            <button
              onClick={() => api?.scrollNext()}
              disabled={!api?.canScrollNext()}
              className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white hover:border-neutral-500 transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </Carousel>
      </div>
    </section>
  );
};
