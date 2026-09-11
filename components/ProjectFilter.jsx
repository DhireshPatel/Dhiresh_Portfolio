"use client";

import { motion } from "framer-motion";
import styles from "./ProjectFilter.module.css";

export default function ProjectFilter({ categories, active, onChange }) {
  return (
    <div
      className={styles.filterBar}
      role="tablist"
      aria-label="Project categories"
    >
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            className={styles.tab}
            onClick={() => onChange(cat)}
          >
            <span className={styles.tabLabel}>{cat}</span>
            {isActive && (
              <motion.span
                layoutId="project-filter-pill"
                className={styles.pill}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
