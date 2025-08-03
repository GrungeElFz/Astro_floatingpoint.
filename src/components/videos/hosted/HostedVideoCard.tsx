import React, { useRef } from "react";
import { Play } from "lucide-react";
import type { HostedVideo, VideoCategory } from "@/types/videos/hostedVideos";
import { Skeleton } from "@/components/ui/skeleton";
import { useHostedVideos } from "@/hooks/useHostedVideos";

interface HostedVideoCardProps {
  video: HostedVideo;
  onClick: () => void;
}

export const HostedVideoCard: React.FC<HostedVideoCardProps> = ({
  video,
  onClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { duration, isLoading: isDurationLoading } = useHostedVideos(videoRef);

  return (
    <div className="group rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 text-neutral-300 flex flex-col">
      <button
        onClick={onClick}
        className="relative aspect-[4/5] bg-black flex items-center justify-center overflow-hidden"
        aria-label={`Play ${video.event}`}
      >
        <video
          ref={videoRef}
          src={video.videoUrl + "#t=0.1"}
          preload="metadata"
          playsInline
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        ></video>

        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300 ease-in-out">
          <div className="bg-[#5be6ff] hover:bg-[#4dd4ed] text-black rounded-full p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100">
            <Play size={24} className="ml-0.5" />
          </div>

          <div className="absolute bottom-2 right-2">
            {isDurationLoading ? (
              <Skeleton className="h-5 w-10 rounded bg-black/80" />
            ) : (
              duration && (
                <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                  {duration}
                </div>
              )
            )}
          </div>
        </div>
      </button>

      <div className="p-4 flex flex-col flex-grow transition-all duration-300 ease-in-out group-hover:bg-white/10">
        <div className="flex flex-wrap gap-2 mb-3">
          {video.categories.map((category: VideoCategory) => (
            <span
              key={category}
              className="px-2 py-0.5 text-xs rounded-full bg-cyan-400/20 text-cyan-200"
            >
              {category}
            </span>
          ))}
        </div>
        {video.event && (
          <h3 className="text-left text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
            {video.event}
          </h3>
        )}
        {video.artist && (
          <p className="text-left text-sm text-neutral-300 mb-3">
            by {video.artist}
          </p>
        )}
        <div className="flex justify-between items-center text-sm text-neutral-400 mt-auto pt-2">
          {video.location && <span>{video.location}</span>}
          <span>{video.date}</span>
        </div>
      </div>
    </div>
  );
};
