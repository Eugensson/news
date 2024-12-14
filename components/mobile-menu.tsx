"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AlignJustify, ChevronRight } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

import { cn } from "@/lib/utils";

import { navLinks } from "@/constants";

export const MobileMenu = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden">
        <AlignJustify />
      </SheetTrigger>
      <SheetContent className="py-4 px-0 md:hidden flex flex-col justify-between">
        <SheetHeader>
          <SheetTitle className="mb-16 px-4">
            <Logo />
          </SheetTitle>
          <nav>
            <ul className="flex flex-col gap-6">
              {navLinks.map(({ name, href, icon: Icon }) => (
                <li key={name} onClick={() => setIsOpen(false)}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center px-4 py-2",
                      pathname === href && "bg-blue-700"
                    )}
                  >
                    <span
                      className={cn(
                        "block p-2 rounded-full text-[#f4f4f4] bg-blue-700 border-2 border-transparent",
                        pathname === href && "border-[#f4f4f4]"
                      )}
                    >
                      <Icon />
                    </span>
                    <span
                      className={cn(
                        "ml-4 font-medium text-base",
                        pathname === href && "text-[#f4f4f4]"
                      )}
                    >
                      {name}
                    </span>
                    <ChevronRight
                      className={cn(
                        "ml-auto",
                        pathname === href && "text-[#f4f4f4]"
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetHeader>
        <SheetFooter className="mr-auto px-4">
          <ThemeToggle />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
