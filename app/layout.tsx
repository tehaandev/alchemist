import "./globals.css";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import ThemeLayout from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alchemist - RAG-as-a-Service Platform",
  description:
    "Transform your documents into intelligent knowledge with our powerful RAG-as-a-service platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeLayout>
        <ReactQueryProvider>
          <body
            className={`${inter.className} flex items-center justify-center`}>
            <Toaster position="top-center" />
            {children}
          </body>
        </ReactQueryProvider>
      </ThemeLayout>
    </html>
  );
}
