import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/app/globals.css";
import Wrapper from "@/src/app/utils/QueryClientProvider";
import Hero from "@/src/app/components/common/Hero";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon Stats and Details | PokeApi Assignment",
  description: "Get in-depth information on Pokemon stats, abilities, evolution data, and battle strategies. Everything you need to know about your favorite Pokemon in one place.",
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
