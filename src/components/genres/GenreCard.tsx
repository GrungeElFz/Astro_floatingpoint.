import * as React from "react";
import { useState } from "react";
import type { GenreWithSpotifyData } from "@/types/genres";
import { Play } from "lucide-react";

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
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const handleCardClick = () => {
    setIsPlayerVisible(!isPlayerVisible);
    if (onCardClick) {
      onCardClick();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group block rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300 ease-in-out cursor-pointer ${className}`}
    >
      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2 transition-colors group-hover:text-cyan-300">
          {genre.name}
        </h3>
        <p className="text-sm font-light text-neutral-400 line-clamp-3 mb-8">
          {genre.description}
        </p>

        <div className="h-5">
          {genre.artist && genre.trackName && (
            <div className="flex items-center text-gray-400">
              <Play
                size={16}
                className={`mr-2 flex-shrink-0 transition-transform duration-300 ${
                  isPlayerVisible ? "rotate-90" : ""
                }`}
              />
              <p className="text-sm truncate">
                {genre.artist} - {genre.trackName}
              </p>
            </div>
          )}
        </div>
      </div>

      {isPlayerVisible && genre.spotifyTrackId && (
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
