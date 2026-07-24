import type { Metadata, Viewport } from "next";
import { Literata, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AldeaProvider } from "@/context/AldeaContext";

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aldea — It takes a village",
  description:
    "Private, joyful, premium digital village for parents, family circles, and educators. Child-centric moments, AI journey insights, and center tools — privacy first.",
  icons: { icon: "/brand/aldea-logo.png" },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Aldea",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f5fbf9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${literata.variable} ${beVietnam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-sans">
        <AldeaProvider>
          {children}
          <Toaster position="top-center" richColors closeButton />
        </AldeaProvider>
      </body>
    </html>
  );
}
