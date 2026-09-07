"use client";

import { motion } from "framer-motion";
import { Code2, Smartphone, Users, Zap, Wrench, BookOpen } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motionVariants";
import styles from "./MyApproach.module.css";

const principles = [
  { icon: Code2, title: "Clean Code", desc: "Readable, structured and consistent — code that's easy to maintain." },
  { icon: Smartphone, title: "Responsive Design", desc: "Every interface is designed to work well on any screen." },
  { icon: Users, title: "User Experience", desc: "Interfaces should feel intuitive before they feel impressive." },
  { icon: Zap, title: "Performance", desc: "Fast, efficient and mindful of what actually needs to ship." },
  { icon: Wrench, title: "Maintainability", desc: "Built to be extended and edited without a full rewrite." },
  { icon: BookOpen, title: "Continuous Learning", desc: "Always exploring new patterns, tools and better ways to build." },
];

export default function MyApproach() {
  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">My Approach</span>
          <h2 className="section-heading">Principles I build around.</h2>
        </ScrollReveal>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={staggerContainer(0.07, 0.1)}
        >
          {principles.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeUp} className={styles.row}>
              <Icon size={19} strokeWidth={1.75} className={styles.icon} />
              <div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.desc}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
