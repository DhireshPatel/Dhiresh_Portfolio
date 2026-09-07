"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

/**
 * Fetches all contact_messages the logged-in admin is allowed to see
 * (enforced by Supabase RLS) and exposes helpers to mutate them.
 */
export function useContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError("");
    const supabase = getSupabaseBrowserClient();
    const { data, error: fetchError } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError("Could not load messages. Please try again.");
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const updateStatus = async (id, status) => {
    const supabase = getSupabaseBrowserClient();
    const { error: updateError } = await supabase
      .from("contact_messages")
      .update({ status })
      .eq("id", id);

    if (updateError) return { success: false };

    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    return { success: true };
  };

  const deleteMessage = async (id) => {
    const supabase = getSupabaseBrowserClient();
    const { error: deleteError } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (deleteError) return { success: false };

    setMessages((prev) => prev.filter((m) => m.id !== id));
    return { success: true };
  };

  const stats = {
    total: messages.length,
    new: messages.filter((m) => m.status === "new").length,
    read: messages.filter((m) => m.status === "read").length,
    replied: messages.filter((m) => m.status === "replied").length,
    archived: messages.filter((m) => m.status === "archived").length,
  };

  return { messages, loading, error, stats, refetch: fetchMessages, updateStatus, deleteMessage };
}
