import type { Metadata } from "next";
import { Syne, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sweesh - Voice to Text",
  description: "Fast, intuitive voice-to-text idea capture tool",
  openGraph: {
    title: "Sweesh - Voice to Text",
    description: "Fast, intuitive voice-to-text idea capture tool",
    type: "website",
    url: "https://sweesh-glm47.vercel.app",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://sweesh-glm47.vercel.app'}/api/og`,
        width: 1200,
        height: 630,
        alt: "Sweesh - Fast, intuitive voice-to-text idea capture tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sweesh - Voice to Text",
    description: "Fast, intuitive voice-to-text idea capture tool",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://sweesh-glm47.vercel.app'}/api/og`],
  },
  icons: {
    icon: [
      { url: "/icons/32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/logo.ico", sizes: "any", type: "image/x-icon" },
    ],
    apple: [
      { url: "/icons/128x128.png", sizes: "128x128", type: "image/png" },
    ],
  },
  manifest: "/icons/site.webmanifest",
  other: {
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${instrumentSans.variable} ${ibmPlexMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster
          position="top-center"
          duration={3000}
          toastOptions={{
            classNames: {
              toast: "glass border border-border/50",
              title: "text-foreground",
              description: "text-muted-foreground",
            },
          }}
        />
      </body>
    </html>
  );
}
