"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 24px" }}>
      <div>
        <p className="text-mono accent" style={{ fontSize: "0.9rem", marginBottom: 16 }}>
          404
        </p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>
          This page doesn&rsquo;t exist.
        </h1>
        <p style={{ color: "var(--muted)", marginTop: 14 }}>
          The page you&rsquo;re looking for may have been moved or removed.
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: 30, display: "inline-flex" }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </section>
  );
}
