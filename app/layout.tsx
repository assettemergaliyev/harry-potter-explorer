import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Путеводитель по Хогвартсу",
  description:
    "Исследуйте персонажей, факультеты и заклинания волшебного мира Гарри Поттера.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-black text-white">
  <header className="border-b border-white/10 bg-black/90 backdrop-blur">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="/" className="text-lg font-semibold tracking-wide">
        Путеводитель по Хогвартсу
      </a>

      <div className="flex gap-6 text-sm text-gray-300">
        <a className="transition hover:text-white" href="/">
          Главная
        </a>
        <a className="transition hover:text-white" href="/characters">
          Персонажи
        </a>
        <a className="transition hover:text-white" href="/houses">
          Факультеты
        </a>
        <a className="transition hover:text-white" href="/spells">
          Заклинания
        </a>
      </div>
    </nav>
  </header>

  {children}
</body>
    </html>
  );
}
