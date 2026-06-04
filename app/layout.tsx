import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumisac — Handmade Luminous Crochet Bags",
  description: "Premium handmade luminous crochet bags from Algeria. Each bag glows in the dark — unique fashion accessories crafted with love.",
  keywords: "luminous bags, crochet bags, handmade bags, Algeria, fashion accessories, glowing bags",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
