export interface SetData {
  id: number;
  title: string;
  artist: string;
  event: string;
  location: string;
  duration: string;
  soundcloudUrl: string;
}

export const allSets: SetData[] = [
  {
    id: 1,
    title: "Zenith - Qualia | The Terrarium (2025.06.06)",
    artist: "Qualia",
    duration: "49:49",
    event: "Zenith",
    location: "The Terrarium",
    soundcloudUrl: "https://on.soundcloud.com/yLsWP0UN2RmiQxig6Z",
  },
  {
    id: 2,
    title: "Zenith - 0x01000111 | The Terrarium (2025.06.06)",
    artist: "0x01000111",
    duration: "53:25",
    event: "Zenith",
    location: "The Terrarium",
    soundcloudUrl: "https://on.soundcloud.com/pIcFGhUD92As7eMRCT",
  },
  {
    id: 3,
    title: "Zenith - ILOVECAUSINGDRAMA | The Terrarium (2025.06.06)",
    artist: "ILOVECAUSINGDRAMA",
    duration: "57:02",
    event: "Zenith",
    location: "The Terrarium",
    soundcloudUrl: "https://on.soundcloud.com/iMtjz7gj26nc9a40We",
  },
];
