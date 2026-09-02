import type { Achievement } from "@/types/game";
import styles from "@/style/content/achievement-icon.module.css";

type AchievementIconKind = Achievement["type"] | "trophy";

export function AchievementIcon({ kind, size = "regular" }: { kind: AchievementIconKind; size?: "small" | "regular" }) {
  const common = { className: styles.svg, viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <span className={`${styles.frame} ${size === "small" ? styles.small : ""}`} data-kind={kind} aria-hidden="true">
      {kind === "Story" ? <svg {...common}><path d="M9 10.5c5.8-2.4 10.8-1.4 15 2.5v25c-4.2-3.9-9.2-4.9-15-2.5z" /><path d="M39 10.5c-5.8-2.4-10.8-1.4-15 2.5v25c4.2-3.9 9.2-4.9 15-2.5z" /><path d="M17 19h4M28 19h4M17 26h4M28 26h4" /></svg> : null}
      {kind === "Exploration" ? <svg {...common}><path d="M5.5 24s6.8-11 18.5-11 18.5 11 18.5 11-6.8 11-18.5 11S5.5 24 5.5 24z" /><circle cx="24" cy="24" r="5.5" /><path d="M24 18.5v11M18.5 24h11" /></svg> : null}
      {kind === "Collectible" ? <svg {...common}><path d="M11 14.5h26v23H11z" /><path d="M8 11h32v5H8zM17 20h14M17 27h8" /><path d="M12 37l4-4M36 37l-4-4" /></svg> : null}
      {kind === "Puzzle" ? <svg {...common}><path d="M19 8h10l2 5 5 2v10l-5 2-2 5H19l-2-5-5-2V15l5-2z" /><circle cx="24" cy="20" r="4" /><path d="M24 24v8M18 37h12" /></svg> : null}
      {kind === "Skill" ? <svg {...common}><path d="M24 6l4.7 11.2L41 18.3l-9.3 8 2.8 11.7L24 31.7 13.5 38l2.8-11.7-9.3-8 12.3-1.1z" /><path d="M24 14v11M18.5 20h11" /></svg> : null}
      {kind === "trophy" ? <svg {...common}><path d="M15 8h18v9c0 6.1-4 11-9 11s-9-4.9-9-11z" /><path d="M15 12H9v3c0 4.4 2.4 7 7 7M33 12h6v3c0 4.4-2.4 7-7 7M24 28v8M17 40h14M19 36h10" /></svg> : null}
    </span>
  );
}
