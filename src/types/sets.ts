import type { SetData } from "@/data/sets";

export type ProcessedSet = SetData & {
  coverArtUrl: string;
  fetchedTrackId: number | null;
  apiTitle?: string;
  apiArtist?: string;
};
