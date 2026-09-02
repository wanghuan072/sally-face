import LegalPage from "@/page/system/LegalPage";
import { createMetadata } from "@/seo/metadata";
import { tdk } from "@/seo/tdk";
export const metadata = createMetadata(tdk.terms);
export default function Page() { return <LegalPage slug="terms-of-service" />; }
