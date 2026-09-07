"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";
import projects from "@/data/projects";
import styles from "./ProjectsPageClient.module.css";

const categories = ["All", "Websites", "Web Apps", "Client Projects", "Experiments"];

export default function ProjectsPageClient() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.category === active);
  }, [active]);

  return (
    <section className={styles.page}>
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">Projects</span>
          <h1 className={styles.heading}>Things I&rsquo;ve Built</h1>
          <p className={styles.subheading}>
            A collection of projects, experiments and real-world products
            I&rsquo;ve worked on.
          </p>
        </ScrollReveal>

        <ProjectFilter categories={categories} active={active} onChange={setActive} />

        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
