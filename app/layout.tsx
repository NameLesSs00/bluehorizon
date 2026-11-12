import type { Metadata } from "next";
import localFont from "next/font/local";
import QueryProvider from "@/shared/providers/QueryProvider";
import ToastProvider from "@/shared/providers/ToastProvider";
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

export const metadata: Metadata = {
  title: "Blue Horizon",
  description: "Blue Horizon Real Estate Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <QueryProvider>
          {children}
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
