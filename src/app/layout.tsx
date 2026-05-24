import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/providers/LenisProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Cavalcante Social Mídia — Social Media, Design, Sites e Mentoria",
  description:
    "Marcas que as pessoas não conseguem ignorar. Estratégia, design e presença digital feitos com obsessão.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#F9FAFB] font-sans">
        <Navbar />
        <LenisProvider>{children}</LenisProvider>
        <Footer />
      </body>
    </html>
  );
}
