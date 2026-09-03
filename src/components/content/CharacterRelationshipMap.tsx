"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types/game";
import { getCharactersBySlugs } from "@/lib/data/characters";
import styles from "@/style/page/characters/character-detail.module.css";

type YarnLine = {
  d: string;
  mx: number;
  my: number;
  label: string;
};

function yarnLabel(detail: string) {
  const first = detail.split(/[,.]/)[0]?.trim() || detail;
  return first.length > 26 ? `${first.slice(0, 24)}…` : first;
}

function yarnPath(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy) || 1;
  const start = 56;
  const end = 52;
  const sx = x1 + (dx / length) * start;
  const sy = y1 + (dy / length) * start;
  const ex = x2 - (dx / length) * end;
  const ey = y2 - (dy / length) * end;
  const mx = (sx + ex) / 2 - (dy / length) * 18;
  const my = (sy + ey) / 2 + (dx / length) * 18;
  return { d: `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`, mx, my };
}

export function CharacterRelationshipMap({ character }: { character: Character }) {
  const related = getCharactersBySlugs(character.relationships.map((item) => item.slug));
  const boardRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<YarnLine[]>([]);

  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;

    const draw = () => {
      const root = board.getBoundingClientRect();
      const hub = board.querySelector("[data-map-hub]");
      const nodes = [...board.querySelectorAll("[data-map-node]")];
      if (!hub || !nodes.length) return;
      const hubBox = hub.getBoundingClientRect();
      const x1 = hubBox.left + hubBox.width / 2 - root.left;
      const y1 = hubBox.top + hubBox.height / 2 - root.top;
      setLines(nodes.map((node, index) => {
        const box = node.getBoundingClientRect();
        const x2 = box.left + box.width / 2 - root.left;
        const y2 = box.top + box.height / 2 - root.top;
        const path = yarnPath(x1, y1, x2, y2);
        return {
          ...path,
          label: yarnLabel(character.relationships[index]?.detail ?? ""),
        };
      }));
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(board);
    board.querySelectorAll("[data-map-hub], [data-map-node]").forEach((node) => observer.observe(node));
    window.addEventListener("resize", draw);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", draw);
    };
  }, [character.relationships]);

  const count = character.relationships.length;

  return (
    <section className={`${styles.section} ${styles.boardSection}`} id="relationships">
      <h2>{character.name}'s Relationship Map</h2>
      <p className={styles.sectionLead}>Red thread runs from {character.alias} to each person they pull into the story. Follow an arrow to that profile.</p>
      <div className={styles.mapBoard} data-count={count} ref={boardRef}>
        <svg className={styles.mapYarn} aria-hidden="true">
          <defs>
            <marker id="map-arrow" markerWidth="10" markerHeight="8" refX="8" refY="4" orient="auto">
              <polygon points="0 0, 10 4, 0 8" fill="#c45c4a" />
            </marker>
          </defs>
          {lines.map((line, index) => (
            <path d={line.d} key={`yarn-${index}`} markerEnd="url(#map-arrow)" />
          ))}
        </svg>
        {lines.map((line, index) => (
          <span className={styles.yarnTag} key={`tag-${index}`} style={{ left: line.mx, top: line.my }}>{line.label}</span>
        ))}
        <div className={styles.mapHub} data-map-hub>
          <span className={styles.mapShot}><Image src={character.image} alt="" fill sizes="140px" /></span>
          <strong>{character.name}</strong>
          <span>{character.role}</span>
        </div>
        <ul className={styles.mapSpokes}>
          {character.relationships.map((relationship) => {
            const relatedCharacter = related.find((item) => item.slug === relationship.slug);
            return (
              <li data-map-node key={relationship.slug}>
                <Link className={styles.mapNode} href={`/characters/${relationship.slug}`}>
                  <span className={styles.mapShot}>
                    {relatedCharacter ? <Image src={relatedCharacter.image} alt="" fill sizes="120px" /> : null}
                  </span>
                  <strong>{relationship.name}</strong>
                  <em>{relationship.detail}</em>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
