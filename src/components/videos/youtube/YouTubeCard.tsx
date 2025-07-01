import * as React from "react";
import { Play } from "lucide-react";

interface YouTubeCardProps {
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

export const YouTubeCard: React.FC<YouTubeCardProps> = ({ video, className }) => {
  const youtubeVideoUrl = `http://www.youtube.com/watch?v=${video.youtubeId}`;
  const youtubeThumbnailUrl = `http://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;

  return (
    <a
      href={youtubeVideoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 text-neutral-300 transition-all duration-300 ease-in-out hover:bg-white/10 ${
        className || ""
      }`}
    >
      <div className="relative aspect-video bg-neutral-900 flex items-center justify-center">
        <img
          src={youtubeThumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 ease-in-out group-hover:scale-105"></div>

        {/* Play Button */}
        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#5be6ff] hover:bg-[#4dd4ed] text-black rounded-full p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100">
          <Play size={24} className="ml-0.5" />
        </button>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
          {video.duration}
        </div>
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
        <h3 className="text-left text-lg font-bold text-white mb-1 group-hover:text-[#5be6ff] transition-colors">
          {video.event}
        </h3>
        <p className="text-left text-sm text-neutral-300 mb-3">
          by {video.artist}
        </p>
        <div className="flex justify-between items-center text-sm text-neutral-400 mb-4">
          <span>{video.location}</span>
          <span>{video.date}</span>
        </div>
        <p className="text-sm font-light text-neutral-400 line-clamp-2">
          {video.description}
        </p>
      </div>
    </a>
  );
};
