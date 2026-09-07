"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, MessageSquare, Settings, LogOut, Menu, X } from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";
import styles from "./AdminSidebar.module.css";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.replace("/admin/login");
  };

  const content = (
    <>
      <div className={styles.brand}>
        Dhiresh<span className={styles.brandAccent}>.</span>
        <span className={styles.brandTag}>Admin</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <Icon size={17} strokeWidth={1.8} />
              {item.label}
            </Link>
          );
        })}
        <div className={styles.navItem} style={{ opacity: 0.5, cursor: "default" }}>
          <Settings size={17} strokeWidth={1.8} />
          Settings
        </div>
      </nav>

      <button className={styles.logoutBtn} onClick={handleLogout}>
        <LogOut size={17} strokeWidth={1.8} />
        Logout
      </button>
    </>
  );

  return (
    <>
      <aside className={styles.desktopSidebar}>{content}</aside>

      <div className={styles.mobileBar}>
        <div className={styles.brand}>
          Dhiresh<span className={styles.brandAccent}>.</span>
          <span className={styles.brandTag}>Admin</span>
        </div>
        <button
          className={styles.menuBtn}
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.mobilePanel}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
