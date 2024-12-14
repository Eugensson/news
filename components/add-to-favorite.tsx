"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { NewsItem } from "@/lib/types";

import { useFavoriteService } from "@/hooks/use-favorite-service";

type AddToFavoriteBtnProps = {
  news: NewsItem;
};

export const AddToFavoriteBtn = ({ news }: AddToFavoriteBtnProps) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoriteService();

  const isFavorite = favorites.some((fav) => fav.id === news.id);

  const handleClick = () => {
    if (isFavorite) {
      removeFromFavorites(news);
    } else {
      addToFavorites(news);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      className="absolute bottom-3 right-2 bg-background hover:bg-background text-secondary-foreground"
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? "Remove from" : "Add to"} favorite
      <Heart
        className={cn(
          "ml-1 animate-pulse",
          isFavorite ? "text-primary fill-primary" : "text-primary"
        )}
      />
    </Button>
  );
};
