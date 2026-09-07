"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motionVariants";
import skillCategories from "@/data/skills";
import styles from "./TechStack.module.css";

export default function TechStack() {
  const allSkills = skillCategories.flatMap((c) => c.skills);

  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">Tech Stack</span>
          <h2 className="section-heading">Technologies I work with.</h2>
        </ScrollReveal>

        <motion.div
          className={styles.cloud}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={staggerContainer(0.04, 0.1)}
        >
          {allSkills.map((skill) => (
            <motion.span key={skill} variants={fadeUp} className={styles.pill}>
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
