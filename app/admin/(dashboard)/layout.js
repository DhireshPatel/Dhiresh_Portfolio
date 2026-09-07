import { AdminAuthProvider } from "@/lib/adminAuth";
import AuthGuard from "@/components/admin/AuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import styles from "./layout.module.css";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({ children }) {
  return (
    <AdminAuthProvider>
      <AuthGuard>
        <div className={styles.shell}>
          <AdminSidebar />
          <div className={styles.content}>{children}</div>
        </div>
      </AuthGuard>
    </AdminAuthProvider>
  );
}
