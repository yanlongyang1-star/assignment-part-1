import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import ThemeBoot from "@/components/ThemeBoot";

export const metadata: Metadata = {
  title: "LTU Assignment · Next.js + Bootstrap",
  description: "yanlongyang · 22519263 · CSE3CWA / CSE5006"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="d-flex flex-column min-vh-100">
        {/* Title Layer - Above Navigation */}
        <div className="bg-body border-bottom py-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-8">
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="h3 mb-0 text-start text-body">Title</h1>
                  <div className="text-end">
                    <span className="fw-semibold text-body">Student No. </span>
                    <span className="text-body-secondary">22519263</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Header />
        <main id="main" className="container my-4 flex-grow-1">{children}</main>
        <footer className="bg-body-tertiary border-top py-3 text-center">
          <small>
            <strong>yanlongyang</strong>, <strong>22519263</strong>, 2025-08-19
          </small>
        </footer>
        {/* Load Bootstrap JS (client-side execution) */}
        <ThemeBoot />
      </body>
    </html>
  );
}
