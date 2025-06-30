import * as React from "react";
import { Calendar, Clock, MapPin, Users, Ticket } from "lucide-react";
import fallbackImage from "@/assets/logo.png";

interface EventCardProps {
  id?: string;
  title: string;
  date: string;
  time: string;
  eventDateTime?: number | null | undefined;
  location: string;
  performers: string[];
  pass: string;
  imageSrc?: string;
  className?: string;
  onCardClick?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  time,
  location,
  performers,
  pass,
  imageSrc,
  className,
  onCardClick,
}) => {
  return (
    <div
      id={id}
      onClick={onCardClick}
      className={`
        h-full backdrop-blur-sm bg-white/5 rounded-3xl border border-white/10 overflow-hidden text-neutral-300 flex flex-col transition-all duration-300 ease-in-out
        ${className || ""}
        `}
    >
      {/* Event Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <img
            src={fallbackImage.src}
            alt={title}
            className="w-fit h-fit"
            loading="lazy"
          />
        )}
      </div>

      {/* Event: Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="mt-2 mb-6 text-left text-2xl font-bold text-white group-hover:text-[#5be6ff] transition-colors">
          {title}
        </h3>
        {/* Event: Details */}
        <div className="space-y-3 mb-4 flex-grow">
          <div className="flex items-center text-gray-300">
            <Calendar size={16} className="mr-2 text-[#5be6ff]" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Clock size={16} className="mr-2 text-[#5be6ff]" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <MapPin size={16} className="mr-2 text-[#5be6ff]" />
            <span>{location}</span>
          </div>
          <div className="flex items-start text-gray-300">
            <div className="flex-none mr-2">
              <Users size={16} className="text-[#5be6ff]" />
            </div>
            <div className="flex flex-wrap gap-2 flex-grow">
              {performers.map((performer, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-[#5be6ff]/20 text-white rounded-full text-sm font-medium"
                >
                  {performer}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-grow mb-10" />

        {/* Event: Pass Link */}
        <a
          href={pass}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full inline-flex items-center justify-center border-2 border-gray-400 text-neutral-200 hover:text-white hover:outline-2 hover:outline-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 font-medium rounded-full py-2 px-4 transition-all duration-300 mt-auto"
        >
          Pass
          <Ticket size={16} className="ml-2" />
        </a>
      </div>
    </div>
  );
};
