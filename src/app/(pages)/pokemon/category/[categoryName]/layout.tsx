import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/app/globals.css";
import Wrapper from "@/src/app/utils/QueryClientProvider";
import Hero from "@/src/app/components/common/Hero";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Explore Pokemon by Category | PokeApi Assignment",
  description: "Discover all Pokemon sorted by categories such as Fighting, Flying, Psychic, and more. Find your favorite Pokemon and learn about their abilities and stats on Your Site Name.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrapper>
          <Hero />
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
