import React, { useState } from "react";
import { Play, Youtube, Eye, Calendar, MapPin } from "lucide-react";
import { type VideoData } from "@/data/videos";

interface VideoFeatureProps {
  video: VideoData;
}

export const VideoFeature: React.FC<VideoFeatureProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // YouTube URLs
  const youtubeVideoUrl = `http://www.youtube.com/watch?v=${video.youtubeId}`;
  const youtubeThumbnailUrl = `http://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
  const youtubeEmbedUrl = `http://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`;

  return (
    // Main container
    <div className="flex flex-col md:flex-row gap-2 lg:gap-6 bg-neutral-900/50 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
      {/* Video Player */}
      <div className="w-full md:w-2/3 lg:w-[65%] aspect-video">
        <div className="relative w-full h-full group">
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 w-full h-full focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
              aria-label={`Play ${video.title}`}
            >
              <img
                src={youtubeThumbnailUrl}
                alt={`Thumbnail for ${video.title}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 group-hover:scale-105"></div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-[#5be6ff] hover:bg-[#4dd4ed] text-black rounded-full p-4 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100">
                  <Play size={32} className="ml-1" />
                </div>
              </div>

              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                {video.duration}
              </div>
            </button>
          ) : (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={youtubeEmbedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            ></iframe>
          )}
        </div>
      </div>

      {/* Video Info */}
      <div className="w-full md:w-1/3 lg:w-[35%] flex flex-col justify-center text-left p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {video.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-200 text-sm font-medium"
            >
              {category}
            </span>
          ))}
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">{video.event}</h3>
        <p className="text-lg text-cyan-400 mb-6">by {video.artist}</p>

        <div className="space-y-2 text-neutral-300 mb-6">
          <p className="flex items-center gap-3">
            <MapPin size={18} className="text-neutral-500" />
            <span>{video.location}</span>
          </p>
          <p className="flex items-center gap-3">
            <Calendar size={18} className="text-neutral-500" />
            <span>{video.date}</span>
          </p>
        </div>

        <p className="text-neutral-400 leading-relaxed line-clamp-3 mb-8">
          {video.description}
        </p>

        <a
          href={youtubeVideoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FF0000] text-white font-bold transition-colors self-start hover:shadow-lg hover:shadow-red-500/25"
        >
          Watch on YouTube
          <Youtube size={20} />
        </a>
      </div>
    </div>
  );
};
