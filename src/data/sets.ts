export interface SetData {
  id: number;
  title: string;
  artist: string;
  event: string;
  location: string;
  date: string;
  description?: string;
  soundcloudUrl: string;
  isFeatured?: boolean;
}

export const allSets: SetData[] = [
  {
    id: 8,
    title: "Zenith - Qualia | The Terrarium (2025.06.06)",
    artist: "Qualia",
    event: "Zenith",
    location: "The Terrarium",
    date: "June 6, 2025",
    soundcloudUrl: "https://on.soundcloud.com/yLsWP0UN2RmiQxig6Z",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 7,
    title: "Zenith - 0x01000111 | The Terrarium (2025.06.06)",
    artist: "0x01000111",
    event: "Zenith",
    location: "The Terrarium",
    date: "June 6, 2025",
    soundcloudUrl: "https://on.soundcloud.com/pIcFGhUD92As7eMRCT",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    isFeatured: true,
  },
  {
    id: 6,
    title: "Zenith - ILOVECAUSINGDRAMA | The Terrarium (2025.06.06)",
    artist: "ILOVECAUSINGDRAMA",
    event: "Zenith",
    location: "The Terrarium",
    date: "June 6, 2025",
    soundcloudUrl: "https://on.soundcloud.com/iMtjz7gj26nc9a40We",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 5,
    title: "The Dean's List - ILOVECAUSINGDRAMA | The Terrarium (2025.05.18)",
    artist: "ILOVECAUSINGDRAMA",
    event: "The Dean's List",
    location: "The Terrarium",
    date: "May 18, 2025",
    soundcloudUrl: "https://on.soundcloud.com/Am0oaoPj9VA943kZSQ",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 4,
    title: "The Dean's List - Qualia | The Terrarium (2025.05.18)",
    artist: "Qualia",
    event: "The Dean's List",
    location: "The Terrarium",
    date: "May 18, 2025",
    soundcloudUrl: "https://on.soundcloud.com/R3ZbHBlcEWcbQMvkGZ",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 3,
    title: "The Dean's List - 0x01000111 | The Terrarium (2025.05.18)",
    artist: "0x01000111",
    event: "The Dean's List",
    location: "The Terrarium",
    date: "May 18, 2025",
    soundcloudUrl: "https://on.soundcloud.com/fALycGUYybYlrcawOQ",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 2,
    title: "The Dean's List - DYTRO | The Terrarium (2025.05.18)",
    artist: "DYTRO",
    event: "The Dean's List",
    location: "The Terrarium",
    date: "May 18, 2025",
    soundcloudUrl: "https://on.soundcloud.com/IcSRq5GXo7NZt8hPKM",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    id: 1,
    title: "Bipolarity - 0x01000111 | The Terrarium (2025.05.08)",
    artist: "0x01000111",
    event: "Bipolarity",
    location: "The Terrarium",
    date: "May 8, 2025",
    soundcloudUrl: "https://on.soundcloud.com/yBPa8voGaFPQz3rHBd",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
];
