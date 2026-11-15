import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Blue Horizon Real Estate",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
