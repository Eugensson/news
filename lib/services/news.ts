import axios from "axios";

const PAGE_SIZE = 8;
const API_KEY = process.env.API_KEY!;
const BASE_URL = process.env.BASE_URL!;

export const getCategories = async () => {
  const options = { params: { apiKey: API_KEY } };

  try {
    const response = await axios.get(
      `${BASE_URL}available/categories`,
      options
    );

    if (!response) throw new Error("Помилка запиту");

    return response.data.categories;
  } catch (error) {
    console.error("Помилка отримання категорій:", (error as Error).message);
    return [];
  }
};

export const getNews = async ({
  page_number = 1,
  category,
  q,
}: {
  page_number?: number | string;
  category?: string;
  q?: string;
}) => {
  const options = {
    params: {
      apiKey: API_KEY,
      page_number,
      page_size: PAGE_SIZE,
      category,
      keywords: q,
    },
  };

  try {
    const { data } = await axios.get(`${BASE_URL}search`, options);

    const { news } = data;

    const normalizeNews = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      news.map(async (newsItem: any) => {
        return {
          ...newsItem,
          imageURL: newsItem.image,
          category: newsItem.category[0],
        };
      })
    );

    return normalizeNews;
  } catch (error) {
    console.error("Помилка отримання новин:", (error as Error).message);
    return [];
  }
};
