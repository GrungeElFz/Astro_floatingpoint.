import React from "react";
import type { GenreWithSpotifyData } from "@/types/genres";
import { GenrePlayer } from "@/components/genres/GenrePlayer";

export const GenreCard: React.FC<{
  genre: GenreWithSpotifyData;
  className?: string;
  isActive: boolean;
  onCardClick?: () => void;
  onPlay: () => void;
}> = ({ genre, className, onCardClick, isActive, onPlay }) => {
  return (
    <div
      onClick={onCardClick}
      className={`group rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 text-neutral-300 h-full flex flex-col transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1 min-h-[520px] ${className}`}
    >
      <div className="p-6 pb-0 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300">
          {genre.name}
        </h3>
        <p className="text-sm font-light text-neutral-400 mb-4 flex-grow">
          {genre.description}
        </p>
      </div>

      <GenrePlayer genre={genre} isActive={isActive} onPlay={onPlay} />
    </div>
  );
};
