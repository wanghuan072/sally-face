import { createMetadata } from "@/seo/metadata";
import { tdk } from "@/seo/tdk";

export { default } from "@/page/system/SourcesPage";

export const metadata = { ...createMetadata(tdk.about), robots: { index: false, follow: true } };
