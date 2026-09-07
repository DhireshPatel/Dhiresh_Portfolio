"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Calendar, Trash2, CheckCircle2, Archive, MailOpen, Loader2 } from "lucide-react";
import { statusMeta, formatDateTime } from "@/lib/adminUtils";
import styles from "./MessageModal.module.css";

export default function MessageModal({ message, onClose, onUpdateStatus, onDelete }) {
  const [busyAction, setBusyAction] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (!message) return null;
  const meta = statusMeta[message.status] || statusMeta.new;

  const runAction = async (key, fn) => {
    setBusyAction(key);
    await fn();
    setBusyAction("");
  };

  const handleDelete = async () => {
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    await runAction("delete", () => onDelete(message.id));
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <span className={styles.badge} style={{ color: meta.color, borderColor: meta.color }}>
              {meta.label}
            </span>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <h2 className={styles.subject}>{message.subject}</h2>

          <div className={styles.metaRow}>
            <span><strong>{message.name}</strong></span>
            <span className={styles.metaItem}><Mail size={14} /> {message.email}</span>
            {message.phone && <span className={styles.metaItem}><Phone size={14} /> {message.phone}</span>}
            <span className={styles.metaItem}><Calendar size={14} /> {formatDateTime(message.created_at)}</span>
          </div>

          <div className={styles.messageBody}>{message.message}</div>

          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              disabled={busyAction === "read" || message.status === "read"}
              onClick={() => runAction("read", () => onUpdateStatus(message.id, "read"))}
            >
              {busyAction === "read" ? <Loader2 size={14} className={styles.spin} /> : <MailOpen size={14} />} Mark as Read
            </button>
            <button
              className={styles.actionBtn}
              disabled={busyAction === "replied" || message.status === "replied"}
              onClick={() => runAction("replied", () => onUpdateStatus(message.id, "replied"))}
            >
              {busyAction === "replied" ? <Loader2 size={14} className={styles.spin} /> : <CheckCircle2 size={14} />} Mark as Replied
            </button>
            <button
              className={styles.actionBtn}
              disabled={busyAction === "archived" || message.status === "archived"}
              onClick={() => runAction("archived", () => onUpdateStatus(message.id, "archived"))}
            >
              {busyAction === "archived" ? <Loader2 size={14} className={styles.spin} /> : <Archive size={14} />} Archive
            </button>
            <button
              className={`${styles.actionBtn} ${styles.deleteBtn} ${confirmingDelete ? styles.deleteConfirm : ""}`}
              onClick={handleDelete}
              disabled={busyAction === "delete"}
            >
              {busyAction === "delete" ? (
                <Loader2 size={14} className={styles.spin} />
              ) : (
                <Trash2 size={14} />
              )}
              {confirmingDelete ? "Click again to confirm" : "Delete"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
