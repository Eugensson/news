"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { navLinks } from "@/constants";

export const Nav = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <nav className={cn(className)}>
      <ul className="flex flex-col gap-6 md:flex-row md:gap-11 lg:gap-[69px]">
        {navLinks.map(({ name, href }) => (
          <li key={name} className="text-base lg:text-lg font-bold">
            <Link
              href={href}
              className={cn(
                "",
                pathname === href &&
                  "underline underline-offset-8 decoration-violet-800"
              )}
              aria-label={`Go to ${name} page`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
