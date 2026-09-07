"use client";

import { motion } from "framer-motion";
import { Layout, Smartphone, MousePointerClick, AppWindow, Gauge } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motionVariants";
import styles from "./WhatIDo.module.css";

const items = [
  { icon: Layout, title: "Frontend Development", desc: "Building interfaces with React and Next.js, from layout to logic." },
  { icon: Smartphone, title: "Responsive Web Design", desc: "Interfaces that adapt cleanly from small phones to large desktops." },
  { icon: MousePointerClick, title: "Interactive UI", desc: "Motion and micro-interactions that make interfaces feel alive." },
  { icon: AppWindow, title: "Web Applications", desc: "Full-featured apps with real data, forms and authenticated flows." },
  { icon: Gauge, title: "Performance Optimization", desc: "Fast-loading pages with efficient rendering and minimal bloat." },
];

export default function WhatIDo() {
  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">What I Do</span>
          <h2 className="section-heading">Where I focus my energy.</h2>
        </ScrollReveal>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={staggerContainer(0.08, 0.1)}
        >
          {items.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp} className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDesc}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
