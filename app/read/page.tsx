import { Metadata } from "next";

import { ReadNewsList } from "@/components/read-news-list";

export const metadata: Metadata = {
  title: "Read",
};

const Read = () => {
  return (
    <section className="py-10 h-full container">
      <ReadNewsList />
    </section>
  );
};

export default Read;
