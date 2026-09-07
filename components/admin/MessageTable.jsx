"use client";

import { statusMeta, formatDate } from "@/lib/adminUtils";
import styles from "./MessageTable.module.css";

export default function MessageTable({ messages, onSelect }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m) => {
            const meta = statusMeta[m.status] || statusMeta.new;
            return (
              <tr key={m.id}>
                <td className={styles.nameCell}>{m.name}</td>
                <td className={styles.mutedCell}>{m.email}</td>
                <td className={styles.subjectCell}>{m.subject}</td>
                <td>
                  <span className={styles.badge} style={{ color: meta.color, borderColor: meta.color }}>
                    {meta.label}
                  </span>
                </td>
                <td className={styles.mutedCell}>{formatDate(m.created_at)}</td>
                <td>
                  <button className={styles.viewBtn} onClick={() => onSelect(m)}>
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
