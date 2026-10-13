"use client";

import { useEffect } from "react";

export function HardNavigation() {
  useEffect(() => {
    const handleInternalLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href);
      const current = new URL(window.location.href);

      // 仅把普通站内跳转改为完整页面导航；外链、新标签与同页锚点维持浏览器默认行为。
      if (destination.origin !== current.origin || (destination.pathname === current.pathname && destination.search === current.search)) return;

      event.preventDefault();
      window.location.assign(destination.href);
    };

    document.addEventListener("click", handleInternalLink, true);
    return () => document.removeEventListener("click", handleInternalLink, true);
  }, []);

  return null;
}
