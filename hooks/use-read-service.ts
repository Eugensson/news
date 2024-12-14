import { create } from "zustand";
import { persist } from "zustand/middleware";

import { NewsItem } from "@/lib/types";

type ReadNewsState = {
  readNews: NewsItem[];
  addToReadNews: (news: NewsItem) => void;
};

export const readNewsStore = create<ReadNewsState>()(
  persist(
    (set, get) => ({
      readNews: [],
      addToReadNews: (news: NewsItem) => {
        const currentReadNews = get().readNews;
        if (!currentReadNews.some((read) => read.id === news.id)) {
          const sortedReadNews = [...currentReadNews, news].sort(
            (a, b) =>
              new Date(b.published).getTime() - new Date(a.published).getTime()
          );
          set({ readNews: sortedReadNews });
        }
      },
    }),
    {
      name: "favorites",
      version: 1,
    }
  )
);

export const useReadNewsService = () => {
  const { readNews } = readNewsStore();

  return {
    readNews,
    addToReadNews: (news: NewsItem) =>
      readNewsStore.getState().addToReadNews(news),
  };
};
