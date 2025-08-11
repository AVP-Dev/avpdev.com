import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from './providers'

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Блог AVP.Dev",
  description: "Статьи о веб-разработке, технологиях и лучших практиках.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
