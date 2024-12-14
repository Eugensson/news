import { Suspense } from "react";

import { Nav } from "@/components/nav";
import { Logo } from "@/components/logo";
import { SearchBox } from "@/components/search-box";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export const Header = () => {
  return (
    <header className="py-6 md:pt-8 md:pb-7 lg:py-7 border-b border-[#00000033] dark:border-[#f4f4f433]">
      <div className="container flex items-center justify-between">
        <Logo />
        <Nav className="hidden md:block" />
        <Suspense fallback={<div>Loading categories...</div>}>
          <SearchBox />
        </Suspense>
        <ThemeToggle className="hidden md:flex" />
        <MobileMenu />
      </div>
    </header>
  );
};
