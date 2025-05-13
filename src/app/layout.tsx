// app/layout.tsx or wherever your root layout is
import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import { Inter } from "next/font/google";
import ReactQueryProvider from "@/lib/reactQueryProvider";

export const metadata: Metadata = {
  title: "Quanutrition",
  description:
    "This is the quanutrition.in webstite for official referral program of RD Nutrition private limited by Mr. Ryan Fernando.",
  icons: {
    icon: "/favicon.png",
  },
};

const inter = Inter({
  subsets: ["latin"], // or ['latin-ext'] if needed
  variable: "--font-inter", // optional if using CSS variables
  display: "swap", // for better performance
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ReactQueryProvider>
          <LayoutClient>{children}</LayoutClient>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
