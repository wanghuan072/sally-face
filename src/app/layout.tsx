import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "@fontsource/amatic-sc/400.css";
import "@fontsource/amatic-sc/700.css";
import "@fontsource/patrick-hand/400.css";
import "@/style/globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FeedbackDrawer } from "@/components/feedback/FeedbackDrawer";
import { HardNavigation } from "@/components/ads/HardNavigation";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/seo/JsonLd";
import { organizationSchema, personSchema } from "@/seo/schema";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Sally Face Guide — Chapters, Codes & Achievements",
    template: "%s | Sally Face Guide",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.path }],
  creator: siteConfig.author.name,
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-T1G5XL3ZDE" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-T1G5XL3ZDE');`}</Script>
        {/* 全站 Popunder 广告延迟加载，避免阻塞首屏内容与交互。 */}
        <Script id="popunder-ad" src="https://pl31789012.profitableratecpmnetwork.com/5a/73/7a/5a737aabedbe03e60351adc860657abe.js" strategy="lazyOnload" />
        {/* 站内链接使用完整页面跳转，确保每次访问都会重新初始化广告脚本。 */}
        <HardNavigation />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <JsonLd data={[organizationSchema(), personSchema()]} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <FeedbackDrawer />
      </body>
    </html>
  );
}
