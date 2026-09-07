"use client";

import Link from "next/link";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import socialLinks from "@/data/socialLinks";
import styles from "./Footer.module.css";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <ScrollReveal className={styles.top}>
          <div>
            <div className={styles.logo}>
              Dhiresh<span className={styles.logoDot}>.</span>
            </div>
            <p className={styles.role}>Frontend Developer</p>
          </div>

          <nav className={styles.navCol} aria-label="Footer">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.socials}>
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialIcon}>
              <Github size={18} strokeWidth={1.75} />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
              <Linkedin size={18} strokeWidth={1.75} />
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
              <Instagram size={18} strokeWidth={1.75} />
            </a>
            <a href={`mailto:${socialLinks.email}`} aria-label="Email" className={styles.socialIcon}>
              <Mail size={18} strokeWidth={1.75} />
            </a>
          </div>
        </ScrollReveal>

        <div className={styles.bottom}>
          <span>© {year} Dhiresh. All rights reserved.</span>
          <span className={styles.builtWith}>Built with Next.js &amp; Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
