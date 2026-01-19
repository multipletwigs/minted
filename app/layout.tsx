import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./provider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const departureMono = localFont({
  src: "../public/fonts/DepartureMono-Regular.woff2",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Politicoin",
  description: "Learn Solana concepts through political memecoins",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Politicoin",
    description: "Learn Solana concepts through political memecoins",
    images: ["/ogimage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Politicoin",
    description: "Learn Solana concepts through political memecoins",
    images: ["/ogimage.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${departureMono.variable}`}>
      <body className="font-mono antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
