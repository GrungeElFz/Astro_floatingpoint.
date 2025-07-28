// Firebase: Videos

export type VideoCategory =
  | "Live Performance"
  | "Highlight"
  | "Footage"
  | "POV"
  | "Behind the Scenes"
  | "Test";

export interface HostedVideo {
  id: string; // Unique ID for keying in lists, future integration
  artist?: string; // "0x01000111"
  event?: string; // "Zenith"
  location?: string; // "The Terrarium"
  date: string; // "June 06, 2025"
  description?: string; // "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
  videoUrl: string; // The public `Download URL` from Firebase Storage
  categories: VideoCategory[]; // ["Live Performance", "Hightlight", "Footage", ...]
  isFeatured?: boolean; // Main Footage Video on the Videos page
}

// Add your self-hosted videos to this array.
export const allHostedVideos: HostedVideo[] = [
  {
    id: "hosted-1",
    artist: "ILOVECAUSINGDRAMA",
    event: "Engrammatic Eden",
    date: "April 25, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025_04_26-20_24_56.-engrammatic_eden.mp4?alt=media&token=91f6a3d8-4ceb-4e0f-aca4-25a56703bf7f",
    categories: ["Live Performance", "Footage"],
  },
  {
    id: "hosted-2",
    artist: "Venus The Fly Trap",
    event: "Engrammatic Eden",
    date: "April 25, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025_04_26-21_59_45-engrammatic_eden.mp4?alt=media&token=e7e98e64-6eb5-4521-b0f0-b77a09edba6c",
    categories: ["Live Performance", "Footage"],
  },
  {
    id: "hosted-3",
    artist: "0x01000111",
    event: "Engrammatic Eden",
    date: "April 25, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025_04_26-22_13_55-engrammatic_eden.mp4?alt=media&token=309b5464-9745-493d-966e-c8f56f1c0fc5",
    categories: ["Live Performance", "Footage", "POV"],
  },
  {
    id: "hosted-4",
    artist: "Qualia",
    event: "Engrammatic Eden",
    date: "April 25, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025_04_26-23_01_45-engrammatic-eden.mp4?alt=media&token=b8cae00d-2d93-4be3-b0c5-b8ea1903c13a",
    categories: ["Live Performance", "Footage"],
  },
];
