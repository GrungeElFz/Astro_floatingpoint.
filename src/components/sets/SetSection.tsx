import React, { useState, useEffect, useMemo } from "react";
import type { SetData } from "@/data/sets";
import { SetFeature } from "./SetFeature";
import { SetCard } from "./SetCard";
import { Music4 } from "lucide-react";

// This is the shape of the data after it's been processed by your API
type ProcessedSet = SetData & {
  coverArtUrl: string;
  fetchedTrackId: number | null;
};

// Renamed from SetsSection to SetSection
export const SetSection: React.FC = () => {
  const [sets, setSets] = useState<ProcessedSet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sets")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API response was not ok.");
        }
        return res.json();
      })
      .then((data) => {
        setSets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load sets:", err);
        setLoading(false);
      });
  }, []);

  // Find the set that is explicitly marked as featured
  const featuredSet = useMemo(() => sets.find((set) => set.isFeatured), [sets]);

  // Filter the list to get only the non-featured items for the grid
  const gridSets = useMemo(() => sets.filter((set) => !set.isFeatured), [sets]);

  if (loading) {
    return <div className="text-white text-center py-24">Loading sets...</div>;
  }

  return (
    <section className="bg-black text-neutral-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Recorded Sets</h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Dive into our archive of live performances and exclusive mixes from
            underground electronic artists.
          </p>
        </div>

        {featuredSet && (
          <div className="mb-24">
            <SetFeature set={featuredSet} />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {gridSets.map((set) => (
            <SetCard key={set.id} set={set} />
          ))}
        </div>
      </div>
    </section>
  );
};
