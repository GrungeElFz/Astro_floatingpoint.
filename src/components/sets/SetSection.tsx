import React, { useState, useEffect, useMemo } from "react";
import type { SetData } from "@/data/sets";
import { SetFeature } from "./SetFeature";
import { SetCard } from "./SetCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type ProcessedSet = SetData & {
  coverArtUrl: string;
  fetchedTrackId: number | null;
};

interface SetsSectionProps {
  displayMode?: "grid" | "carousel";
}

// --- SKELETON COMPONENTS WITH DARKER COLORS ---

const SkeletonFeature = () => (
  <div className="flex flex-col md:flex-row gap-6 lg:gap-8 bg-neutral-900/50 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
    <div className="w-full md:w-1/2 aspect-square bg-neutral-800">
      <Skeleton className="w-full h-full bg-neutral-800" />
    </div>
    <div className="w-full md:w-1/2 flex flex-col justify-center text-left p-6">
      <Skeleton className="h-8 w-5/6 mb-2 bg-neutral-800" />
      <Skeleton className="h-6 w-1/3 mb-6 bg-neutral-800" />
      <div className="space-y-2 text-neutral-300 mb-6">
        <p className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full bg-neutral-800" />
          <Skeleton className="h-5 w-1/4 bg-neutral-800" />
        </p>
        <p className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full bg-neutral-800" />
          <Skeleton className="h-5 w-1/3 bg-neutral-800" />
        </p>
        <p className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded-full bg-neutral-800" />
          <Skeleton className="h-5 w-1/2 bg-neutral-800" />
        </p>
      </div>
      <Skeleton className="h-16 w-full mb-8 bg-neutral-800" />
      <Skeleton className="h-12 w-48 rounded-full self-start mt-auto bg-neutral-800" />
    </div>
  </div>
);

const SkeletonCard = () => (
  <div className="group block rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10">
    <div className="relative aspect-square bg-neutral-900">
      <Skeleton className="w-full h-full bg-neutral-800" />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <Skeleton className="h-6 w-3/4 mb-1 bg-neutral-800" />
      <Skeleton className="h-4 w-1/2 mb-3 bg-neutral-800" />
      <div className="flex justify-between items-center text-sm text-neutral-400 mb-4">
        <Skeleton className="h-4 w-1/3 bg-neutral-800" />
        <Skeleton className="h-4 w-1/4 bg-neutral-800" />
      </div>
      <Skeleton className="h-4 w-full bg-neutral-800" />
      <Skeleton className="h-4 w-5/6 mt-1 bg-neutral-800" />
    </div>
  </div>
);

export const SetSection: React.FC<SetsSectionProps> = ({
  displayMode = "grid",
}) => {
  const [sets, setSets] = useState<ProcessedSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("/api/sets")
        .then((res) => res.json())
        .then((data: ProcessedSet[]) => {
          setSets(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load sets:", err);
          setLoading(false);
        });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  const featuredSet = useMemo(() => sets.find((set) => set.isFeatured), [sets]);
  const gridSets = useMemo(() => sets.filter((set) => !set.isFeatured), [sets]);

  const setsDisplay =
    displayMode === "carousel" ? (
      <div>
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: false }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {gridSets.map((set) => (
              <CarouselItem
                key={set.id}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3"
              >
                <SetCard set={set} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={() => api?.scrollPrev()}
            disabled={current === 1}
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
            disabled={current === count}
            className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white hover:border-neutral-500 transition-colors"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {gridSets.map((set) => (
          <SetCard key={set.id} set={set} />
        ))}
      </div>
    );

  return (
    <section className="bg-black text-neutral-100 py-16 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mb-12">
          {displayMode === "grid" ? (
            <h1 className="text-5xl sm:text-6xl font-bold mb-4">
              Recorded Sets
            </h1>
          ) : (
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <a href="/sets">Recorded Sets</a>
            </h2>
          )}
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Dive into our archive of live performances and exclusive mixes from
            underground electronic artists.
          </p>
        </div>

        {loading ? (
          <div>
            <div className="mb-24">
              <SkeletonFeature />
            </div>

            {displayMode === "carousel" ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8">
                  {[...Array(3)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-4 mt-8">
                  <Skeleton className="h-8 w-8 rounded-full bg-neutral-800" />
                  <div className="flex items-center justify-center space-x-2">
                    <Skeleton className="h-2 w-2 rounded-full bg-neutral-800" />
                    <Skeleton className="h-2 w-2 rounded-full bg-neutral-800" />
                    <Skeleton className="h-2 w-2 rounded-full bg-neutral-800" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full bg-neutral-800" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {[...Array(3)].map((_, i) => (
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
            {setsDisplay}
          </div>
        )}
      </div>
    </section>
  );
};
