import * as React from "react";
import type { GenreWithSpotifyData } from "@/types/genres";

// A skeleton specifically for the media player part of the card.
const PlayerSkeleton: React.FC = () => (
  <>
    <div className="p-6 pt-2">
      <div className="animate-pulse h-5 mt-auto pt-4">
        <div className="h-3 bg-neutral-700 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
    <div className="p-2 pt-0">
      <div className="animate-pulse aspect-square bg-neutral-800 rounded-xl"></div>
    </div>
  </>
);

// A component to encapsulate the player logic.
const SpotifyPlayer: React.FC<{ genre: GenreWithSpotifyData }> = ({
  genre,
}) => {
  // If the artist/track data hasn't loaded yet, show the skeleton.
  if (!genre.artist || !genre.trackName) {
    return <PlayerSkeleton />;
  }

  return (
    <>
      <div className="p-6 pt-2">
        <div className="h-5 mt-auto pt-4">
          <div className="flex items-center justify-center text-gray-400">
            <p className="text-sm truncate">
              {genre.artist} - {genre.trackName}
            </p>
          </div>
        </div>
      </div>
      {/* Render the cover art if available */}
      {genre.coverArtUrl ? (
        <div className="p-2 pt-0">
          <img
            src={genre.coverArtUrl}
            alt={`Cover art for ${genre.trackName}`}
            className="w-full h-auto aspect-square object-cover rounded-xl"
            loading="lazy"
          />
        </div>
      ) : (
        // Optional: Render a placeholder if there's no cover art
        <div className="p-2 pt-0">
          <div className="aspect-square bg-neutral-800/50 rounded-xl flex items-center justify-center">
            <p className="text-neutral-500 text-sm">No Image</p>
          </div>
        </div>
      )}
    </>
  );
};

export const GenreCard: React.FC<{
  genre: GenreWithSpotifyData;
  className?: string;
  onCardClick?: () => void;
}> = ({ genre, className, onCardClick }) => {
  return (
    <div
      onClick={onCardClick}
      className={`group rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 text-neutral-300 h-full flex flex-col transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1 ${className}`}
    >
      {/* Core card content renders instantly */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300">
          {genre.name}
        </h3>
        <p className="text-sm font-light text-neutral-400 mb-4 flex-grow">
          {genre.description}
        </p>
      </div>

      {/* The player section handles its own loading state */}
      <SpotifyPlayer genre={genre} />
    </div>
  );
};
