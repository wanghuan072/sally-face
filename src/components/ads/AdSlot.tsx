"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import styles from "@/style/ads/ad-slot.module.css";

type AdFormat = "native" | "rectangle" | "leaderboard" | "responsive";
type DeviceVisibility = "all" | "desktop" | "mobile";

type AdSlotProps = {
  format: AdFormat;
  visibility?: DeviceVisibility;
};

const NATIVE_SCRIPT = "https://pl31789013.profitableratecpmnetwork.com/e34a7f0c3f6f1bed549c484e72896f5c/invoke.js";

const bannerOptions = {
  rectangle: { key: "35ee345c5a0ae58d0205272c1a163244", width: 300, height: 250 },
  leaderboard: { key: "21138cd816ae45697e316c2c882d1d41", width: 728, height: 90 },
};

function bannerDocument({ key, width, height }: { key: string; width: number; height: number }) {
  const scriptUrl = `https://www.highrevenueformat.com/${key}/invoke.js`;

  // 每个横幅在独立 iframe 中执行，避免不同广告位共享 window.atOptions 而相互覆盖。
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body><script>atOptions={key:'${key}',format:'iframe',height:${height},width:${width},params:{}};</script><script src="${scriptUrl}"></script></body></html>`;
}

function NativeBanner({ visibility }: { visibility: DeviceVisibility }) {
  return (
    <section className={`${styles.slot} ${styles.native} ${visibility === "desktop" ? styles.desktopOnly : ""} ${visibility === "mobile" ? styles.mobileOnly : ""}`} aria-label="Advertisement">
      {/* 原生广告脚本交由 Next.js 管理：容器先渲染，再在交互后加载。 */}
      <Script id="native-banner-ad" async data-cfasync="false" src={NATIVE_SCRIPT} strategy="afterInteractive" />
      <div id="container-e34a7f0c3f6f1bed549c484e72896f5c" />
    </section>
  );
}

function ResponsiveBanner() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  // 仅挂载当前设备需要的广告，避免被 CSS 隐藏的 iframe 仍然请求广告。
  if (isMobile === null) return null;
  return <AdSlot format={isMobile ? "rectangle" : "leaderboard"} />;
}

export function AdSlot({ format, visibility = "all" }: AdSlotProps) {
  // 响应式横幅：PC 只加载 728×90，手机只加载 300×250。
  if (format === "responsive") {
    return <ResponsiveBanner />;
  }

  if (format === "native") return <NativeBanner visibility={visibility} />;

  const option = bannerOptions[format];
  return (
    <section className={`${styles.slot} ${styles[format]} ${visibility === "desktop" ? styles.desktopOnly : ""} ${visibility === "mobile" ? styles.mobileOnly : ""}`} aria-label="Advertisement">
      <iframe className={styles.frame} title="Advertisement" loading="lazy" scrolling="no" width={option.width} height={option.height} srcDoc={bannerDocument(option)} />
    </section>
  );
}
