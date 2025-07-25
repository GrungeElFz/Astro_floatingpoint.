import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonFeature: React.FC = () => (
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
