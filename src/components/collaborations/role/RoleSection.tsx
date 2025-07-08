import React, { useState, useEffect } from "react";
import { roles } from "@/data/roles";
import { RoleCard } from "./RoleCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface RoleSectionProps {
  displayMode?: "grid" | "carousel";
}

export const RoleSection: React.FC<RoleSectionProps> = ({
  displayMode = "grid",
}) => {
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

  return (
    <section className="bg-black text-neutral-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-bold">
            Join the Collective
          </h2>
          <p className="mt-8 mx-auto max-w-2xl text-lg text-pretty text-neutral-400">
            We're always looking for passionate individuals who share our vision
            of underground electronic music culture. Find your place in the
            floatingpoint.family.
          </p>
        </div>

        {displayMode === "grid" ? (
          // Grid Layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role) => (
              <RoleCard key={role.title} role={role} />
            ))}
          </div>
        ) : (
          // Carousel Layout
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: false }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {roles.map((role) => (
                <CarouselItem
                  key={role.title}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <RoleCard role={role} />
                </CarouselItem>
              ))}
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
        )}
      </div>
    </section>
  );
};
