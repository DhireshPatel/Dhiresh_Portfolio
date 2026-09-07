import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata = {
  metadataBase: new URL("https://dhiresh.dev"),
  title: {
    default: "Dhiresh — Frontend Developer",
    template: "%s — Dhiresh",
  },
  description:
    "Dhiresh is a frontend developer building modern, responsive and interactive web experiences with React, Next.js and JavaScript.",
  keywords: [
    "Dhiresh",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Portfolio",
  ],
  openGraph: {
    title: "Dhiresh — Frontend Developer",
    description:
      "Frontend developer building modern, responsive and interactive web experiences.",
    url: "https://dhiresh.dev",
    siteName: "Dhiresh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhiresh — Frontend Developer",
    description:
      "Frontend developer building modern, responsive and interactive web experiences.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
