import { Metadata } from "next";
import { Suspense } from "react";

import { CardList } from "@/components/card-list";
import { DatePicker } from "@/components/date-picker";
import { PaginationBar } from "@/components/pagination-bar";
import { CategoryFilter } from "@/components/category-filter";

import { getCategories, getNews } from "@/lib/services/news";

export const metadata: Metadata = {
  title: "Home | News App",
  description: "News App",
};

const TOTAL_PAGES = 20;

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const searchParamsObj = await searchParams;

  const q = searchParamsObj.q || null;
  const category = searchParamsObj.category || null;
  const page_number = parseInt(searchParamsObj.page || "1", 10);

  const categories = await getCategories();

  const news = await getNews({
    page_number,
    category: category || undefined,
    q: q || undefined,
  });

  return (
    <section className="pt-6 pb-[60px] md:pb-[100px] lg:pb-[150px] flex flex-col gap-10 md:gap-12 lg:gap-16">
      <div className="flex items-center justify-between gap-2">
        <Suspense fallback={<div>Loading categories...</div>}>
          <CategoryFilter categories={categories} />
        </Suspense>
        <DatePicker />
      </div>
      <CardList news={news} />
      <PaginationBar currentPage={page_number} totalPages={TOTAL_PAGES} />
    </section>
  );
};

export default Home;
