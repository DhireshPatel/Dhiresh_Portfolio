"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";
import styles from "./AuthGuard.module.css";

export default function AuthGuard({ children }) {
  const { session, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.replace("/admin/login");
    }
  }, [loading, session, router]);

  if (loading || !session) {
    return (
      <div className={styles.wrap}>
        <Loader2 size={22} className={styles.spinner} />
      </div>
    );
  }

  return children;
}
