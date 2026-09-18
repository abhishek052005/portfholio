"use client";

import { motion } from "framer-motion";
import { BrainCircuit, GraduationCap, Rocket, Sparkles } from "lucide-react";

export default function About() {
  const focusAreas = ["Machine Learning", "Generative AI", "Computer Vision", "OCR", "Recommendation Systems"];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-semibold text-primary tracking-wider uppercase flex items-center justify-center gap-2"><Sparkles className="w-4 h-4 text-accent" />About Me</motion.h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-card-border bg-card-bg glass flex gap-4 items-start shadow-sm"><div className="p-3 rounded-xl bg-accent/10 text-accent"><GraduationCap className="w-6 h-6" /></div><div><h4 className="text-base font-bold text-foreground">AI & Machine Learning</h4><p className="text-sm text-muted mt-1 leading-relaxed">Final-year AI & Machine Learning Engineering student building a strong foundation in intelligent systems and applied problem-solving.</p></div></motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-card-border bg-card-bg glass flex gap-4 items-start shadow-sm"><div className="p-3 rounded-xl bg-primary/10 text-primary"><BrainCircuit className="w-6 h-6" /></div><div><h4 className="text-base font-bold text-foreground">Building Applied AI</h4><p className="text-sm text-muted mt-1 leading-relaxed">Turning machine learning, Generative AI, computer vision, OCR, and recommendation systems into functional applications.</p></div></motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl border border-card-border bg-card-bg glass flex gap-4 items-start shadow-sm"><div className="p-3 rounded-xl bg-emerald-400/10 text-emerald-400"><Rocket className="w-6 h-6" /></div><div><h4 className="text-base font-bold text-foreground">From Model to Product</h4><p className="text-sm text-muted mt-1 leading-relaxed">Turning machine learning experiments into usable, deployable applications.</p></div></motion.div>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-start gap-16">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4 text-justify"><h3 className="text-2xl font-bold text-foreground">Building AI That Works in the Real World</h3><p className="text-base text-muted leading-relaxed">I&apos;m a final-year AI & Machine Learning Engineering student aspiring to build my career as an ML Engineer. I enjoy exploring how data, machine learning, and AI can be transformed into practical solutions for real-world problems.</p><p className="text-base text-muted leading-relaxed">My work spans machine learning, Generative AI, computer vision, OCR, and recommendation systems. I learn by building, experimenting, debugging, and improving applications while strengthening my skills in Python, data analysis, APIs, deployment, and problem-solving.</p><p className="text-base text-muted leading-relaxed">My goal is to design and deploy reliable AI/ML applications that are genuinely useful, while continuing to learn, collaborate, and solve meaningful problems with technology.</p></motion.div>
            <div className="space-y-3"><h4 className="text-sm font-semibold text-foreground tracking-wider uppercase">Focus Areas</h4><div className="flex flex-wrap gap-2.5">{focusAreas.map((area) => <span key={area} className="px-4 py-2 rounded-xl border border-card-border bg-card-bg glass text-xs font-semibold text-foreground/80">{area}</span>)}</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
