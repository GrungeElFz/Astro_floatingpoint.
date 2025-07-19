import * as React from "react";
import type { GenreWithSpotifyData } from "@/types/genres";

interface GenreCardProps {
  genre: GenreWithSpotifyData;
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
      className={`group rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 text-neutral-300 h-full flex flex-col ${className}`}
    >
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300">
          {genre.name}
        </h3>
        <p className="text-sm font-light text-neutral-400 mb-4">
          {genre.description}
        </p>

        <div className="h-5 mt-auto pt-4">
          {genre.artist && genre.trackName && (
            <div className="flex items-center justify-center text-gray-400">
              <p className="text-sm truncate">
                {genre.artist} - {genre.trackName}
              </p>
            </div>
          )}
        </div>
      </div>

      {genre.spotifyTrackId && (
        <div className="p-2 pt-0">
          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${genre.spotifyTrackId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
};
