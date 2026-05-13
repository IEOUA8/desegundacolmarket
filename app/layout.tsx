import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

export const metadata: Metadata = {
  title: "De Segunda | Marketplace de moda curada",
  description:
    "Marketplace premium para descubrir, vender y comprar moda de segunda mano con una experiencia editorial.",
  openGraph: {
    title: "De Segunda",
    description: "Moda de segunda mano con curaduria visual y experiencia premium.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
