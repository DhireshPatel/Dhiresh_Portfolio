"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";
import projects from "@/data/projects";
import styles from "./FeaturedProjects.module.css";

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="section">
      <div className="container">
        <div className={styles.header}>
          <ScrollReveal>
            <span className="eyebrow">Featured Projects</span>
            <h2 className="section-heading">A closer look at recent work.</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Link href="/projects" className={styles.viewAll}>
              View All Projects <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {featured.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
