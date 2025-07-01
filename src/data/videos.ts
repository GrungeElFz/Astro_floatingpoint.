export type VideoCategory =
  | "Live Performance"
  | "Highlight"
  | "Footage"
  | "Behind the Scenes"
  | "Test";

export interface VideoData {
  id: string; // Unique ID for keying in lists, future integration
  title: string; // "Zenith - 0x01000111 (Live Performance)"
  artist: string; // "0x01000111"
  event: string; // "Zenith"
  location?: string; // "The Terrarium"
  date: string; // "June 06, 2025"
  description: string; // "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  youtubeId: string; // YouTube video ID for embedding
  duration: string; // YouTube API Integration in the future
  categories: VideoCategory[]; // ["Live Performance", "Hightlight", "Footage", ...]
  isFeatured?: boolean; // Main Video on the Videos page
}

export const allVideos: VideoData[] = [
  {
    id: "main-video-1",
    title: "Zenith - 0x01000111",
    artist: "0x01000111",
    event: "Zenith",
    location: "The Terrarium",
    date: "June 6, 2025",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    youtubeId: "fl_fQ88tG9M",
    duration: "53:22",
    categories: ["Live Performance"],
    isFeatured: true,
  },
  {
    id: "grid-video-1",
    title: "Zenith - Qualia",
    artist: "Qualia",
    event: "Zenith",
    location: "The Terrarium",
    date: "June 6, 2025",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    youtubeId: "psUWt720D7Q",
    duration: "23:29",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "grid-video-2",
    title: "Zenith - ILOVECAUSINGDRAMA",
    artist: "ILOVECAUSINGDRAMA",
    event: "Zenith",
    location: "The Terrarium",
    date: "June 6, 2025",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    youtubeId: "hP1YW4ZYq2I",
    duration: "4:15",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "grid-video-3",
    title: "The Dean's List - 0x01000111",
    artist: "0x01000111",
    event: "The Dean's List",
    location: "The Terrarium",
    date: "May 18, 2025",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    youtubeId: "c6P27ef6gVI",
    duration: "1:01",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "grid-video-4",
    title: "The Dean's List - ILOVECAUSINGDRAMA",
    artist: "ILOVECAUSINGDRAMA",
    event: "The Dean's List",
    location: "The Terrarium",
    date: "May 18, 2025",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    youtubeId: "5iBUYb8sXu0",
    duration: "0:41",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "grid-video-5",
    title: "Test - Title",
    artist: "Test - Performer",
    event: "Test - Event",
    location: "The Terrarium",
    date: "Month 00, 2025",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    youtubeId: "",
    duration: "0:00",
    categories: ["Test", "Behind the Scenes"],
  },
];
