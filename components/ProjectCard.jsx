"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className={styles.card}
    >
      <Link href={`/projects/${project.id}`} className={styles.imageLink}>
        <div className={styles.imageWrap}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.image}
          />
          <div className={styles.overlay}>
            <span className={styles.viewLabel}>
              View Details <ArrowUpRight size={15} />
            </span>
          </div>
        </div>
      </Link>

      <div className={styles.body}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={styles.category}>{project.category}</span>
        </div>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.techRow}>
          {project.technologies.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        <div className={styles.linkRow}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLinkText}
          >
            Live Demo <ArrowUpRight size={14} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLinkText}
          >
            <Github size={14} /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}
