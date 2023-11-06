"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const devMenu: { title: string; href: string; description: string }[] = [
  {
    title: "What is Patch?",
    href: "/about",
    description:
      "Everything you need to know about Patch and how it works.",
  },
  {
    title: "Design Principles",
    href: "/about#design-principles",
    description:
      "Learn about the design principles that guide the development of Patch.",
  },
  {
    title: "Roadmap",
    href: "/about#roadmap",
    description:
      "Whats coming next for Patch? Check out our roadmap to find out.",
  },
  {
    title: "Contributing",
    href: "/about#contributing",
    description: "Learn how to contribute to Patch.",
  },
  {
    title: "Implementation",
    href: "/about#implementation",
    description:
      "Learn about the open-source technologies that power Patch.",
  },
  {
    title: "GitHub",
    href: "https://github.com/orgs/BX-Coding/projects/1/views/4",
    description:
      "Check out our GitHub repository to see the source code for Patch.",
  },
]

export function HomeNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-blue-50 p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image
                      src="/patch-the-penguin.svg"
                      alt="Patch the Penguin"
                      width={100}
                      height={100}
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Start Coding
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      The easiest way to start coding in Python.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="For Educators">
                Learn about the easiest way to start teaching coding.
              </ListItem>
              <ListItem href="/docs/installation" title="For Students">
                Start making fun games with Python now!
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="For Devs">
                Learn how to contribute and extend Patch.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {devMenu.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle({variant:"default"})}>
              Start Coding
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
