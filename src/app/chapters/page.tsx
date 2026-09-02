import { createMetadata } from "@/seo/metadata";
import { tdk } from "@/seo/tdk";

export { default } from "@/page/episodes/EpisodesPage";
export const metadata = createMetadata(tdk.chapters);
