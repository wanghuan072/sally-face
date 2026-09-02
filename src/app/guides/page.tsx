import { createMetadata } from "@/seo/metadata";
import { tdk } from "@/seo/tdk";
import GuidesPage from "@/page/guides/GuidesPage";

export const metadata = createMetadata(tdk.guides);

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  return <GuidesPage category={category} />;
}
