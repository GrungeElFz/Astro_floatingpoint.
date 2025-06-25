import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function MobileMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
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
        <SheetHeader>
          <SheetClose asChild>
            <Button type="button" variant="ghost">
              <span className="sr-only">Close menu</span>
            </Button>
          </SheetClose>
        </SheetHeader>

        <nav className="mt-6 ml-5 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <a
                href="/sets"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-200 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Sets
              </a>
              <a
                href="/videos"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-200 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Videos
              </a>
              <a
                href="/events"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-200 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Events
              </a>
              <a
                href="/about"
                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-neutral-200 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </div>
            <div className="py-6">
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-neutral-200 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Instagram
              </a>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
