import I18nProvider from "./i18n-provider";
import type { Metadata } from "next";
import "./globals.css";
import { Fjalla_One , Geist_Mono} from "next/font/google";
import i18n from "../i18n";

const geistSans = Fjalla_One({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  style: "normal",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Bonn Medical Industry | GMP Certified Manufacturer in Saudi Arabia",
  description:
    "BMI is a certified Saudi medical manufacturer producing cosmetics, medical devices, and health products. Licensed by SFDA and compliant with GMP, ISO 9001, ISO 13485, and more.",
  keywords: [
    "Bonn Medical Industry",
    "BonnMed",
    "Saudi Arabia manufacturing",
    "Medical manufacturer Riyadh",
    "Cosmetics private label KSA",
    "GMP Saudi Arabia",
    "ISO certified manufacturer",
    "Skincare manufacturing",
    "Medical devices Saudi",
    "OEM cosmetics supplier",
    "Health products factory",
    "Private label cosmetics MENA"
  ],
  authors: [{ name: "Bonn Medical Industry" }],
  creator: "Bonn Medical Industry",
  openGraph: {
    title: "Bonn Medical Industry | Certified Medical Manufacturer",
    description:
      "Certified medical manufacturer in Riyadh, Saudi Arabia. Specialized in topical pharmaceuticals, cosmetics, medical devices, and food supplements. GMP & ISO compliant.",
    url: "https://www.bonnmed.com",
    siteName: "Bonn Medical Industry",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.bonnmed.com/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Bonn Medical Industry Facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonn Medical Industry | Certified Manufacturer in KSA",
    description:
      "Bonn Medical Industry is a leading GMP & ISO certified factory in Saudi Arabia for cosmetics, medical devices, and health products.",
    creator: "@bonnmed", 
    images: ["https://www.bonnmed.com/og-cover.jpg"], 
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={i18n.language} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
