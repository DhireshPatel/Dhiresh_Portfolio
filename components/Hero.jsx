"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, FileText } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motionVariants";
import socialLinks from "@/data/socialLinks";
import styles from "./Hero.module.css";

const badges = ["React", "Next.js", "JavaScript", "Modern CSS"];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid}>
        <div className="grid-bg" />
      </div>
      <div className={styles.orb} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.copy}
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            Frontend Developer
          </motion.span>

          <motion.h1 variants={fadeUp} className={styles.heading}>
            Hey, I&rsquo;m Dhiresh.
          </motion.h1>

          <motion.p variants={fadeUp} className={styles.subheading}>
            I build modern, interactive and high-performance web experiences.
          </motion.p>

          <motion.p variants={fadeUp} className={styles.description}>
            I turn ideas into clean, responsive and engaging digital experiences
            using modern web technologies — with a focus on smooth interaction
            and thoughtful detail.
          </motion.p>

          <motion.div variants={fadeUp} className={styles.actions}>
            <Link href="/projects" className="btn btn-primary">
              View My Work <ArrowRight size={16} />
            </Link>
            <Link href="/about" className="btn btn-ghost">
              About Me
            </Link>
            <a href={socialLinks.resume} download className={styles.resumeLink}>
              <FileText size={15} /> Download Resume
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.badges}>
            {badges.map((b) => (
              <span key={b} className="tag">
                {b}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, y: 30, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.windowCard}>
            <div className={styles.windowBar}>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
              <span className={styles.windowTitle}>portfolio.jsx</span>
            </div>
            <div className={styles.windowBody}>
              <pre className={styles.code}>
                <code>
{`const developer = {
  name: "Dhiresh",
  role: "Frontend Developer",
  stack: [
    "React",
    "Next.js",
    "JavaScript"
  ],
  focus: "clean, responsive,
          interactive UI",
  status: "available"
};`}
                </code>
              </pre>
            </div>
          </div>

          <motion.div
            className={styles.floatCard}
            style={{ top: "-10%", left: "-8%" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className={styles.floatDot} /> Building UI
          </motion.div>
          <motion.div
            className={styles.floatCard}
            style={{ bottom: "-8%", right: "-6%" }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <span className={styles.floatDot} /> Shipping fast
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
        Scroll
      </motion.div>
    </section>
  );
}
