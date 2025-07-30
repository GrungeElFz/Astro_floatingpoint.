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

export const allHostedVideos: HostedVideo[] = [
  // [ 2025.04.25 - Engrammatic Eden ]
  {
    id: "hosted-engrammatic_eden-1",
    artist: "ILOVECAUSINGDRAMA",
    event: "Engrammatic Eden",
    date: "April 25, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025.04.25%20-%20Engrammatic%20Eden%2FGrunge's%20Pixel%209%20Pro%20XL%2F2025.04.25-20.24.56-engrammatic_eden.mp4?alt=media&token=07dd753e-b30d-48c6-a0b5-3985c895d0ae",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "hosted-engrammatic_eden-2",
    artist: "Venus The Fly Trap",
    event: "Engrammatic Eden",
    date: "April 25, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025.04.25%20-%20Engrammatic%20Eden%2FGrunge's%20Pixel%209%20Pro%20XL%2F2025.04.25-21.59.45-engrammatic_eden.mp4?alt=media&token=fa69a578-ea33-4b21-adfa-e326bbd74fd4",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "hosted-engrammatic_eden-3",
    artist: "0x01000111",
    event: "Engrammatic Eden",
    date: "April 25, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025.04.25%20-%20Engrammatic%20Eden%2FGrunge's%20RayBan%20Meta%2F2025.04.25-22.13.55-engrammatic_eden.mp4?alt=media&token=6fca7bd3-eda5-4975-b378-2615081acc49",
    categories: ["Live Performance", "Highlight", "POV"],
  },
  {
    id: "hosted-engrammatic_eden-4",
    artist: "Qualia",
    event: "Engrammatic Eden",
    date: "April 25, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025.04.25%20-%20Engrammatic%20Eden%2FGrunge's%20Pixel%209%20Pro%20XL%2F2025.04.25-23.01.45-engrammatic_eden.mp4?alt=media&token=c23339a6-e515-4a22-bef0-ebe2aa48a6ba",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "hosted-engrammatic_eden-5",
    artist: "Qualia",
    event: "Engrammatic Eden",
    date: "April 25, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025.04.25%20-%20Engrammatic%20Eden%2FGrunge's%20RayBan%20Meta%2F2025.04.25-23.10.18-engrammatic_eden.mp4?alt=media&token=ba08774f-c69a-4d6a-866f-67b90e20ed4f",
    categories: ["Live Performance", "Footage"],
  },
  {
    id: "hosted-engrammatic_eden-6",
    artist: "Seeking Polaris",
    event: "Engrammatic Eden",
    date: "April 25, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025.04.25%20-%20Engrammatic%20Eden%2FGrunge's%20RayBan%20Meta%2F2025.04.26-00.14.10-engrammatic_eden.mp4?alt=media&token=fba1714d-0aca-4092-907f-edd1a4953e09",
    categories: ["Footage", "POV", "Behind the Scenes"],
  },

  // [ 2025.05.03 - Cheap Data ]
  {
    id: "hosted-cheap_data-1",
    artist: "Combinator J",
    event: "Cheap Data",
    date: "May 3, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025.05.03%20-%20Cheap%20Data%2FGrunge's%20Pixel%209%20Pro%20XL%2F2025.05.03-22.42.18-cheap_data.mp4?alt=media&token=8923fd22-4f9f-4c0f-a976-0213ef6eedfb",
    categories: ["Behind the Scenes"],
  },
  {
    id: "hosted-cheap_data-2",
    artist: "Combinator J",
    event: "Cheap Data",
    date: "May 3, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025.05.03%20-%20Cheap%20Data%2FGrunge's%20Pixel%209%20Pro%20XL%2F2025.05.03-22.44.12-cheap_data.mp4?alt=media&token=ee8d4ac0-5910-4542-ad37-9d96087ebc84",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "hosted-cheap_data-3",
    artist: "Josh Tong",
    event: "Cheap Data",
    date: "May 4, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025.05.03%20-%20Cheap%20Data%2FGrunge's%20Pixel%209%20Pro%20XL%2F2025.05.04-00.27.23-cheap_data.mp4?alt=media&token=986ccd1f-b64f-4af2-acd6-6ed1bbb57d5c",
    categories: ["Live Performance", "Highlight"],
  },
  {
    id: "hosted-cheap_data-4",
    artist: "Josh Tong",
    event: "Cheap Data",
    date: "May 4, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025.05.03%20-%20Cheap%20Data%2FGrunge's%20RayBan%20Meta%2F2025.05.04-00.41.54-cheap_data.mp4?alt=media&token=c9800efb-0434-4fe7-92be-bc0661fe1d3a",
    categories: ["Live Performance", "Footage"],
  },
  {
    id: "hosted-cheap_data-5",
    artist: "0x01000111",
    event: "Cheap Data",
    date: "May 4, 2025",
    videoUrl:
      "https://firebasestorage.googleapis.com/v0/b/astro-floatingpoint-cf267.firebasestorage.app/o/2025.05.03%20-%20Cheap%20Data%2FGrunge's%20RayBan%20Meta%2F2025.05.04-01.20.11-cheap_data.mp4?alt=media&token=157d1816-d3d1-4ad8-957d-e5746f861e4f",
    categories: ["Behind the Scenes"],
  },
];
