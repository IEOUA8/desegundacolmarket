import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
