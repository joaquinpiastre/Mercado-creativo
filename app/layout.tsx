import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mercado Creativo | Club de Pescadores, San Rafael, Mendoza",
  description:
    "Reservá tu estante en el Mercado Creativo, encuentro nacional de elaboradores y productores en el Club de Pescadores de San Rafael, Mendoza.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sand-50 text-ink-950">
        {children}
      </body>
    </html>
  );
}
