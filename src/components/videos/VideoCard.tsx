import * as React from "react";
import { PlayCircle } from "lucide-react";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    artist: string;
    event: string;
    location?: string;
    date: string;
    description: string;
    youtubeId: string;
    duration: string;
    categories: string[];
  };
  className?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, className }) => {
  const youtubeVideoUrl = `http://www.youtube.com/watch?v=${video.youtubeId}`;
  const youtubeThumbnailUrl = `http://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;

  return (
    <a
      href={youtubeVideoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 text-neutral-300 transition-all duration-300 ease-in-out ${
        className || ""
      }`}
    >
      <div className="relative aspect-video bg-neutral-900 flex items-center justify-center">
        <img
          src={youtubeThumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <PlayCircle
          size={48}
          className="absolute text-white/80 hover:text-white transition-colors"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {video.categories.map((category, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-xs rounded-full bg-cyan-400/20 text-cyan-200"
            >
              {category}
            </span>
          ))}
        </div>
        <h3 className="text-left text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-3">
          {video.title}
        </h3>
        <p className="text-left text-md font-normal text-white group-hover:text-cyan-400 transition-colors mb-3">
          {video.duration}
        </p>
        <p className="text-sm text-neutral-400 mb-3">
          by {video.artist} • {video.event} • {video.date}
        </p>
        <p className="text-xs text-neutral-500 line-clamp-2">
          {video.description}
        </p>
      </div>
    </a>
  );
};
