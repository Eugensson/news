"use client";

import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AddToFavoriteBtn } from "@/components/add-to-favorite";

import { NewsItem } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { useReadNewsService } from "@/hooks/use-read-service";

export const NewsCard = ({ item }: { item: NewsItem }) => {
  const { readNews, addToReadNews } = useReadNewsService();

  const isReadNews = readNews.some((rn) => rn.id === item.id);

  const imageUrl =
    item.imageURL && item.imageURL !== "None"
      ? item.imageURL
      : "/placeholder.png";

  return (
    <Card className={cn("p-0", isReadNews && "opacity-80")}>
      <CardContent className="p-0 h-full">
        <figure className="overflow-hidden relative rounded-t-md">
          <Image
            src={imageUrl || item.imageURL}
            alt={item.title || "News image"}
            width={450}
            height={450}
            className={cn(
              "object-cover object-center aspect-square hover:scale-105 transition-transform duration-300 ease-in-out",
              isReadNews && "hover:scale-100"
            )}
          />
          <Badge className="absolute top-10 left-0 py-1.5 px-4 text-sm rounded-none capitalize">
            {item.category}
          </Badge>
          {isReadNews && (
            <Badge
              variant="outline"
              className="absolute top-10 right-0 py-1.5 px-4 text-sm bg-green-500/50 text-black font-bold rounded-none border-none"
            >
              Already read
              <Check className="ml-1 size-5" />
            </Badge>
          )}
          <AddToFavoriteBtn news={item} />
        </figure>
      </CardContent>
      <CardHeader>
        <CardTitle className="line-clamp-2 text-xl md:text-2xl tracking-wide mb-4">
          {item.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 min-h-20">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pb-2 flex items-center justify-between">
        <p className="text-muted-foreground">{formatDate(item.published)}</p>
        <Link
          href={item.url}
          target="_blank"
          onClick={() => addToReadNews(item)}
          className="text-primary hover:underline"
          aria-label={`Read ${item.title} article`}
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
};
