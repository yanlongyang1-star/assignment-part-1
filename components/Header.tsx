"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
    // Return focus to hamburger button
    buttonRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    } else if (event.key === "Escape" && open) {
      closeMenu();
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="bg-white border-bottom">
      <div className="container">
        {/* Top Row: Student Number and Theme Toggle */}
        <div className="d-flex justify-content-between align-items-center py-2">
          {/* Student Number - Left Side */}
          <div className="student-number">
            <span className="h4 mb-0 fw-bold text-dark">22519263</span>
          </div>

          {/* Theme Toggle - Right Side */}
          <div className="theme-toggle">
            <ThemeToggle />
          </div>
        </div>

        {/* Bottom Row: Navigation and Hamburger */}
        <div className="d-flex justify-content-between align-items-center py-2 border-top">
                           {/* Desktop Navigation Menu - Left Side */}
                 <div className="hidden lg:flex align-items-center">
                   <nav aria-label="Main">
                     <ul className="nav flex-row" role="menubar">
              <li className="nav-item" role="none">
                <Link 
                  href="/generators/tabs" 
                  className={`nav-link fw-medium px-3 ${pathname === "/generators/tabs" ? "active" : "text-dark"}`}
                  role="menuitem"
                >
                  Tabs
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link 
                  href="/prelab" 
                  className={`nav-link fw-medium px-3 ${pathname === "/prelab" ? "active" : "text-dark"}`}
                  role="menuitem"
                >
                  Pre-lab Questions
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link 
                  href="/escape-room" 
                  className={`nav-link fw-medium px-3 ${pathname === "/escape-room" ? "active" : "text-dark"}`}
                  role="menuitem"
                >
                  Escape Room
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link 
                  href="/coding-races" 
                  className={`nav-link fw-medium px-3 ${pathname === "/coding-races" ? "active" : "text-dark"}`}
                  role="menuitem"
                >
                  Coding Races
                </Link>
              </li>
              <li className="nav-item" role="none">
                <Link 
                  href="/about" 
                  className={`nav-link fw-medium px-3 ${pathname === "/about" ? "active" : "text-dark"}`}
                  role="menuitem"
                >
                  About
                </Link>
              </li>
            </ul>
                   </nav>
                 </div>

          {/* Hamburger Menu Button - Right Side (Mobile only) */}
          <button
            ref={buttonRef}
            className="btn btn-link p-0 border-0 bg-transparent lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
            onKeyDown={handleKeyDown}
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span 
                className="hamburger-line"
                style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  background: '#111',
                  margin: '4px 0',
                  transition: 'transform 180ms ease, opacity 180ms ease',
                  transform: open ? 'translateY(6px) rotate(45deg)' : 'none'
                }}
              ></span>
              <span 
                className="hamburger-line"
                style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  background: '#111',
                  margin: '4px 0',
                  transition: 'transform 180ms ease, opacity 180ms ease',
                  transform: open ? 'scaleX(0)' : 'none',
                  opacity: open ? 0 : 1
                }}
              ></span>
              <span 
                className="hamburger-line"
                style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  background: '#111',
                  margin: '4px 0',
                  transition: 'transform 180ms ease, opacity 180ms ease',
                  transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none'
                }}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Drawer - Only rendered when open */}
        {open && (
          <>
            {/* Semi-transparent backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
              onClick={closeMenu}
            />
            
            {/* Drawer */}
            <nav 
              ref={menuRef}
              id="mobile-menu" 
              aria-label="Mobile"
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg lg:hidden z-50"
              style={{ 
                top: '120px',
                transform: open ? 'translateX(0)' : 'translateX(100%)',
                opacity: open ? 1 : 0,
                pointerEvents: open ? 'auto' : 'none',
                transition: 'transform 220ms ease, opacity 220ms ease'
              }}
            >
              <ul className="nav flex-column p-4" role="menubar">
                <li className="nav-item" role="none">
                  <Link 
                    href="/tabs" 
                    className={`nav-link fw-medium ${pathname === "/tabs" ? "active" : "text-dark"}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    Tabs
                  </Link>
                </li>
                <li className="nav-item" role="none">
                  <Link 
                    href="/prelab" 
                    className={`nav-link fw-medium ${pathname === "/prelab" ? "active" : "text-dark"}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    Pre-lab Questions
                  </Link>
                </li>
                <li className="nav-item" role="none">
                  <Link 
                    href="/escape-room" 
                    className={`nav-link fw-medium ${pathname === "/escape-room" ? "active" : "text-dark"}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    Escape Room
                  </Link>
                </li>
                <li className="nav-item" role="none">
                  <Link 
                    href="/coding-races" 
                    className={`nav-link fw-medium ${pathname === "/coding-races" ? "active" : "text-dark"}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    Coding Races
                  </Link>
                </li>
                <li className="nav-item" role="none">
                  <Link 
                    href="/about" 
                    className={`nav-link fw-medium ${pathname === "/about" ? "active" : "text-dark"}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
      </header>
  );
}
