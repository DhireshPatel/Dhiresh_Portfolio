"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import styles from "./Journey.module.css";

const milestones = [
  {
    title: "Started learning web development",
    detail:
      "Began exploring how the web works — HTML, CSS and the basics of building for the browser.",
    tag: "Foundations",
  },
  {
    title: "Learned HTML & CSS",
    detail:
      "Focused on semantic markup, layout systems and building fully responsive interfaces.",
    tag: "Foundations",
  },
  {
    title: "Started JavaScript",
    detail:
      "Moved into logic and interactivity — DOM manipulation, events and core language fundamentals.",
    tag: "Core Skills",
  },
  {
    title: "Started React",
    detail:
      "Learned component-based architecture, state management and building reusable UI.",
    tag: "Core Skills",
  },
  {
    title: "Started Next.js",
    detail:
      "Explored routing, server components and full-stack patterns within the React ecosystem.",
    tag: "Growth",
  },
  {
    title: "Built real-world projects",
    detail:
      "Applied everything learned to complete, working products end to end.",
    tag: "Growth",
  },
  {
    title: "Continuously improving",
    detail:
      "Still learning, still building — refining craft with every new project.",
    tag: "Ongoing",
  },
];

export default function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 200, damping: 32 });

  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">My Journey</span>
          <h2 className="section-heading">Step by step, still going.</h2>
        </ScrollReveal>

        <div className={styles.timeline} ref={ref}>
          <div className={styles.trackBg} />
          <motion.div
            className={styles.trackFill}
            style={{ scaleY: lineScale }}
          />

          {milestones.map((m, i) => (
            <ScrollReveal
              key={m.title}
              className={styles.item}
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
              }}
            >
              <span className={styles.dot} />
              <div className={styles.itemContent}>
                <span className={styles.itemTag}>{m.tag}</span>
                <h3 className={styles.itemTitle}>{m.title}</h3>
                <p className={styles.itemDetail}>{m.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
