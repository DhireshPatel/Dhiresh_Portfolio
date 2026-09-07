import { AdminAuthProvider } from "@/lib/adminAuth";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminAuthLayout({ children }) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
