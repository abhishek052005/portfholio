"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Menu, X, Sun, Moon, FileDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      // Small delay to let mobile menu close
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 transition-all duration-300">
      <nav
        className={`w-full transition-all duration-300 rounded-2xl md:rounded-full border border-card-border bg-card-bg/80 glass shadow-lg ${
          scrolled
            ? "max-w-4xl mt-3 py-2 px-6 backdrop-blur-md"
            : "max-w-6xl mt-6 py-4 px-8 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between h-10">
          {/* Logo / Monogram */}
          <a
            href="#home"
            className="flex items-center gap-2 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#home");
            }}
          >
            <span className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
              Abhishek Tiwari
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className="text-xs font-semibold hover:text-primary transition-colors duration-200 text-foreground/80 tracking-wide"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 border-l border-card-border pl-5">
              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full hover:bg-card-border transition-colors cursor-pointer text-muted hover:text-foreground"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>
              <a
                href="/abhishek's_resume.pdf"
                download="abhishek's_resume.pdf"
                className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold rounded-full bg-primary hover:bg-primary-hover text-white transition-all duration-200 shadow-md"
              >
                <FileDown className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-card-border transition-colors cursor-pointer text-muted hover:text-foreground"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-full hover:bg-card-border transition-colors text-muted hover:text-foreground cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-card-border mt-3 pt-3 pb-2"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className="block px-3 py-2 rounded-xl text-sm font-semibold text-foreground/80 hover:text-primary hover:bg-card-border transition-all"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="pt-3 border-t border-card-border flex flex-col gap-2">
                  <a
                    href="/abhishek's_resume.pdf"
                    download="abhishek's_resume.pdf"
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs text-center transition shadow-md"
                  >
                    <FileDown className="w-4 h-4" />
                    Download Resume
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
