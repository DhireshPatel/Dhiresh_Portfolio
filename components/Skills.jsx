"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { fadeUp, staggerContainer, revealViewport } from "@/lib/motionVariants";
import skillCategories from "@/data/skills";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">My Skills</span>
          <h2 className="section-heading">A toolkit built for modern web interfaces.</h2>
        </ScrollReveal>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          variants={staggerContainer(0.08, 0.1)}
        >
          {skillCategories.map((group) => (
            <motion.div key={group.category} variants={fadeUp} className={styles.categoryCard}>
              <h3 className={styles.categoryTitle}>{group.category}</h3>
              <div className={styles.skillList}>
                {group.skills.map((skill) => (
                  <span key={skill} className={styles.skillPill}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
