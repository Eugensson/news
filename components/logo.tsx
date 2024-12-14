import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="text-2xl md:text-[32px] lg:text-[42px] font-bold text-[#111321] dark:text-[#f4f4f4]"
      aria-label="Go to the homepage"
    >
      News
    </Link>
  );
};
