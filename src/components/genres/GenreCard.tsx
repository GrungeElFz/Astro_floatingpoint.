import * as React from "react";
import type { Genre } from "@/data/genres";

interface GenreCardProps {
  genre: Genre;
  className?: string;
  onCardClick?: () => void;
}

export const GenreCard: React.FC<GenreCardProps> = ({
  genre,
  className,
  onCardClick,
}) => {
  return (
    <div
      onClick={onCardClick}
      className={`group block h-full rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300 ease-in-out ${className}`}
    >
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-lg font-bold text-white mb-2 transition-colors group-hover:text-cyan-300">
          {genre.name}
        </h3>
        <p className="text-sm font-light text-neutral-400 line-clamp-3">
          {genre.description}
        </p>
      </div>
    </div>
  );
};
