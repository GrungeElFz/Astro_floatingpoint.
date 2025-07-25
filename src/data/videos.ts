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
  categories: VideoCategory[]; // ["Live Performance", "Hightlight", "Footage", ...]
  isFeatured?: boolean; // Main Video on the Videos page
}

export const allVideos: VideoData[] = [
  {
    id: "grid-video-1",
    title: "The Dean's List - ILOVECAUSINGDRAMA",
    artist: "ILOVECAUSINGDRAMA",
    event: "The Dean's List",
    location: "The Terrarium",
    date: "May 18, 2025",
    description:
      "Dive into a live performance from ILOVECAUSINGDRAMA. Recorded during The Dean's List event at The Terrarium on May 18, 2025.",
    youtubeId: "JogscRECHM8",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "grid-video-2",
    title: "The Dean's List - 0x01000111",
    artist: "0x01000111",
    event: "The Dean's List",
    location: "The Terrarium",
    date: "May 18, 2025",
    description:
      "Dive into a live performance from 0x01000111. Recorded during The Dean's List event at The Terrarium on May 18, 2025.",
    youtubeId: "20mjEXpOuhY",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "grid-video-3",
    title: "Zenith - ILOVECAUSINGDRAMA",
    artist: "ILOVECAUSINGDRAMA",
    event: "Zenith",
    location: "The Terrarium",
    date: "June 6, 2025",
    description:
      "Dive into a live performance from ILOVECAUSINGDRAMA. Recorded during the Zenith event at The Terrarium on June 6, 2025.",
    youtubeId: "kl_CS-R85Kg",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "main-video-4",
    title: "Zenith - 0x01000111",
    artist: "0x01000111",
    event: "Zenith",
    location: "The Terrarium",
    date: "June 6, 2025",
    description:
      "Dive into a live performance from 0x01000111 through a 53:22 minute set. Recorded during the Zenith event at The Terrarium on June 6, 2025.",
    youtubeId: "fiIhjW837Gw",
    categories: ["Live Performance"],
    isFeatured: true,
  },
  {
    id: "grid-video-5",
    title: "Zenith - Qualia",
    artist: "Qualia",
    event: "Zenith",
    location: "The Terrarium",
    date: "June 6, 2025",
    description:
      "Dive into a live performance from Qualia. Recorded during the Zenith event at The Terrarium on June 6, 2025.",
    youtubeId: "WNshywj_Y2I",
    categories: ["Live Performance", "Highlight"],
  },
];
