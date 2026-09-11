"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github, Check } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motionVariants";
import styles from "./ProjectDetailClient.module.css";

export default function ProjectDetailClient({ project }) {
  return (
    <section className={styles.page}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1)}
        >
          <motion.div variants={fadeUp}>
            <Link href="/projects" className={styles.back}>
              <ArrowLeft size={16} /> Back to Projects
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.header}>
            <span className="tag">{project.category}</span>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.description}>{project.description}</p>

            <div className={styles.actions}>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Live Website <ArrowUpRight size={16} />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className={styles.imageWrap}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className={styles.image}
              priority
            />
          </motion.div>

          <div className={styles.body}>
            <motion.div variants={fadeUp}>
              <h2 className={styles.sectionTitle}>Technologies</h2>
              <div className={styles.techRow}>
                {project.technologies.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {project.features && (
              <motion.div variants={fadeUp}>
                <h2 className={styles.sectionTitle}>Features</h2>
                <ul className={styles.featureList}>
                  {project.features.map((f) => (
                    <li key={f}>
                      <Check size={16} /> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {project.challenges && (
              <motion.div variants={fadeUp}>
                <h2 className={styles.sectionTitle}>Challenges</h2>
                <p className={styles.challengeText}>{project.challenges}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
