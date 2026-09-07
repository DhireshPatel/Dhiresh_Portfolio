"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { fadeUp, staggerContainer } from "@/lib/motionVariants";
import styles from "./AboutHero.module.css";

export default function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className="grid-bg" />
      <div className={styles.orb} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <motion.div initial="hidden" animate="show" variants={staggerContainer(0.12)}>
          <motion.span variants={fadeUp} className="eyebrow">
            About
          </motion.span>
          <motion.h1 variants={fadeUp} className={styles.heading}>
            More About Me
          </motion.h1>
          <motion.p variants={fadeUp} className={styles.subheading}>
            A closer look at how I got here, what I focus on and how I like to
            build for the web.
          </motion.p>
        </motion.div>

        <div className={styles.storyGrid}>
          <ScrollReveal>
            <h2 className={styles.storyTitle}>My Story</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className={styles.storyCopy}>
            <p>
              I got into frontend development because I liked seeing ideas
              turn into something people could actually click, scroll and use.
              That curiosity turned into a habit of building — starting with
              simple pages, then moving into React and Next.js as I wanted
              more control over structure, state and performance.
            </p>
            <p>
              These days, my focus is on building modern, responsive
              interfaces with clean component structure and animation that
              feels intentional rather than decorative. I&rsquo;m still early
              in my journey and I&rsquo;m continuously learning — every
              project is a chance to get a little more precise about the
              details.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
