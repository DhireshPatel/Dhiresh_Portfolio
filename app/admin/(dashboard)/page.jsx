"use client";

import Link from "next/link";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import AdminStats from "@/components/admin/AdminStats";
import { useContactMessages } from "@/lib/useContactMessages";
import { statusMeta, formatDate } from "@/lib/adminUtils";
import styles from "./page.module.css";

export default function AdminDashboardPage() {
  const { messages, loading, error, stats } = useContactMessages();
  const recent = messages.slice(0, 6);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Welcome back, Dhiresh.</p>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <AdminStats stats={stats} loading={loading} />

      <div className={styles.recentSection}>
        <div className={styles.recentHeader}>
          <h2 className={styles.recentTitle}>Recent Messages</h2>
          <Link href="/admin/messages" className={styles.viewAll}>
            View All <ArrowUpRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className={styles.emptyState}>Loading messages...</div>
        ) : recent.length === 0 ? (
          <div className={styles.emptyState}>No messages yet.</div>
        ) : (
          <div className={styles.list}>
            {recent.map((m) => {
              const meta = statusMeta[m.status] || statusMeta.new;
              return (
                <Link key={m.id} href="/admin/messages" className={styles.row}>
                  <div className={styles.rowMain}>
                    <span className={styles.rowName}>{m.name}</span>
                    <span className={styles.rowSubject}>{m.subject}</span>
                  </div>
                  <div className={styles.rowMeta}>
                    <span className={styles.rowEmail}>{m.email}</span>
                    <span className={styles.badge} style={{ color: meta.color, borderColor: meta.color }}>
                      {meta.label}
                    </span>
                    <span className={styles.rowDate}>{formatDate(m.created_at)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
