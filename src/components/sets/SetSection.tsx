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

type ProcessedSet = SetData & {
  coverArtUrl: string;
  fetchedTrackId: number | null;
};

interface SetsSectionProps {
  displayMode?: "grid" | "carousel";
}

export const SetSection: React.FC<SetsSectionProps> = ({
  displayMode = "grid",
}) => {
  const [sets, setSets] = useState<ProcessedSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  const featuredSet = useMemo(() => sets.find((set) => set.isFeatured), [sets]);
  const gridSets = useMemo(() => sets.filter((set) => !set.isFeatured), [sets]);

  if (loading) {
    return <div className="text-white text-center py-24">Loading sets...</div>;
  }

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

        {featuredSet && (
          <div className="mb-24">
            <SetFeature set={featuredSet} />
          </div>
        )}

        {setsDisplay}
      </div>
    </section>
  );
};
