import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard: React.FC = () => (
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
