import { Metadata } from "next";

import { FavoriteList } from "@/components/favorite-list";

export const metadata: Metadata = {
  title: "Favorite",
};

const Favorite = () => {
  return (
    <section className="py-10 h-full container">
      <FavoriteList />
    </section>
  );
};

export default Favorite;
