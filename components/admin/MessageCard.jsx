"use client";

import { statusMeta, formatDate } from "@/lib/adminUtils";
import styles from "./MessageCard.module.css";

export default function MessageCard({ message, onSelect }) {
  const meta = statusMeta[message.status] || statusMeta.new;

  return (
    <button className={styles.card} onClick={() => onSelect(message)}>
      <div className={styles.topRow}>
        <span className={styles.name}>{message.name}</span>
        <span className={styles.badge} style={{ color: meta.color, borderColor: meta.color }}>
          {meta.label}
        </span>
      </div>
      <div className={styles.subject}>{message.subject}</div>
      <div className={styles.bottomRow}>
        <span>{message.email}</span>
        <span>{formatDate(message.created_at)}</span>
      </div>
    </button>
  );
}
