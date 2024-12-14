export type NewsItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  author: string;
  image: string;
  language: string;
  category: string;
  published: Date;
  imageURL: string;
};

export type NewsOrWidget = NewsItem | { key: "weather-widget" };
