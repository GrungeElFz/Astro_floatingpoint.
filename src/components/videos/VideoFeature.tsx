import React, { useState } from "react";
import { PlayCircle, Youtube } from "lucide-react";
import { type VideoData } from "@/data/videos";

interface VideoFeatureProps {
  video: VideoData; // The featured video data
}

export const VideoFeature: React.FC<VideoFeatureProps> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false); // State to control video playback

  // Dynamically generate YouTube URLs
  const youtubeVideochUrl = `http://www.youtube.com/watch?v=${video.youtubeId}`; // Direct YouTube watch URL
  const youtubeThumbnailUrl = `http://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`; // High-res thumbnail
  const youtubeEmbedUrl = `http://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`; // Embed URL with autoplay

  return (
    <div className="relative bg-neutral-900 rounded-3xl overflow-hidden mb-16 shadow-2xl">
      {/* Video Player Area: Conditional rendering based on `isPlaying` state */}
      {!isPlaying ? (
        // Thumbnail mode: Clickable button to start playback
        <button
          onClick={() => setIsPlaying(true)}
          className="block relative aspect-video w-full cursor-pointer group focus:outline-none focus:ring-4 focus:ring-cyan-400"
          aria-label={`Play ${video.title}`}
        >
          <img
            src={youtubeThumbnailUrl}
            alt={`Thumbnail for ${video.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="eager" // Eager load for the main video thumbnail
          />
          <PlayCircle
            size={80}
            className="absolute inset-0 m-auto text-white/80 group-hover:text-white transition-colors"
          />
        </button>
      ) : (
        // Playback mode: Render YouTube iframe
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={youtubeEmbedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title}
          ></iframe>
        </div>
      )}

      {/* Featured Video Details */}
      <div className="p-6 text-left">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-400 mb-3">
          {video.categories.map((category) => (
            <span
              key={category}
              className="px-2 py-0.5 rounded-full bg-blue-400/20 text-blue-200"
            >
              {category}
            </span>
          ))}
        </div>
        <h3 className="text-3xl font-bold text-white mb-3">{video.title}</h3>
        <h3 className="text-md font-normal text-white mb-3">{video.duration}</h3>
        <p className="text-neutral-400 text-sm mb-4">
          by {video.artist} • {video.event} • {video.date}
        </p>
        <p className="text-neutral-500 text-base mb-8">{video.description}</p>
        <a
          href={youtubeVideochUrl} // Link to external YouTube page
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
        >
          Watch on YouTube
          <Youtube size={20} />
        </a>
      </div>
    </div>
  );
};
