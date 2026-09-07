"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, LogIn } from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";
import styles from "./page.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const { session, loading, signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && session) {
      router.replace("/admin");
    }
  }, [loading, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setSubmitting(true);
    const { error: signInError } = await signIn(email.trim(), password);
    setSubmitting(false);

    if (signInError) {
      setError("Invalid email or password.");
      return;
    }

    router.replace("/admin");
  };

  if (loading || session) {
    return (
      <div className={styles.page}>
        <Loader2 className={styles.spinner} size={22} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="grid-bg" />
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={styles.card}
      >
        <div className={styles.logo}>
          Dhiresh<span className={styles.logoDot}>.</span>
        </div>
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.subtitle}>Sign in to manage contact messages.</p>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className={styles.error}>
            <AlertCircle size={15} /> {error}
          </div>
        )}

        <button type="submit" className={`btn btn-primary ${styles.submit}`} disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 size={16} className={styles.btnSpinner} /> Signing in...
            </>
          ) : (
            <>
              <LogIn size={16} /> Sign In
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
}
