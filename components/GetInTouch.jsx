"use client";

import { Mail, MapPin, Clock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import ContactForm from "./ContactForm";
import socialLinks from "@/data/socialLinks";
import styles from "./GetInTouch.module.css";

export default function GetInTouch() {
  return (
    <section className="section" id="contact">
      <div className={`container ${styles.grid}`}>
        <ScrollReveal>
          <span className="eyebrow">Get In Touch</span>
          <h2 className={styles.heading}>Let&rsquo;s create something great.</h2>
          <p className={styles.text}>
            Have a project in mind or just want to say hello? My inbox is
            always open — I try to reply to every message.
          </p>

          <div className={styles.infoList}>
            <a href={`mailto:${socialLinks.email}`} className={styles.infoRow}>
              <Mail size={17} /> {socialLinks.email}
            </a>
            <span className={styles.infoRow}>
              <MapPin size={17} /> {socialLinks.location}
            </span>
            <span className={styles.infoRow}>
              <Clock size={17} /> Usually replies within 1–2 days
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className={styles.formCard}>
          <ContactForm />
        </ScrollReveal>
      </div>
    </section>
  );
}
