"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { fadeUp, slideInRight } from "@/lib/motionVariants";
import styles from "./AboutPreview.module.css";

export default function AboutPreview() {
  return (
    <section className="section">
      <div className={`container ${styles.grid}`}>
        <ScrollReveal variants={fadeUp}>
          <span className="eyebrow">About Me</span>
          <h2 className={styles.statement}>Building with purpose.</h2>
        </ScrollReveal>

        <ScrollReveal variants={slideInRight} delay={0.1} className={styles.copyCol}>
          <p className={styles.paragraph}>
            I&rsquo;m a frontend developer who enjoys turning ideas into real,
            usable interfaces. I care about how a product feels to use as much
            as how it looks — clean structure, smooth motion and details that
            hold up on every screen size.
          </p>
          <p className={styles.paragraph}>
            My focus is on building modern, responsive and interactive web
            experiences with React, Next.js and thoughtful CSS — and
            continuously improving with every project I build.
          </p>
          <Link href="/about" className={styles.link}>
            Read More <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
