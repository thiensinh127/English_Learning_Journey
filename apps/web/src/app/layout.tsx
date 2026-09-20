import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";

const journeySans = Nunito({
  variable: "--font-journey-sans",
  subsets: ["latin", "vietnamese"],
});

const journeyDisplay = Baloo_2({
  variable: "--font-journey-display",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "English Learning Journey",
  description: "A playful English learning journey for grades 1–4",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${journeySans.variable} ${journeyDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
