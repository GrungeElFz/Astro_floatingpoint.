import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Users, Building2 } from "lucide-react";
import {
  SiInstagram,
  SiYoutube,
  SiSoundcloud,
  SiMailboxdotorg,
} from "@icons-pack/react-simple-icons";

const collaborationLinks = [
  {
    href: "/collaborations/operation",
    label: "For Individuals",
    icon: Users,
  },
  {
    href: "/collaborations/venue",
    label: "For Venues",
    icon: Building2,
  },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCollaborateOpen, setIsCollaborateOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="lg:hidden cursor-pointer border border-transparent hover:bg-transparent hover:border hover:border-neutral-400"
        >
          <span className="sr-only">Open Main Menu</span>
          <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="grey"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            ></path>
          </svg>
        </Button>
      </SheetTrigger>

      {/* The content that slides in */}
      <SheetContent side="right" className="bg-black text-neutral-400">
        <nav className="mt-30 ml-5 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <a
                href="/sets"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-200 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Sets
              </a>
              <a
                href="/videos"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-200 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Videos
              </a>
              <a
                href="/events"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-200 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Events
              </a>
              <a
                href="/about"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-200 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </div>
            <div className="py-6 space-y-2">
              <Collapsible
                open={isCollaborateOpen}
                onOpenChange={setIsCollaborateOpen}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between -mx-3 rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-200 hover:text-white">
                  <span>Collaborations</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isCollaborateOpen ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-1 pl-4">
                  {collaborationLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-x-3 rounded-lg py-2 pr-3 text-base/7 text-neutral-400 hover:text-white"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="h-4 w-4 flex-none text-cyan-400" />
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>

              <a
                href="/nerdstats"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-neutral-200 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Nerd Stats
              </a>
            </div>
          </div>
        </nav>

        <SheetFooter className="mt-auto p-4">
          <div className="flex justify-center space-x-6">
            {/* Social Media: SoundCloud */}
            <a
              href="https://soundcloud.com/floatingpoint_club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white"
            >
              <SiSoundcloud className="size-5" />
              <span className="sr-only">SoundCloud</span>
            </a>

            {/* Social Media: YouTube */}
            <a
              href="https://youtube.com/@floatingpoint_club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white"
            >
              <SiYoutube className="size-5" />
              <span className="sr-only">YouTube</span>
            </a>

            {/* Social Media: Instagram */}
            <a
              href="https://instagram.com/floatingpoint.club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white"
            >
              <SiInstagram className="size-5" />
              <span className="sr-only">Instagram</span>
            </a>

            {/* Social Media: Email */}
            <a
              href="mailto:contact@floatingpoint.club"
              className="text-neutral-400 hover:text-white"
            >
              <SiMailboxdotorg className="size-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
