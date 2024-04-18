import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/src/app/globals.css'
import Wrapper from "@/src/app/utils/QueryClientProvider";
import Hero from "@/src/app/components/common/Hero";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon Project by Yazan Ali",
  description: "An interactive guide to my Pokemon project showcasing data-driven insights and models generated by Yazan Ali. Explore innovative ways to utilize Pokemon data.",
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
