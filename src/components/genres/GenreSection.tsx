import React, { useState, useEffect, useRef } from "react";
import {
  type Genre,
  allGenres,
  genreCategoryMap,
  genreCategoryNames,
} from "@/data/genres";
import { GenreCard } from "@/components/genres/GenreCard.tsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const GenreSection: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const carouselContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleFilterClick = (category: string) => {
    const newFilter = activeFilter === category ? null : category;
    setActiveFilter(newFilter);

    if (newFilter !== null) {
      const targetGenre = allGenres.find(
        (genre) => genreCategoryMap.get(genre.name) === newFilter
      );
      if (targetGenre && api) {
        const targetIndex = allGenres.indexOf(targetGenre);
        if (targetIndex > -1) {
          api.scrollTo(targetIndex);
        }
      }
    }
  };

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
        >
          <CarouselContent className="-ml-4">
            {allGenres.map((genre) => {
              const genreCategory = genreCategoryMap.get(genre.name);
              const shouldDeemphasize =
                activeFilter !== null && activeFilter !== genreCategory;
              return (
                <CarouselItem
                  key={genre.name}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <GenreCard
                    genre={genre}
                    onCardClick={() => {
                      if (shouldDeemphasize) {
                        setActiveFilter(null);
                      }
                    }}
                    className={
                      shouldDeemphasize
                        ? "opacity-50 blur-sm scale-95 cursor-pointer"
                        : "opacity-100 blur-none scale-100"
                    }
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="flex items-center justify-center space-x-6 mt-12">
            <button
              onClick={() => api?.scrollPrev()}
              disabled={current === 1}
              className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white hover:border-neutral-500 transition-colors"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="font-mono text-sm text-neutral-400 min-w-[50px]">
              {count > 0 ? `${current} / ${count}` : "0 / 0"}
            </div>
            <button
              onClick={() => api?.scrollNext()}
              disabled={current === count}
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
