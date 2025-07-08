"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Building2, Users } from "lucide-react";

const collaborations: {
  title: string;
  href: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    title: "For Individuals",
    href: "/collaborations/operation",
    icon: Users,
    description:
      "Join the collective. Explore open roles for performers, artists, marketers, and more.",
  },
  {
    title: "For Venues",
    href: "/collaborations/venue",
    icon: Building2,
    description:
      "Partner with us to transform your space into an underground electronic music destination.",
  },
];

export function CollaborationDropdown() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Collaborations</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col w-[300px] gap-3 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg">
              {collaborations.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-x-2">
            <Icon className="h-5 w-5 text-cyan-400" />
            <div className="text-sm font-medium leading-none text-white">
              {title}
            </div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-neutral-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
