import {
  Megaphone,
  Camera,
  Music,
  Beer,
  Sparkles,
  type LucideProps,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type IconComponent = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export interface Role {
  icon: IconComponent;
  title: string;
  subtitle: string;
  description: string;
  keySkills: string[];
  commitment: string;
}

export const roles: Role[] = [
  {
    icon: Megaphone,
    title: "Engagement Catalyst",
    subtitle: "Digital Marketing",
    description:
      "Amplify our presence across digital channels and connect with the community.",
    keySkills: [
      "Digital Strategy",
      "Content Creation",
      "Community Building",
      "Brand Storytelling",
    ],
    commitment: "Remote",
  },
  {
    icon: Camera,
    title: "Visual Cartographer",
    subtitle: "Photographer / Videographer",
    description:
      "Capture the moments, energy, and aesthetics of our events through photo and video.",
    keySkills: [
      "Event Documentation",
      "Video Production",
      "Post-Production",
      "Creative Vision",
    ],
    commitment: "Event-based / On-site",
  },
  {
    icon: Music,
    title: "Expressionist",
    subtitle: "Performer",
    description:
      "Shape the soundscape of our events as a resident or guest performer.",
    keySkills: ["Live Mixing"],
    commitment: "Event-based / On-site / Residency",
  },
  {
    icon: Beer,
    title: "Ambience Curator",
    subtitle: "Bar / Door Staff",
    description:
      "Uphold the vibe and ensure a smooth, welcoming experience for everyone.",
    keySkills: [
      "Customer Experience",
      "Crowd Management",
      "Problem Solving",
      "Team Collaboration",
    ],
    commitment: "Event-based / On-site",
  },
  {
    icon: Sparkles,
    title: "The Uncategorized",
    subtitle: "Open Role",
    description:
      "Have a unique skill or idea that doesn't fit a label? We're open to wild cards.",
    keySkills: [
      "Creative Thinking",
      "Innovation",
      "Adaptability",
      "Passion for Culture",
    ],
    commitment: "Event-based / On-site / Remote",
  },
];
