"use client";

import { motion } from "framer-motion";
import { Inbox, MailOpen, CheckCircle2, Archive, MessagesSquare } from "lucide-react";
import styles from "./AdminStats.module.css";

const config = [
  { key: "total", label: "Total Messages", icon: MessagesSquare, color: "var(--foreground)" },
  { key: "new", label: "New", icon: Inbox, color: "var(--status-new)" },
  { key: "read", label: "Read", icon: MailOpen, color: "var(--status-read)" },
  { key: "replied", label: "Replied", icon: CheckCircle2, color: "var(--status-replied)" },
  { key: "archived", label: "Archived", icon: Archive, color: "var(--status-archived)" },
];

export default function AdminStats({ stats, loading }) {
  return (
    <div className={styles.grid}>
      {config.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={styles.card}
          >
            <div className={styles.iconWrap} style={{ color: item.color }}>
              <Icon size={18} strokeWidth={1.8} />
            </div>
            <div>
              <div className={styles.value}>{loading ? "—" : stats?.[item.key] ?? 0}</div>
              <div className={styles.label}>{item.label}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
