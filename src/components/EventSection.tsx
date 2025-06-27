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
  // State: `activeFilter` can be 'upcoming', 'past', or `null` (Show all events when no filter)
  // Initial state: `null` (All events are displayed
  // Default: No selected button
  const [activeFilter, setActiveFilter] = useState<"upcoming" | "past" | null>(
    null
  );
  // State: This will hold the full list of sorted events.
  // Visual filtering (de-emphasis) will be applied during rendering.
  const [displayedEvents, setDisplayedEvents] = useState<EventData[]>([]);

  // Effect to sort initial events once when component mounts or initialEvents change.
  // The full list is always maintained here.
  useEffect(() => {
    const sortedFullList = [...initialEvents].sort((a, b) => {
      const aTime = a.eventDateTime;
      const bTime = b.eventDateTime;

      // Sort Logic: Events with no defined `eventDateTime` are considered as 'Upcoming'
      // This places them at the beginning of the list when sorted ascending.
      if (aTime == null && bTime != null) return -1; // 'a' (no time) comes before 'b' (has time)
      if (bTime == null && aTime != null) return 1; // 'b' (no time) comes before 'a' (has time)
      if (aTime == null && bTime == null) return 0; // Both have no time, maintain relative order

      // If both events have a defined `eventDateTime`, sort them numerically (earliest first)
      return aTime! - bTime!; // Use '!' for non-null assertion as we've handled null cases
    });
    setDisplayedEvents(sortedFullList);
  }, [initialEvents]); // Dependency: Re-sort only if the initialEvents prop itself changes

  // Helper function to determine if an event is 'upcoming' based on its timestamp
  // Filtering and Visual De-emphasis
  const isUpcoming = (event: EventData, nowEpoch: number): boolean => {
    // An event is upcoming if its eventDateTime is null/undefined OR it's a future event
    return event.eventDateTime == null || event.eventDateTime >= nowEpoch;
  };

  // Handler for filter button clicks
  const handleFilterClick = (filterType: "upcoming" | "past") => {
    // If the currently active filter is the same as the clicked one
    if (activeFilter === filterType) {
      setActiveFilter(null); // Clear filter (Display all events)
    } else {
      // Otherwise, set the new active filter
      setActiveFilter(filterType);
    }
  };

  // Calculate Event Counts
  const nowEpochForCount = Date.now();
  const upcomingCount = initialEvents.filter((event) =>
    isUpcoming(event, nowEpochForCount)
  ).length;
  const pastCount = initialEvents.filter(
    (event) => !isUpcoming(event, nowEpochForCount)
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
            onClick={() => handleFilterClick("upcoming")}
            className={`px-6 py-2 rounded-full border ${
              activeFilter === "upcoming"
                ? "border-cyan-200 text-white" // Style for selected button
                : "border-gray-700 text-neutral-400" // Style for unselected button
            } hover:text-white hover:border-cyan-200 transition-colors`}
          >
            Upcoming ({upcomingCount})
          </button>
          <button
            onClick={() => handleFilterClick("past")}
            className={`px-6 py-2 rounded-full border ${
              activeFilter === "past"
                ? "border-cyan-200 text-white" // Style for selected button
                : "border-gray-700 text-neutral-400" // Style for unselected button
            } hover:text-white hover:border-cyan-200 transition-colors`}
          >
            Past ({pastCount})
          </button>
        </div>

        {/* Event cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => {
              const nowEpoch = Date.now();
              const eventIsUpcoming = isUpcoming(event, nowEpoch);

              // Check if the current event should be visually de-emphasized
              const shouldDeemphasize =
                (activeFilter === "upcoming" && !eventIsUpcoming) ||
                (activeFilter === "past" && eventIsUpcoming);

              return (
                <EventCard
                  key={
                    event.title +
                    event.date +
                    (event.eventDateTime ?? "undefined")
                  }
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  performers={event.performers}
                  pass={event.pass}
                  imageSrc={event.imageSrc}
                  className={
                    shouldDeemphasize
                      ? "opacity-50 blur-sm scale-95" // De-emphasized Event Card
                      : "opacity-100 blur-none scale-100" // Nuetral Event Card
                  }
                />
              );
            })
          ) : (
            // Message when no events are found in the initial list
            <p className="text-neutral-400 text-lg col-span-full">
              No events found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
