import type { Metadata } from "next";
import { Inter, Outfit, Lora } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sunstroke.dev"),
  title: {
    default: "Sunstroke — AI Tools, Digital Products & Creator Resources",
    template: "%s | Sunstroke",
  },
  description:
    "Sunstroke builds AI-powered tools, digital products, and curates the best software for creators and indie builders.",
  keywords: [
    "AI tools",
    "digital products",
    "creator tools",
    "indie builder",
    "newsletter",
    "software recommendations",
  ],
  authors: [{ name: "Sunstroke" }],
  creator: "Sunstroke",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sunstroke.dev",
    siteName: "Sunstroke",
    title: "Sunstroke — AI Tools, Digital Products & Creator Resources",
    description:
      "Build smarter, create bolder, ship faster. AI-powered tools and resources for creators.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Sunstroke — Creator Tech Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunstroke — AI Tools, Digital Products & Creator Resources",
    description:
      "Build smarter, create bolder, ship faster. AI-powered tools and resources for creators.",
    images: ["/og.png"],
    creator: "@sunstroke_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${outfit.variable} ${lora.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#f4f1ea] text-black antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
