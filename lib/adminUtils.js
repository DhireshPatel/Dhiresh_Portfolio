export const statusMeta = {
  new: { label: "New", color: "var(--status-new)" },
  read: { label: "Read", color: "var(--status-read)" },
  replied: { label: "Replied", color: "var(--status-replied)" },
  archived: { label: "Archived", color: "var(--status-archived)" },
};

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
