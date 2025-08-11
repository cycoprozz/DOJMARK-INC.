import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from 'next/font/google';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Analytics } from '@vercel/analytics/react';

// Configure fonts using next/font
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0A2740',
};

export const metadata: Metadata = {
  title: "DOJMARK - Result-Driven Digital Marketing",
  description: "Empowering Black-owned businesses with cutting-edge digital solutions that drive measurable growth. Web development, content creation, photography, videography, and brand identity services.",
  keywords: ["DOJMARK", "digital marketing", "web development", "content creation", "photography", "videography", "brand identity", "Black-owned business", "Atlanta", "result-driven marketing"],
  authors: [{ name: "DOJMARK Digital Marketing Team" }],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32" },
      { url: "/favicon.ico" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ],
  },
  manifest: "/manifest.webmanifest",
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
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ErrorBoundary>
          {children}
          <Toaster />
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
