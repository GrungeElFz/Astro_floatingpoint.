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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBaseGenres = async () => {
      try {
        const response = await fetch("/api/genres?enrich=false");
        if (!response.ok) throw new Error("Failed to fetch base genres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsInitialLoading(false);
      }
    };
    fetchBaseGenres();
  }, []);

  useEffect(() => {
    if (isInitialLoading) return;
    const enrichGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        if (!response.ok) throw new Error("Failed to enrich genres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error enriching genres:", error);
      }
    };
    enrichGenres();
  }, [isInitialLoading]);

  useEffect(() => {
    if (!api) return;
    const updateCarouselState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };
    updateCarouselState();
    api.on("select", updateCarouselState);
    api.on("reInit", updateCarouselState);
    return () => {
      api.off("select", updateCarouselState);
      api.off("reInit", updateCarouselState);
    };
  }, [api, genres]);

  useEffect(() => {
    if (api && activeFilter) {
      const targetIndex = genres.findIndex((g) => g.category === activeFilter);
      if (targetIndex !== -1) {
        api.scrollTo(targetIndex);
      }
    }
  }, [activeFilter, api, genres]);

  const handleFilterClick = (category: string) => {
    setActiveFilter((prev) => (prev === category ? null : category));
  };

  return (
    <section className="bg-black text-neutral-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl py-4 px-6 lg:px-8 text-center">
        <div className="mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4">
            Our Genre Preferences
          </h2>
          <p className="text-lg font-normal italic text-pretty text-neutral-400 sm-text-xl/8 mx-auto mt-8">
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

        <Carousel setApi={setApi} opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-4 py-4">
            {isInitialLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <GenreCardSkeleton />
                  </CarouselItem>
                ))
              : genres.map((genre) => (
                  <CarouselItem
                    key={genre.name}
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <GenreCard
                      genre={genre}
                      isActive={activePlayerId === genre.name}
                      onPlay={() =>
                        setActivePlayerId(
                          activePlayerId === genre.name ? null : genre.name
                        )
                      }
                      onCardClick={() => {
                        if (activeFilter && activeFilter !== genre.category) {
                          setActiveFilter(null);
                        }
                      }}
                      className={
                        activeFilter && activeFilter !== genre.category
                          ? "opacity-50 blur-sm scale-95"
                          : "opacity-100 blur-none scale-100"
                      }
                    />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <div className="flex items-center justify-center space-x-6 mt-12">
            <button
              onClick={() => api?.scrollPrev()}
              disabled={!api?.canScrollPrev()}
              className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 hover:text-white hover:border-neutral-500"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="font-mono text-sm text-neutral-400 min-w-[50px]">
              {count > 0 ? `${current} / ${count}` : "0 / 0"}
            </div>
            <button
              onClick={() => api?.scrollNext()}
              disabled={!api?.canScrollNext()}
              className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 hover:text-white hover:border-neutral-500"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </Carousel>
      </div>
    </section>
  );
};
