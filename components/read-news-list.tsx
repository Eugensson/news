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

import { useReadNewsService } from "@/hooks/use-read-service";

export const ReadNewsList = () => {
  const { readNews } = useReadNewsService();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  const groupedReadNews = groupByDate(readNews);

  return (
    <>
      {readNews && readNews.length > 0 ? (
        isDesktop ? (
          <ul className="grid grid-cols-3 gap-8">
            {readNews.map((item: NewsItem) => (
              <li key={item.id}>
                <NewsCard item={item} />
              </li>
            ))}
          </ul>
        ) : (
          <Accordion type="single" collapsible>
            {Object.entries(groupedReadNews).map(([date, newsItems]) => (
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
        <NoResults title="You haven't read any news yet." />
      )}
    </>
  );
};
