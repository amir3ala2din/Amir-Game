import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Tutor Amir – English Learning Adventure",
  description: "Bilingual (English / Arabic) English learning games for Algerian students, 3AP to BAC.",
};

export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400;600;800&family=Lalezar&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
