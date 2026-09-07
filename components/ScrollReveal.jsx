"use client";

import { motion } from "framer-motion";
import { fadeUp, revealViewport } from "@/lib/motionVariants";

/**
 * Wraps children in a scroll-triggered reveal animation.
 * Pass a custom `variants` object to override the default fade-up.
 */
export default function ScrollReveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  as: Component = motion.div,
  ...rest
}) {
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={variants}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}
