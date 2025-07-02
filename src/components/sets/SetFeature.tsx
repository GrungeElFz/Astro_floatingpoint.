import * as React from "react";
import type { SetData } from "@/data/sets";
import { MapPin, Zap, Calendar, Ticket } from "lucide-react";
import { SiSoundcloud } from "@icons-pack/react-simple-icons";

// This type now includes all the fields from your updated SetData
type ProcessedSet = SetData & {
  coverArtUrl: string;
  fetchedTrackId: number | null;
};

interface SetFeatureProps {
  set: ProcessedSet;
}

export const SetFeature: React.FC<SetFeatureProps> = ({ set }) => {
  const soundcloudEmbedUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${set.fetchedTrackId}&color=%2300aabb&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true`;

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 bg-neutral-900/50 rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
      {/* Player Column */}
      <div className="w-full md:w-1/2 aspect-square bg-neutral-800">
        <div className="relative w-full h-full">
          {set.fetchedTrackId && (
            <iframe
              width="100%"
              height="100%"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={soundcloudEmbedUrl}
              title={set.title}
              className="absolute inset-0 w-full h-full"
            ></iframe>
          )}
        </div>
      </div>

      {/* Info Column - Styled to match YouTubeFeature */}
      <div className="w-full md:w-1/2 flex flex-col justify-center text-left p-6">
        <h3 className="text-3xl font-bold text-white mb-2">{set.title}</h3>
        <p className="text-lg text-cyan-400 mb-6">by {set.artist}</p>

        <div className="space-y-2 text-neutral-300 mb-6">
          <p className="flex items-center gap-3">
            <Ticket size={18} className="text-neutral-500" />
            <span>{set.event}</span>
          </p>
          <p className="flex items-center gap-3">
            <MapPin size={18} className="text-neutral-500" />
            <span>{set.location}</span>
          </p>
          <p className="flex items-center gap-3">
            <Calendar size={18} className="text-neutral-500" />
            <span>{set.date}</span>
          </p>
        </div>

        {/* Conditionally render the description */}
        {set.description && (
          <p className="text-neutral-400 leading-relaxed line-clamp-3 mb-8">
            {set.description}
          </p>
        )}

        <a
          href={set.soundcloudUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 mt-auto px-6 py-3 rounded-full bg-[#ff5500] text-white font-bold transition-colors self-start hover:bg-[#ff7700]"
        >
          Listen on SoundCloud
          <SiSoundcloud size={20} />
        </a>
      </div>
    </div>
  );
};