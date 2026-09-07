"use client";

import ScrollReveal from "./ScrollReveal";
import styles from "./CurrentFocus.module.css";

const badges = ["React", "Next.js", "Supabase", "Framer Motion"];

export default function CurrentFocus() {
  return (
    <section className="section">
      <div className="container">
        <ScrollReveal className={styles.card}>
          <div className={styles.glow} aria-hidden="true" />
          <div className={styles.left}>
            <span className={styles.status}>
              <span className={styles.statusDot} />
              Available for projects
            </span>
            <h2 className={styles.heading}>Currently Building</h2>
            <p className={styles.text}>
              I&rsquo;m continuously improving my development skills and
              building real-world web products — focused on clean code,
              responsive design and interfaces that feel genuinely polished.
            </p>
          </div>
          <div className={styles.right}>
            {badges.map((b) => (
              <span key={b} className={styles.badge}>
                {b}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
