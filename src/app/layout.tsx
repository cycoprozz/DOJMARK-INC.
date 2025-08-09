import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "DOJMARK - Result-Driven Digital Marketing",
  description: "Empowering Black-owned businesses with cutting-edge digital solutions that drive measurable growth. Web development, content creation, photography, videography, and brand identity services.",
  keywords: ["DOJMARK", "digital marketing", "web development", "content creation", "photography", "videography", "brand identity", "Black-owned business", "Atlanta", "result-driven marketing"],
  authors: [{ name: "DOJMARK Digital Marketing Team" }],
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  openGraph: {
    title: "DOJMARK - Result-Driven Digital Marketing",
    description: "Cutting-edge digital solutions that drive measurable growth for Black-owned businesses",
    url: "https://dojmark.com",
    siteName: "DOJMARK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOJMARK - Result-Driven Digital Marketing",
    description: "Cutting-edge digital solutions that drive measurable growth for Black-owned businesses",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" 
          rel="stylesheet"
        />
        <noscript>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </noscript>
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          {children}
          <Toaster />
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
