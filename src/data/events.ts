import type { ImageMetadata } from "astro";

// Automatically search all the event cover images in `@/assets/events` directory
const allEventImages = import.meta.glob<{ default: ImageMetadata }>(
  "@/assets/events/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

const getEventImage = (title: string, ratio: "4x5" | "1x1" = "4x5") => {
  // Create the unique part of the file name from the title
  // (e.g., "cover-4x5-the-deans-list")
  const slug = title.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
  const fileNameFragment = `cover-${ratio}-${slug}`;

  // Search the full path of the image that contains the unique fragment
  const imagePath = Object.keys(allEventImages).find((path) =>
    path.includes(fileNameFragment)
  );

  // Return the image source if found, otherwise return undefined.
  // The <EventCard /> component handles the fallback, if the src is undefined.
  return imagePath ? allEventImages[imagePath]?.default.src : undefined;
};

export const allEvents = [
  {
    title: "TBA",
    date: "Someday: July 00, 2025",
    time: "00:00",
    eventDateTime: undefined,
    location: "TBA",
    performers: [
      "Performer 1",
      "Performer 2",
      "Performer 3",
      "Performer 4",
      "Performer 5",
    ],
    pass: "#",
    imageSrc: getEventImage("TBA"),
  },
  {
    title: "Zenith",
    date: "Friday: June 6, 2025",
    location: "The Terrarium",
    time: "22:00 - 02:00",
    eventDateTime: 1749265200000,
    performers: ["LCDC", "ILOVECAUSINGDRAMA", "0x01000111", "Qualia"],
    pass: "#",
    imageSrc: getEventImage("Zenith"),
  },
  {
    title: "The Dean's List",
    date: "Sunday: May 18, 2025",
    location: "The Terrarium",
    time: "19:00 - 23:00",
    eventDateTime: 1747612800000,
    performers: ["Dytro", "ILOVECAUSINGDRAMA", "0x01000111", "Qualia", "Fele"],
    pass: "#",
    imageSrc: getEventImage("The Dean's List"),
  },
  {
    title: "Bipolarity",
    date: "Thursday: May 8, 2025",
    location: "The Terrarium",
    time: "19:30 - 00:00",
    eventDateTime: 1746750600000,
    performers: ["LCDC", "Venus The Fly Trap", "0x01000111", "Qualia"],
    pass: "#",
    imageSrc: getEventImage("Bipolarity"),
  },
  {
    title: "Engrammatic Eden",
    date: "Friday: April 25, 2025",
    location: "The Terrarium",
    time: "17:00 - 23:00",
    eventDateTime: 1745618400000,
    performers: [
      "Sam Crutcher",
      "Nevaeh",
      "ILOVECAUSINGDRAMA",
      "0x01000111",
      "Venus The Fly Trap",
    ],
    pass: "#",
    imageSrc: getEventImage("Engrammatic Eden"),
  },
];
