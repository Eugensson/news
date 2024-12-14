"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import { NewsCard } from "@/components/news-card";
import { WeatherWidget } from "@/components/weather-widget";

import { NewsItem, NewsOrWidget } from "@/lib/types";

export const CardList = ({ news }: { news: NewsItem[] }) => {
  const [weatherWidgetIndex, setWeatherWidgetIndex] = useState(0);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  useEffect(() => {
    if (isMobile) {
      setWeatherWidgetIndex(0);
    } else if (isTablet) {
      setWeatherWidgetIndex(1);
    } else if (isDesktop) {
      setWeatherWidgetIndex(2);
    }
  }, [isMobile, isTablet, isDesktop]);

  const newsWithWeather: (NewsItem | { key: "weather-widget" })[] = [
    ...news.slice(0, weatherWidgetIndex),
    { key: "weather-widget" },
    ...news.slice(weatherWidgetIndex),
  ];

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8">
      {newsWithWeather.map((newsItem: NewsOrWidget, index) => (
        <li key={index}>
          {"key" in newsItem && newsItem.key === "weather-widget" ? (
            <WeatherWidget />
          ) : (
            <NewsCard item={newsItem as NewsItem} />
          )}
        </li>
      ))}
    </ul>
  );
};
