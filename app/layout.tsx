import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import ThemeBoot from "@/components/ThemeBoot";

export const metadata: Metadata = {
  title: "LTU Assignment · Next.js + Bootstrap",
  description: "yanlongyang · 22519263 · CSE3CWA / CSE5006"
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="d-flex flex-column min-vh-100">
        <Header />
        <main id="main" className="container my-4 flex-grow-1">{children}</main>
        <footer className="bg-body-tertiary border-top py-3 text-center">
          <small>
            <strong>yanlongyang</strong>, <strong>22519263</strong>, 2025-08-19
          </small>
        </footer>
        {/* 加载 Bootstrap JS（客户端执行） */}
        <ThemeBoot />
      </body>
    </html>
  );
}
