import { create } from "zustand";
import { persist } from "zustand/middleware";

import { NewsItem } from "@/lib/types";

type FavoriteState = {
  favorites: NewsItem[];
  addToFavorites: (news: NewsItem) => void;
  removeFromFavorites: (news: NewsItem) => void;
};

export const favoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addToFavorites: (news: NewsItem) => {
        const currentFavorites = get().favorites;
        if (!currentFavorites.some((fav) => fav.id === news.id)) {
          const sortedFavorites = [...currentFavorites, news].sort(
            (a, b) =>
              new Date(b.published).getTime() - new Date(a.published).getTime()
          );
          set({ favorites: sortedFavorites });
        }
      },
      removeFromFavorites: (news: NewsItem) => {
        const currentFavorites = get().favorites;
        set({
          favorites: currentFavorites.filter((fav) => fav.id !== news.id),
        });
      },
    }),
    {
      name: "favorites",
      version: 1,
    }
  )
);

export const useFavoriteService = () => {
  const { favorites } = favoriteStore();

  return {
    favorites,
    addToFavorites: (news: NewsItem) =>
      favoriteStore.getState().addToFavorites(news),
    removeFromFavorites: (news: NewsItem) =>
      favoriteStore.getState().removeFromFavorites(news),
  };
};
