"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSwitchChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Label
      htmlFor="theme-mode"
      className={cn("flex items-center space-x-2 lg:space-x-3", className)}
    >
      <div>
        <Sun className="md:hidden" />
        <span className="hidden md:block">Light</span>
      </div>
      <Switch
        id="theme-mode"
        checked={theme === "dark"}
        onCheckedChange={handleSwitchChange}
        aria-label="Switch to theme mode"
      />
      <div>
        <Moon className="md:hidden" />
        <span className="hidden md:block">Dark</span>
      </div>
    </Label>
  );
};
