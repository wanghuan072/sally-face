import type { Faq } from "@/types/game";
import styles from "@/style/common/primitives.module.css";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className={styles.faqGrid}>
      {faqs.map((faq) => (
        <article className={styles.faq} key={faq.question}>
          <h3><span className={styles.faqMark} aria-hidden="true">Q</span>{faq.question}</h3>
          <p>{faq.answer}</p>
        </article>
      ))}
    </div>
  );
}
