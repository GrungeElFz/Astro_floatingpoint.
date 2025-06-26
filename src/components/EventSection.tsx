import React, { useState, useEffect } from "react";
import { EventCard } from "@/components/EventCard.tsx";

export interface EventData {
  imageSrc?: string;
  title: string;
  date: string;
  eventDateTime: number | null | undefined;
  time: string;
  location: string;
  performers: string[];
  pass: string;
}

interface EventSectionProps {
  events: EventData[];
}

export const EventSection: React.FC<EventSectionProps> = ({
  events: initialEvents,
}) => {
  // State: Manage the current filter ('Upcoming' | 'Past')
  // Default = 'Upcoming'
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  // State: Hold the events currently being displayed after filtering
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);

  // useEffect hook to re-filter and sort events whenever the filter or initialEvents change
  useEffect(() => {
    // Get the current Epoch timestamp in milliseconds
    // User Local Time
    const nowEpoch = Date.now();

    // Create a copy of initialEvents and sort them.
    // Events with no defined eventDateTime are treated as 'Upcoming'
    const sortedEvents = [...initialEvents].sort((a, b) => {
      const aTime = a.eventDateTime;
      const bTime = b.eventDateTime;

      // Case Handles:
      // If one or both of `eventDateTime` values are null or undefined

      // 'a' (no time) comes before 'b' (has time)
      if (aTime == null && bTime != null) return -1;

      // 'b' (no time) comes before 'a' (has time)
      if (bTime == null && aTime != null) return 1;

      // Both have no time, maintain relative order
      if (aTime == null && bTime == null) return 0;

      // If both events have a defined eventDateTime, sort them numerically (earliest first)
      // Use '!' for non-null assertion as we've handled null cases above
      return aTime! - bTime!;
    });

    // Apply the selected filter to the sorted events
    if (filter === "upcoming") {
      setFilteredEvents(
        // 'Upcoming', if its eventDateTime is `null` | `undefined` |  Future Event
        sortedEvents.filter(
          (event) =>
            event.eventDateTime == null || event.eventDateTime >= nowEpoch
        )
      );
    } else {
      setFilteredEvents(
        // 'Past', if its eventDateTime is defined && it's a past event.
        // Reverse the order to show the most recent past events first.
        sortedEvents
          .filter(
            (event) =>
              event.eventDateTime != null && event.eventDateTime < nowEpoch
          )
          .reverse()
      );
    }
  }, [filter, initialEvents]); // Dependencies: Effect re-runs when 'filter' or 'initialEvents' changes

  // Calculate Event Counts
  const nowEpochForCount = Date.now();
  const upcomingCount = initialEvents.filter(
    (event) =>
      event.eventDateTime == null || event.eventDateTime >= nowEpochForCount
  ).length;
  const pastCount = initialEvents.filter(
    (event) =>
      event.eventDateTime != null && event.eventDateTime < nowEpochForCount
  ).length;

  return (
    <section className="bg-black text-neutral-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12">Events</h2>
        <p className="text-lg font-normal italic text-pretty text-neutral-400 sm:text-xl/8 mx-auto mb-12 mt-8">
          Immersive sonic environment that push the boundaries of sound and
          space.
        </p>

        {/* Filter buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-6 py-2 rounded-full border ${
              filter === "upcoming"
                ? "border-cyan-200 text-white"
                : "border-gray-700 text-neutral-400"
            } hover:text-white hover:border-cyan-200 transition-colors`}
          >
            Upcoming ({upcomingCount})
          </button>
          <button
            onClick={() => setFilter("past")}
            className={`px-6 py-2 rounded-full border ${
              filter === "past"
                ? "border-cyan-200 text-white"
                : "border-gray-700 text-neutral-400"
            } hover:text-white hover:border-cyan-200 transition-colors`}
          >
            Past ({pastCount})
          </button>
        </div>

        {/* Event cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={
                  event.title +
                  event.date +
                  (event.eventDateTime ?? "undefined")
                } // Robust key for React lists
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                performers={event.performers}
                pass={event.pass}
                imageSrc={event.imageSrc}
              />
            ))
          ) : (
            // Message when no events match the current filter
            <p className="text-neutral-400 text-lg col-span-full">
              No {filter} events found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
