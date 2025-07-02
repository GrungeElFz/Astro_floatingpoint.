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
    id: 1,
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
    id: 2,
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
    id: 3,
    title: "Zenith - ILOVECAUSINGDRAMA | The Terrarium (2025.06.06)",
    artist: "ILOVECAUSINGDRAMA",
    event: "Zenith",
    location: "The Terrarium",
    date: "June 6, 2025",
    soundcloudUrl: "https://on.soundcloud.com/iMtjz7gj26nc9a40We",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
];
