import React, { useState, useEffect } from "react";
import { EventCard } from "@/components/events/EventCard.tsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowRightCircle, ArrowLeft, ArrowRight } from "lucide-react";

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
  displayMode?: "grid" | "carousel";
  events: EventData[];
}

// Helper to generate a unique ID for each event card
const generateEventId = (event: EventData) => {
  const slug = event.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `event-${slug}-${event.date.replace(/\s/g, "-")}`;
};

export const EventSection: React.FC<EventSectionProps> = ({
  displayMode = "grid",
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

  // State for carousel API to manage navigation dots
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // useEffect: Sort events by placing 'upcoming' first && 'past' in reverse chronological order
  useEffect(() => {
    const now = Date.now();

    // Separate events into 'upcoming' and 'past' groups for different sorting rules
    const upcomingEvents = initialEvents.filter(
      (event) => event.eventDateTime == null || event.eventDateTime >= now
    );
    const pastEvents = initialEvents.filter(
      (event) => event.eventDateTime != null && event.eventDateTime < now
    );

    // Sort 'upcoming' events ascending, with null-date events at the top
    upcomingEvents.sort((a, b) => {
      const aTime = a.eventDateTime;
      const bTime = b.eventDateTime;
      if (aTime == null && bTime != null) return -1;
      if (bTime == null && aTime != null) return 1;
      if (aTime == null && bTime == null) return 0;
      return aTime! - bTime!;
    });

    // Sort 'past' events descending (Most Recent First)
    pastEvents.sort((a, b) => b.eventDateTime! - a.eventDateTime!);

    // Combine the sorted lists back together and update the state.
    const sortedFullList = [...upcomingEvents, ...pastEvents];
    setDisplayedEvents(sortedFullList);
  }, [initialEvents]); // Dependency: Re-sort only if the initialEvents prop itself changes

  // Effect to connect to the carousel API and dot indicators
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Helper function to determine if an event is 'upcoming' based on its timestamp
  // Filtering and Visual De-emphasis
  const isUpcoming = (event: EventData, nowEpoch: number): boolean => {
    // An event is upcoming if its eventDateTime is null/undefined OR it's a future event
    return event.eventDateTime == null || event.eventDateTime >= nowEpoch;
  };

  // Handler for filter button clicks, which scrolls to the targeted event card section.
  const handleFilterClick = (filterType: "upcoming" | "past" | null) => {
    const newFilter =
      filterType === null
        ? null
        : activeFilter === filterType
        ? null
        : filterType;
    setActiveFilter(newFilter);

    // This logic only runs for button clicks, not for card clicks.
    const findTargetEvent = () => {
      if (newFilter === null) {
        return displayedEvents[0];
      }
      const now = Date.now();
      return displayedEvents.find((event) => {
        const eventIsUpcoming = isUpcoming(event, now);
        return newFilter === "upcoming" ? eventIsUpcoming : !eventIsUpcoming;
      });
    };

    const targetEvent = findTargetEvent();
    if (!targetEvent) return;

    if (displayMode === "carousel" && api) {
      const targetIndex = displayedEvents.indexOf(targetEvent);
      if (targetIndex > -1) {
        api.scrollTo(targetIndex);
      }
    } else if (displayMode === "grid") {
      const targetId = generateEventId(targetEvent);
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
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

  // Helper function to render event cards for both grid and carousel modes
  const renderEventCards = () => {
    const maxCarouselEvents = 5;
    const eventsToRender =
      displayMode === "carousel"
        ? displayedEvents.slice(0, maxCarouselEvents)
        : displayedEvents;

    if (eventsToRender.length === 0 && displayMode === "grid") {
      // Message when no events are found in the initial list
      return (
        <p className="text-neutral-400 text-lg col-span-full">
          No events found.
        </p>
      );
    }

    return eventsToRender.map((event) => {
      const nowEpoch = Date.now();
      const eventIsUpcoming = isUpcoming(event, nowEpoch);

      // Check if the current event should be visually de-emphasized
      const shouldDeemphasize =
        (activeFilter === "upcoming" && !eventIsUpcoming) ||
        (activeFilter === "past" && eventIsUpcoming);

      // Defines the click behavior for each card
      const handleCardClick = () => {
        // If a de-emphasized card is clicked, clear the filter
        if (shouldDeemphasize) {
          setActiveFilter(null);
        }
      };

      const eventCard = (
        <EventCard
          id={generateEventId(event)}
          onCardClick={handleCardClick}
          key={event.title + event.date + (event.eventDateTime ?? "undefined")}
          title={event.title}
          date={event.date}
          time={event.time}
          location={event.location}
          performers={event.performers}
          pass={event.pass}
          imageSrc={event.imageSrc}
          className={
            shouldDeemphasize
              ? "opacity-50 blur-sm scale-95 cursor-pointer"
              : "opacity-100 blur-none scale-100"
          }
        />
      );

      if (displayMode === "carousel") {
        return (
          <CarouselItem
            key={
              event.title + event.date + (event.eventDateTime ?? "undefined")
            }
            className="basis-full md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1 h-full">{eventCard}</div>
          </CarouselItem>
        );
      }
      return eventCard;
    });
  };

  return (
    <section className="bg-black text-neutral-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl py-4 px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4">
          <a href="/events">Events</a>
        </h1>
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

        {displayMode === "carousel" ? (
          // Carousel and Controls Wrapper
          <div>
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {renderEventCards()}
              </CarouselContent>
            </Carousel>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <button
                onClick={() => api?.scrollPrev()}
                disabled={current === 1}
                className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white hover:border-neutral-500 transition-colors"
              >
                <ArrowLeft size={16} />
              </button>

              <div className="flex items-center justify-center space-x-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      current === index + 1
                        ? "bg-neutral-400"
                        : "bg-neutral-700 hover:bg-neutral-500"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => api?.scrollNext()}
                disabled={current === count}
                className="p-2 rounded-full border border-neutral-700 text-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed hover:text-white hover:border-neutral-500 transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          // Event cards grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderEventCards()}
          </div>
        )}
      </div>
    </section>
  );
};
