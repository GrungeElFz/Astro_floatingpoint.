export interface SetData {
  id: number;
  title: string;
  artist: string;
  event: string;
  location: string;
  duration: string;
  trackId: number;
}

export const allSets: SetData[] = [
  {
    id: 1,
    title: "Zenith - Qualia | The Terrarium (2025.06.06)",
    artist: "Qualia",
    duration: "49:49",
    event: "Zenith",
    location: "The Terrarium",
    trackId: 2110052112,
  },
  {
    id: 2,
    title: "Zenith - 0x01000111 | The Terrarium (2025.06.06)",
    artist: "0x01000111",
    duration: "53:25",
    event: "Zenith",
    location: "The Terrarium",
    trackId: 2109748299,
  },
  {
    id: 3,
    title: "Zenith - ILOVECAUSINGDRAMA | The Terrarium (2025.06.06)",
    artist: "ILOVECAUSINGDRAMA",
    duration: "57:02",
    event: "Zenith",
    location: "The Terrarium",
    trackId: 2109931611,
  },
];
