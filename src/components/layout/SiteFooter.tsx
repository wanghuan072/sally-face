import Link from "next/link";
import Image from "next/image";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import styles from "@/style/layout/site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <Link className={styles.logo} href="/"><Image src="/images/site-mark-v2.png" alt="" width={42} height={42} /><span>Sally Face</span></Link>
          <p className={styles.blurb}>Independent Sally Face guides for Chapters, characters, codes, achievements and official store links.</p>
        </div>
        <div>
          <p className={styles.heading}>Quick links</p>
          <nav className={styles.links} aria-label="Footer links">
            {footerNavigation.slice(0, 4).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <p className={styles.heading}>More guides</p>
          <nav className={styles.links} aria-label="More guide links">
            {footerNavigation.slice(4).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <a href={siteConfig.official.developer} target="_blank" rel="noreferrer">Portable Moose ↗</a>
          </nav>
        </div>
        <div>
          <p className={styles.heading}>About this guide</p>
          <p>Independent fan guide with clear links to the official game and store pages.</p>
          <Link className={styles.aboutLink} href="/sources">How updates and corrections work →</Link>
        </div>
        <div>
          <p className={styles.heading}>Legal</p>
          <nav className={styles.links} aria-label="Legal links">
            <Link href="/legal/privacy-policy" rel="noopener noreferrer nofollow">Privacy Policy</Link>
            <Link href="/legal/terms-of-service" rel="noopener noreferrer nofollow">Terms of Service</Link>
            <Link href="/legal/copyright" rel="noopener noreferrer nofollow">Copyright</Link>
            <Link href="/legal/about-us" rel="noopener noreferrer nofollow">About Us</Link>
            <Link href="/legal/contact-us" rel="noopener noreferrer nofollow">Contact Us</Link>
          </nav>
        </div>
      </div>
      <div className={styles.legal}>
        <div className="container"><p>Copyright © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p><p>This is an independent fan site and is not affiliated with, endorsed by, or sponsored by Portable Moose.</p></div>
      </div>
    </footer>
  );
}
