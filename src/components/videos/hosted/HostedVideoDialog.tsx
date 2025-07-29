import React from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import type { HostedVideo } from "@/data/videos/hostedVideos";

interface HostedVideoDialogProps {
  video: HostedVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HostedVideoDialog: React.FC<HostedVideoDialogProps> = ({
  video,
  isOpen,
  onClose,
}) => {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay
        className="bg-black/50 backdrop-blur-sm
        data-[state=open]:animate-in 
        data-[state=closed]:animate-out 
        data-[state=closed]:fade-out-0 
        data-[state=open]:fade-in-0 
        duration-500 
        ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      />

      <DialogContent
        className="bg-transparent border-0 max-w-11/12 max-h-11/12 flex items-center justify-center
        data-[state=open]:animate-in 
        data-[state=closed]:animate-out 
        data-[state=closed]:fade-out-0 
        data-[state=open]:fade-in-0 
        data-[state=closed]:zoom-out-95 
        data-[state=open]:zoom-in-95
        duration-500 
        ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      >
        <div className="rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 text-neutral-300 flex flex-col max-h-full">
          <div className="bg-black flex-1 min-h-0 flex items-center justify-center">
            <video
              src={video.videoUrl}
              controls
              autoPlay
              preload="metadata"
              className="w-auto h-auto max-w-full max-h-full object-contain"
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Card Info Section */}
          <div className="p-4 flex-shrink-0 flex flex-col bg-neutral-900/50">
            <div className="flex flex-wrap gap-2 mb-3">
              {video.categories.map((category) => (
                <span
                  key={category}
                  className="px-2 py-0.5 text-xs rounded-full bg-cyan-400/20 text-cyan-200"
                >
                  {category}
                </span>
              ))}
            </div>
            {video.event && (
              <h3 className="text-left text-lg font-bold text-white mb-1">
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
      </DialogContent>
    </Dialog>
  );
};
