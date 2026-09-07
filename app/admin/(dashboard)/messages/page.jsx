"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle } from "lucide-react";
import { useContactMessages } from "@/lib/useContactMessages";
import MessageTable from "@/components/admin/MessageTable";
import MessageCard from "@/components/admin/MessageCard";
import MessageModal from "@/components/admin/MessageModal";
import styles from "./page.module.css";

const filters = ["All", "New", "Read", "Replied", "Archived"];

export default function AdminMessagesPage() {
  const { messages, loading, error, updateStatus, deleteMessage } = useContactMessages();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let list = messages;

    if (activeFilter !== "All") {
      list = list.filter((m) => m.status === activeFilter.toLowerCase());
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q)
      );
    }

    return list;
  }, [messages, activeFilter, query]);

  const selectedMessage = selected
    ? messages.find((m) => m.id === selected) || null
    : null;

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Messages</h1>
        <p className={styles.subtitle}>All contact form submissions from your portfolio.</p>
      </div>

      {error && (
        <div className={styles.errorBanner}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, email or subject..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterRow}>
          {filters.map((f) => {
            const isActive = f === activeFilter;
            return (
              <button
                key={f}
                className={styles.filterBtn}
                data-active={isActive}
                onClick={() => setActiveFilter(f)}
              >
                <span className={styles.filterLabel}>{f}</span>
                {isActive && (
                  <motion.span
                    layoutId="admin-filter-pill"
                    className={styles.filterPill}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className={styles.emptyState}>Loading messages...</div>
      ) : filtered.length === 0 ? (
        <div className={styles.emptyState}>
          {messages.length === 0 ? "No messages yet." : "No messages match your search."}
        </div>
      ) : (
        <>
          <div className={styles.desktopOnly}>
            <MessageTable messages={filtered} onSelect={(m) => setSelected(m.id)} />
          </div>
          <div className={styles.mobileOnly}>
            {filtered.map((m) => (
              <MessageCard key={m.id} message={m} onSelect={(msg) => setSelected(msg.id)} />
            ))}
          </div>
        </>
      )}

      <AnimatePresence>
        {selectedMessage && (
          <MessageModal
            message={selectedMessage}
            onClose={() => setSelected(null)}
            onUpdateStatus={updateStatus}
            onDelete={deleteMessage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
