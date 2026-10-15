import { Baloo_Bhaijaan_2, Lalezar } from "next/font/google";
import "./globals.css";

const baloo = Baloo_Bhaijaan_2({ variable: "--font-baloo", subsets: ["arabic", "latin"], weight: ["400", "600", "800"] });
const lalezar = Lalezar({ variable: "--font-lalezar", subsets: ["arabic", "latin"], weight: "400" });

export const metadata = { title: "Tutor Amir – English Learning Adventure" };
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${baloo.variable} ${lalezar.variable}`}>
      <body>{children}</body>
    </html>
  );
}
