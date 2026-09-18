"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import RagAssistant from "./RagAssistant";

const roles = [
  "Data Scientist",
  "ML Engineer",
  "Python Developer",
  "Problem Solver",
];

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
  </svg>
);

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayedText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(
          isDeleting
            ? currentFullText.substring(0, displayedText.length - 1)
            : currentFullText.substring(0, displayedText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 overflow-hidden grid-bg"
    >
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-pulse-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-pulse-slow -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left z-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-card-border glass text-xs font-semibold text-primary"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              Open for Internships & Software Roles
            </motion.div> */}

            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg md:text-xl font-medium text-muted"
              >
                Hi there, I&apos;m
              </motion.h2>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
              >
                <span className="bg-gradient-to-r from-primary via-emerald-400 to-accent bg-clip-text text-transparent">
                  Abhishek Tiwari
                </span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl sm:text-2xl font-bold text-foreground/90 h-8 flex items-center justify-center md:justify-start"
              >
                <span>{displayedText}</span>
                <span className="w-1.5 h-6 bg-primary ml-1.5 animate-pulse" />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm md:text-base text-muted max-w-2xl leading-relaxed mx-auto md:mx-0 text-justify md:text-left"
            >
              I&apos;m an aspiring Data Scientist with a strong foundation in mathematics, statistics, and programming. I&apos;m passionate about machine learning and love turning raw data into meaningful insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <RagAssistant />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-3 justify-center md:justify-start text-xs font-semibold text-muted"
            >
              <MapPin className="w-4 h-4 text-accent" />
              <span>AIML Engineering student at Universal College of Engineering</span>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:translate-y-[-2px] cursor-pointer"
              >
                Hire Me
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-card-border hover:bg-card-border transition-all duration-200 glass text-xs font-bold hover:translate-y-[-2px] cursor-pointer"
              >
                View Projects
              </a>

              <a
                href="/abhishek's_resume.pdf"
                download="abhishek's_resume.pdf"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-card-border hover:border-primary/50 text-foreground text-xs font-bold transition-all duration-200 glass hover:translate-y-[-2px] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Resume CV
              </a>

            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center justify-center md:justify-start gap-4 pt-2"
            >
              <a
                href="https://github.com/abhishek052005"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-card-border hover:border-primary text-muted hover:text-primary transition-all duration-200 glass cursor-pointer"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/abhishek-tiwari-795356381/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-card-border hover:border-primary text-muted hover:text-primary transition-all duration-200 glass cursor-pointer"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4.5 h-4.5" />
              </a>
              <a
                href="mailto:abhishektiwari8134@gmail.com"
                className="p-2.5 rounded-xl border border-card-border hover:border-primary text-muted hover:text-primary transition-all duration-200 glass cursor-pointer"
                aria-label="Email"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </motion.div>
          </div>

          {/* Hero Right Column: Profile mockup card */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
            >
              {/* Outer decorative spinning circles */}
              <div className="absolute inset-0 rounded-full border border-dashed border-primary/30 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-accent/20 animate-[spin_20s_linear_infinite_reverse]" />

              {/* Glowing decorative gradient card */}
              <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-primary to-accent opacity-20 blur-2xl animate-pulse-slow" />

              <div className="absolute inset-10 rounded-3xl overflow-hidden border border-card-border bg-gradient-to-br from-primary/20 to-accent/20 shadow-xl shadow-white/10 dark:from-card-bg dark:to-background/30 glass animate-float">
                <Image
                  src="/bg.png"
                  alt="Abhishek Tiwari"
                  fill
                  sizes="(max-width: 768px) 100vw, 540px"
                  loading="eager"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
