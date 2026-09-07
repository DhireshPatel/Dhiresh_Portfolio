"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Github, Linkedin, Instagram } from "lucide-react";
import ContactForm from "./ContactForm";
import { fadeUp, staggerContainer } from "@/lib/motionVariants";
import socialLinks from "@/data/socialLinks";
import styles from "./ContactPageClient.module.css";

export default function ContactPageClient() {
  return (
    <section className={styles.page}>
      <div className="grid-bg" />
      <div className="container">
        <motion.div initial="hidden" animate="show" variants={staggerContainer(0.1)}>
          <motion.span variants={fadeUp} className="eyebrow">
            Contact
          </motion.span>
          <motion.h1 variants={fadeUp} className={styles.heading}>
            Let&rsquo;s create something great.
          </motion.h1>
        </motion.div>

        <div className={styles.grid}>
          <motion.div initial="hidden" animate="show" variants={staggerContainer(0.08, 0.2)} className={styles.info}>
            <motion.p variants={fadeUp} className={styles.introText}>
              Whether you have a project in mind, a question, or just want to
              connect — I&rsquo;d love to hear from you. Fill out the form and
              I&rsquo;ll get back to you as soon as I can.
            </motion.p>

            <motion.div variants={fadeUp} className={styles.infoList}>
              <a href={`mailto:${socialLinks.email}`} className={styles.infoRow}>
                <Mail size={17} /> {socialLinks.email}
              </a>
              <span className={styles.infoRow}>
                <MapPin size={17} /> {socialLinks.location}
              </span>
              <span className={styles.infoRow}>
                <Clock size={17} /> Usually replies within 1–2 days
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className={styles.socials}>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialIcon}>
                <Github size={18} strokeWidth={1.75} />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
                <Linkedin size={18} strokeWidth={1.75} />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
                <Instagram size={18} strokeWidth={1.75} />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={styles.formCard}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
