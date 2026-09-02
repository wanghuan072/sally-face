import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource/amatic-sc/400.css";
import "@fontsource/amatic-sc/700.css";
import "@fontsource/patrick-hand/400.css";
import "@/style/globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Sally Face Guide — Chapters, Codes & Achievements",
    template: "%s | Sally Face Guide",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "games",
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: siteConfig.name, images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }] },
  twitter: { card: "summary_large_image", images: [siteConfig.ogImage] },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070a09",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
