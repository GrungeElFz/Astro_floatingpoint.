export type VideoCategory =
  | "Live Performance"
  | "Highlight"
  | "Footage"
  | "POV"
  | "Behind the Scenes";

export interface HostedVideo {
  id: string;
  artist?: string;
  event?: string;
  location?: string;
  date: string;
  description?: string;
  videoUrl: string;
  categories: VideoCategory[];
  isFeatured?: boolean;
}
