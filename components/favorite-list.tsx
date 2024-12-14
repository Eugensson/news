"use client";

import { useMediaQuery } from "react-responsive";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NewsCard } from "@/components/news-card";
import { NoResults } from "@/components/no-results";

import { NewsItem } from "@/lib/types";
import { groupByDate } from "@/lib/utils";
import { useFavoriteService } from "@/hooks/use-favorite-service";

export const FavoriteList = () => {
  const { favorites } = useFavoriteService();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  const groupedFavorites = groupByDate(favorites);

  return (
    <>
      {favorites && favorites.length > 0 ? (
        isDesktop ? (
          <ul className="grid grid-cols-3 gap-8">
            {favorites.map((item: NewsItem) => (
              <li key={item.id}>
                <NewsCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <Accordion type="single" collapsible>
            {Object.entries(groupedFavorites).map(([date, newsItems]) => (
              <AccordionItem key={date} value={date}>
                <AccordionTrigger>{date}</AccordionTrigger>
                <AccordionContent>
                  <ul
                    className={`grid ${
                      isMobile ? "grid-cols-1" : "grid-cols-2"
                    } gap-4`}
                  >
                    {newsItems.map((item: NewsItem) => (
                      <li key={item.id}>
                        <NewsCard item={item} />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )
      ) : (
        <NoResults title="There are no favorite news in your list." />
      )}
    </>
  );
};
