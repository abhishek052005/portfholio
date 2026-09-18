"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#030712] text-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Pulsing glow behind */}
            <div className="absolute -inset-10 rounded-full bg-primary/20 blur-xl animate-pulse-slow" />
            
            {/* Animated Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex items-center justify-center w-24 h-24 rounded-2xl border border-primary/50 bg-gray-950/80 shadow-2xl glass mb-6 overflow-hidden"
            >
              {/* Sliding glass highlight */}
              <motion.div
                animate={{ left: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear", repeatDelay: 0.5 }}
                className="absolute top-0 bottom-0 w-8 bg-white/10 skew-x-12"
              />
              <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AT
              </span>
            </motion.div>

            {/* Title / Name */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-xl font-semibold tracking-widest text-gray-200"
            >
              ABHISHEK TIWARI
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-xs tracking-wider text-muted mt-2"
            >
              Full Stack AI Developer
            </motion.p>

            {/* Modern bar progress indicator */}
            <div className="w-48 h-1 bg-gray-900 rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
