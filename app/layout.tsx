import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Baloo_Bhaijaan_2, Lalezar } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";

const baloo = Baloo_Bhaijaan_2({ variable: "--font-baloo", subsets: ["arabic", "latin"], weight: ["400", "600", "800"] });
const lalezar = Lalezar({ variable: "--font-lalezar", subsets: ["arabic", "latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Tutor Amir – English Learning Adventure",
  description: "Bilingual (EN/AR) English quiz game for Algerian students, grades 3AP–3AS, and CEFR levels A1–B2.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${baloo.variable} ${lalezar.variable}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
