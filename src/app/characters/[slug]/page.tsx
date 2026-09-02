import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CharacterDetailPage from "@/page/characters/CharacterDetailPage";
import { characters, getCharacterBySlug } from "@/lib/data/characters";
import { createMetadata } from "@/seo/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return characters.map((character) => ({ slug: character.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  if (!character) return {};
  return createMetadata({ title: character.seo.title, description: character.seo.description, path: `/characters/${slug}`, image: character.image });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  if (!character) notFound();
  return <CharacterDetailPage character={character} />;
}
