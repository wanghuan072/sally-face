"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "@/style/feedback/feedback-drawer.module.css";

type Review = {
  id: string;
  body: string;
  rating: number | null;
  authorDisplayName: string | null;
  createdAt: string;
};

type ReviewResponse = {
  data: Review[];
  page: number;
  total: number;
};

const ratings = [1, 2, 3, 4, 5];

function dateLabel(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export function FeedbackDrawer() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"notes" | "write">("notes");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [displayName, setDisplayName] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");

  async function loadReviews() {
    setLoading(true);
    try {
      const response = await fetch("/api/feedback", { cache: "no-store" });
      const payload = await response.json() as ReviewResponse & { error?: { message?: string } };
      if (!response.ok) throw new Error(payload.error?.message ?? "Could not load notes.");
      setReviews(payload.data);
      setTotal(payload.total);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load notes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function openDrawer() {
    setMessage("");
    setActiveTab("notes");
    setOpen(true);
    void loadReviews();
  }

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setMessage("Link copied to your clipboard.");
    } catch {
      // Cancelling the native share menu is an expected action.
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, displayName, rating, website }),
      });
      const payload = await response.json() as Review & { error?: { message?: string } };
      if (!response.ok) throw new Error(payload.error?.message ?? "Could not publish your note.");
      setReviews((current) => [payload as Review, ...current]);
      setTotal((current) => current + 1);
      setBody("");
      setDisplayName("");
      setWebsite("");
      setActiveTab("notes");
      setMessage("Your note is now live. Thanks for helping improve the guide.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not publish your note.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button className={styles.launcher} type="button" aria-expanded={open} aria-controls="feedback-drawer" onClick={openDrawer}>
        <svg className={styles.launcherIcon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5.2 5.7h13.6v9.1H10l-4.8 3.7v-3.7H5.2z" />
          <path d="M8.6 10.3h.1M12 10.3h.1M15.4 10.3h.1" />
        </svg>
      </button>
      {open ? <button className={styles.backdrop} type="button" aria-label="Close feedback panel" onClick={() => setOpen(false)} /> : null}
      <aside className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`} id="feedback-drawer" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
        <div className={styles.tape} aria-hidden="true" />
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Player feedback</p>
            <h2 id="feedback-title">Comments & feedback</h2>
          </div>
          <button className={styles.close} type="button" aria-label="Close feedback panel" onClick={() => setOpen(false)}>×</button>
        </header>
        <p className={styles.intro}>Found a clearer route, spotted a mistake, or just want to share this page? Every useful note helps the next player.</p>
        <div className={styles.tabs} role="tablist" aria-label="Comments and feedback">
          <button className={activeTab === "notes" ? styles.tabActive : styles.tab} type="button" role="tab" aria-selected={activeTab === "notes"} onClick={() => setActiveTab("notes")}>Comments <span>{total}</span></button>
          <button className={activeTab === "write" ? styles.tabActive : styles.tab} type="button" role="tab" aria-selected={activeTab === "write"} onClick={() => setActiveTab("write")}>Write a note</button>
        </div>
        <button className={styles.share} type="button" onClick={share}>Share this page ↗</button>
        {message ? <p className={styles.message} role="status">{message}</p> : null}

        {activeTab === "notes" ? <section className={styles.notes} aria-live="polite" role="tabpanel">
          {loading ? <p className={styles.empty}>Opening the notebook…</p> : null}
          {!loading && !reviews.length ? <p className={styles.empty}>No notes yet. Be the first player to leave one.</p> : null}
          {reviews.map((review) => (
            <article className={styles.note} key={review.id}>
              <div className={styles.noteMeta}><strong>{review.authorDisplayName || "Anonymous player"}</strong><span>{review.rating ? "★".repeat(review.rating) : ""}</span></div>
              <p>{review.body}</p>
              <time dateTime={review.createdAt}>{dateLabel(review.createdAt)}</time>
            </article>
          ))}
          <button className={styles.notesAction} type="button" onClick={() => setActiveTab("write")}>Leave a comment →</button>
        </section> : <section className={styles.writePanel} role="tabpanel">
          <form className={styles.form} onSubmit={submit}>
            <label className={styles.label} htmlFor="feedback-name">Name <span>optional</span></label>
            <input id="feedback-name" className={styles.input} value={displayName} maxLength={120} onChange={(event) => setDisplayName(event.target.value)} placeholder="A fellow player" />
            <fieldset className={styles.ratingField}>
              <legend>How useful was this guide?</legend>
              <div className={styles.stars}>
                {ratings.map((value) => <button className={value <= rating ? styles.starActive : styles.star} type="button" key={value} aria-label={`${value} out of 5 stars`} aria-pressed={value === rating} onClick={() => setRating(value)}>★</button>)}
              </div>
            </fieldset>
            <label className={styles.label} htmlFor="feedback-body">Your note</label>
            <textarea id="feedback-body" className={styles.textarea} value={body} maxLength={2000} required onChange={(event) => setBody(event.target.value)} placeholder="A correction, a tip, or a thought about the guide…" />
            <label className={styles.honeypot} aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
            <button className={styles.publish} type="submit" disabled={submitting}>{submitting ? "Publishing…" : "Publish note"}</button>
          </form>
          <button className={styles.backToNotes} type="button" onClick={() => setActiveTab("notes")}>← Read comments</button>
        </section>}
        <p className={styles.context}>A sitewide comments panel for Sally Face Guide players.</p>
      </aside>
    </>
  );
}
