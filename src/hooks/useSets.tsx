import { useState, useEffect, useMemo } from "react";
import type { ProcessedSet } from "@/types/sets";

export const useSets = () => {
  const [sets, setSets] = useState<ProcessedSet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/sets");
        if (!response.ok) throw new Error("Failed to fetch sets");
        const data: ProcessedSet[] = await response.json();
        setSets(data);
      } catch (error) {
        console.error("Error fetching sets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSets();
  }, []);

  const events = useMemo(() => {
    return [...new Set(sets.map((set) => set.event).filter(Boolean))];
  }, [sets]);

  const featuredSet = useMemo(() => sets.find((set) => set.isFeatured), [sets]);
  const gridSets = useMemo(() => sets.filter((set) => !set.isFeatured), [sets]);

  return { loading, events, featuredSet, gridSets };
};
