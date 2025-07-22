import React, { useState, useEffect, useRef } from "react";
import type { GenreWithSpotifyData } from "@/types/genres";
import { Play, Music4 } from "lucide-react";

export const PlayerSkeleton: React.FC = () => (
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

const ActivePlayerView: React.FC<{
  genre: GenreWithSpotifyData;
  isExiting: boolean;
}> = ({ genre, isExiting }) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  return (
    <div
      className={`p-2 pt-0 mt-auto relative transition-opacity duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center text-neutral-400 transition-opacity ${
          isIframeLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-center gap-x-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-neutral-500 [animation-delay:0s]"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-neutral-500 [animation-delay:0.2s]"></div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-neutral-500 [animation-delay:0.4s]"></div>
        </div>
      </div>
      <iframe
        className={`w-full relative z-10 transition-opacity duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] rounded-2xl ${
          isIframeLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ height: "352px" }}
        src={`https://open.spotify.com/embed/track/${genre.spotifyTrackId}?utm_source=generator&theme=0&autoplay=1`}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`Spotify Player for ${genre.trackName}`}
        onLoad={() => setIsIframeLoaded(true)}
      ></iframe>
    </div>
  );
};

const InactivePlayerView: React.FC<{
  genre: GenreWithSpotifyData;
  onPlay: () => void;
  showInitialHint: boolean;
}> = ({ genre, onPlay, showInitialHint }) => {
  const [showHint, setShowHint] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showInitialHint) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const hintTimeout = setTimeout(() => {
            setShowHint(true);
            const hideTimeout = setTimeout(() => setShowHint(false), 1500);
            return () => clearTimeout(hideTimeout);
          }, 1000);
          observer.unobserve(entry.target);
          return () => clearTimeout(hintTimeout);
        }
      },
      { threshold: 0.75 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [showInitialHint]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`mt-auto transition-opacity duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="px-6 pt-4 pb-2 text-center">
        <p className="text-sm font-semibold truncate text-white">
          {genre.trackName}
        </p>
        <p className="text-xs truncate text-neutral-400">{genre.artist}</p>
      </div>
      <div className="px-2 pb-2">
        <div
          ref={cardRef}
          className="group relative aspect-square w-full cursor-pointer"
          onClick={onPlay}
        >
          {genre.coverArtUrl ? (
            <img
              src={genre.coverArtUrl}
              alt={`Cover art for ${genre.trackName}`}
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full rounded-xl bg-neutral-800/50 flex items-center justify-center text-neutral-500">
              <Music4 size={32} />
            </div>
          )}
          <div
            className={`
              absolute inset-0 flex items-center justify-center rounded-xl 
              transition-opacity duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              md:group-hover:opacity-100 
              ${showHint ? "opacity-100" : "opacity-0"}
            `}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div
              className="relative p-3 rounded-full border border-cyan-400/30 bg-cyan-900/30 text-cyan-300
                         hover:scale-105 hover:border-cyan-400/40 hover:bg-cyan-900/40
                         transition-all ease-in-out duration-300"
            >
              <Play size={24} className="ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GenrePlayer: React.FC<{
  genre: GenreWithSpotifyData;
  isActive: boolean;
  onPlay: () => void;
}> = ({ genre, isActive, onPlay }) => {
  const [shouldRenderPlayer, setShouldRenderPlayer] = useState(isActive);
  const hasBeenPlayed = useRef(false);

  useEffect(() => {
    if (isActive) {
      setShouldRenderPlayer(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRenderPlayer(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  if (!genre.artist || !genre.trackName) {
    return <PlayerSkeleton />;
  }

  const handlePlay = () => {
    hasBeenPlayed.current = true;
    onPlay();
  };

  if (shouldRenderPlayer) {
    return <ActivePlayerView genre={genre} isExiting={!isActive} />;
  }

  return (
    <InactivePlayerView
      genre={genre}
      onPlay={handlePlay}
      showInitialHint={!hasBeenPlayed.current}
    />
  );
};
