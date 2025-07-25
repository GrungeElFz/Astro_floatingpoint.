import type { VideoData } from "@/data/videos";

export type ProcessedVideo = VideoData & {
  duration?: string;
};
