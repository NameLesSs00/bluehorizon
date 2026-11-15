import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import QueryProvider from "@/shared/providers/QueryProvider";
import ToastProvider from "@/shared/providers/ToastProvider";
import { SITE_URL, DEFAULT_SITE_TITLE, DEFAULT_SITE_DESCRIPTION } from "@/shared/utils/seoMetadata";
import "./globals.css";

const inter = localFont({
  src: "../public/fonts/inter.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "400 500 600 700",
});

const manrope = localFont({
  src: "../public/fonts/manrope.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "400 600 700",
});

export const viewport: Viewport = {
  themeColor: "#002D62",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${DEFAULT_SITE_TITLE} | Luxury Real Estate & Rentals in Egypt`,
    template: `%s | ${DEFAULT_SITE_TITLE}`,
  },
  description: DEFAULT_SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/logo.svg",
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: DEFAULT_SITE_TITLE,
    title: `${DEFAULT_SITE_TITLE} | Luxury Real Estate & Rentals in Egypt`,
    description: DEFAULT_SITE_DESCRIPTION,
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: DEFAULT_SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${DEFAULT_SITE_TITLE} | Luxury Real Estate & Rentals in Egypt`,
    description: DEFAULT_SITE_DESCRIPTION,
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} overflow-x-clip`}>
      <body className="font-sans antialiased overflow-x-clip min-h-screen">
        <QueryProvider>
          {children}
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
