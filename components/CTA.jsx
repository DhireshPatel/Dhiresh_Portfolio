"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { scaleIn } from "@/lib/motionVariants";
import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className="section">
      <div className="container">
        <ScrollReveal variants={scaleIn} className={styles.wrap}>
          <div className={styles.glow} aria-hidden="true" />
          <h2 className={styles.heading}>
            Have an idea in mind?
            <br />
            Let&rsquo;s build something great together.
          </h2>
          <div className={styles.actions}>
            <Link href="/contact" className="btn btn-primary">
              Get In Touch <ArrowRight size={16} />
            </Link>
            <Link href="/projects" className="btn btn-ghost">
              View Projects
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
