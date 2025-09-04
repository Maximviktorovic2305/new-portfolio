import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AnimationProvider } from "@/contexts/AnimationContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimationControl from "@/components/AnimationControl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Портфолио Fullstack разработчика",
  description: "Современное портфолио с анимациями на GSAP, Three.js и Framer Motion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AnimationProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <AnimationControl />
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
