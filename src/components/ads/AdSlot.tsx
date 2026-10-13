"use client";

import Script from "next/script";
import { useEffect, useId, useState } from "react";
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

function Banner({ format, visibility }: { format: "rectangle" | "leaderboard"; visibility: DeviceVisibility }) {
  const option = bannerOptions[format];
  const slotId = useId().replace(/:/g, "");
  const config = JSON.stringify({
    key: option.key,
    format: "iframe",
    height: option.height,
    width: option.width,
    params: {},
  });

  return (
    <section className={`${styles.slot} ${styles[format]} ${visibility === "desktop" ? styles.desktopOnly : ""} ${visibility === "mobile" ? styles.mobileOnly : ""}`} aria-label="Advertisement">
      {/* 保持广告商给出的页面内脚本形式，确保脚本能识别真实站点域名。 */}
      <Script id={`banner-options-${slotId}`} strategy="afterInteractive">{`window.atOptions=${config};`}</Script>
      <Script id={`banner-invoke-${slotId}`} src={`https://www.highrevenueformat.com/${option.key}/invoke.js`} strategy="afterInteractive" />
    </section>
  );
}

export function AdSlot({ format, visibility = "all" }: AdSlotProps) {
  // 响应式横幅：PC 只加载 728×90，手机只加载 300×250。
  if (format === "responsive") {
    return <ResponsiveBanner />;
  }

  if (format === "native") return <NativeBanner visibility={visibility} />;

  return <Banner format={format} visibility={visibility} />;
}
