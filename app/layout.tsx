import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";

import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

import { cn } from "@/lib/utils";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    template: "%s | News App",
    absolute: "News App",
  },
  description: "News App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen flex flex-col justify-between antialiased",
          manrope.variable,
          poppins.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="grow container">{children}</main>
          <div className=" w-full min-h-28 bg-[#7a7a7a]" />
        </ThemeProvider>
      </body>
    </html>
  );
}
