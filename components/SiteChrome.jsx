"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import PageTransition from "./PageTransition";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alreadyVisited = sessionStorage.getItem("dhiresh-visited");
    if (alreadyVisited) {
      setLoading(false);
      return;
    }
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("dhiresh-visited", "1");
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  if (isAdmin) {
    // Admin section has its own layout/shell — keep the public
    // chrome (navbar/footer/cursor/loading) out of it entirely.
    return <>{children}</>;
  }

  return (
    <>
      <LoadingScreen visible={loading} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main style={{ paddingTop: "var(--nav-h)" }}>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
