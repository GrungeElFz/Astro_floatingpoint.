import * as React from "react";
import { Play } from "lucide-react";
import type { SetData } from "@/data/sets";

type ProcessedSet = SetData & {
  coverArtUrl: string;
};

interface SetCardProps {
  set: ProcessedSet;
  id: string;
  className?: string;
  onCardClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const SetCard: React.FC<SetCardProps> = ({
  set,
  id,
  className,
  onCardClick,
}) => {
  return (
    <div
      id={id}
      onClick={onCardClick}
      className={`transition-all duration-300 ${className || ""}`}
    >
      <a
        href={set.soundcloudUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10"
      >
        <div className="relative aspect-square bg-neutral-900 flex items-center justify-center">
          <img
            src={set.coverArtUrl}
            alt={set.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 ease-in-out group-hover:scale-105"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-[#5be6ff] hover:bg-[#4dd4ed] text-black rounded-full p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100">
              <Play size={24} className="ml-0.5" />
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-left text-lg font-bold text-white mb-1 group-hover:text-[#5be6ff] transition-colors">
            {set.title}
          </h3>
          <p className="text-left text-sm text-neutral-300 mb-3">
            by {set.artist}
          </p>
          <div className="flex justify-between items-center text-sm text-neutral-400 mb-4">
            <span>{set.location}</span>
            <span>{set.date}</span>
          </div>
          {set.description && (
            <p className="text-sm font-light text-neutral-400 line-clamp-2">
              {set.description}
            </p>
          )}
        </div>
      </a>
    </div>
  );
};
