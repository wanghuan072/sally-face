import LegalPage from "@/page/system/LegalPage";
import { createMetadata } from "@/seo/metadata";
import { tdk } from "@/seo/tdk";
export const metadata = createMetadata(tdk.aboutUs);
export default function Page() { return <LegalPage slug="about-us" />; }
