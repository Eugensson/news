import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { NewsItem } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (value: Date) => {
  const formattedDate = format(new Date(value), "dd/MM/yyyy");

  return formattedDate;
};

export const groupByDate = (news: NewsItem[]) => {
  return news.reduce((acc, item) => {
    const date = new Date(item.published).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as { [key: string]: NewsItem[] });
};
