"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const CategoryFilter = ({ categories }: { categories: string[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  const [visibleCategories, setVisibleCategories] = useState<string[]>([]);
  const [dropdownCategories, setDropdownCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    searchParams.get("category") || null
  );

  useEffect(() => {
    if (isMobile) {
      setVisibleCategories([]);
      setDropdownCategories(categories);
    } else if (isTablet) {
      setVisibleCategories(categories.slice(0, 4));
      setDropdownCategories(categories.slice(4));
    } else if (isDesktop) {
      setVisibleCategories(categories.slice(0, 6));
      setDropdownCategories(categories.slice(6));
    }
  }, [categories, isMobile, isTablet, isDesktop]);

  const updateCategoryInURL = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  };

  const handleCategoryClick = (category: string) => {
    const newCategory = category === activeCategory ? null : category;
    setActiveCategory(newCategory);
    updateCategoryInURL(newCategory);
  };

  return (
    <div className="flex items-center gap-1 lg:gap-2">
      {visibleCategories.map((category) => (
        <Button
          variant={category === activeCategory ? "default" : "outline"}
          key={category}
          className={`h-fit text-xs capitalize px-4 py-3 border rounded-md transition-colors ${
            category === activeCategory
              ? "bg-primary text-white border-primary"
              : "border-border"
          }`}
          onClick={() => handleCategoryClick(category)}
          aria-label={`Filter by ${category} category`}
        >
          {category}
        </Button>
      ))}

      {dropdownCategories.length > 0 && (
        <Select
          value={activeCategory || ""}
          onValueChange={(value) => {
            const newCategory = value === activeCategory ? null : value;
            setActiveCategory(newCategory);
            updateCategoryInURL(newCategory);
          }}
        >
          <SelectTrigger className="w-[160px] md:w-fit">
            <SelectValue
              placeholder="Categories"
              className="text-xs"
              aria-label="Select category"
            />
          </SelectTrigger>
          <SelectContent>
            {dropdownCategories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className={`text-xs ${
                  category === activeCategory ? "underline" : ""
                }`}
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
};
