"use client";

import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  { title: "Book Recommendation System", description: "A scalable recommendation system using collaborative and content-based filtering to deliver personalized book suggestions.", tags: ["Python", "Pandas", "Scikit-learn", "Flask", "Machine Learning"], category: "Machine Learning", liveUrl: "https://book-recommendation-tzl9.onrender.com/", githubUrl: "https://github.com/abhishek052005/Book-Recommendation", image: "/book.png" },
  { title: "Image Classification CNN", description: "A deep learning model using ResNet architecture for multi-class image classification with 97% validation accuracy.", tags: ["PyTorch", "CNN", "ResNet", "OpenCV"], category: "Deep Learning", liveUrl: "", githubUrl: "" },
  { title: "Text Summarizer with LLM", description: "A fine-tuned large language model for abstractive text summarization, integrated with a Streamlit web interface.", tags: ["Hugging Face", "LLM", "Streamlit", "NLP"], category: "Generative AI", liveUrl: "", githubUrl: "" },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background/50 grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16"><motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-base font-semibold text-primary tracking-wider uppercase">My Works</motion.h2><motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">Featured Projects</motion.h3></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{projects.map((project, index) => <motion.article key={project.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="rounded-3xl border border-card-border bg-card-bg glass shadow-md overflow-hidden flex flex-col h-full"><div className="relative h-40 border-b border-card-border overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/20">{project.image ? <Image src={project.image} alt={`${project.title} interface`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /> : <div className="h-full p-6 flex flex-col justify-between"><span className="text-xs font-bold uppercase tracking-wider text-primary">{project.category}</span><div><div className="h-2 w-2/3 rounded bg-primary/40 mb-3" /><div className="h-2 w-1/2 rounded bg-accent/30" /></div></div>}</div><div className="p-6 flex-1 flex flex-col justify-between gap-5"><div className="space-y-2"><h4 className="text-lg font-bold text-foreground">{project.title}</h4><p className="text-xs text-muted leading-relaxed">{project.description}</p></div><div className="space-y-4"><div className="flex flex-wrap gap-1.5">{project.tags.map((tag) => <span key={tag} className="px-2.5 py-1 rounded-lg bg-card-border text-[9px] font-semibold text-foreground/80">{tag}</span>)}</div><div className="flex gap-3">{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold"><ExternalLink className="w-4 h-4" />Live Demo</a>}{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 flex-1 px-3 py-2 rounded-xl border border-card-border hover:bg-card-border text-foreground text-xs font-semibold">GitHub Code</a>}</div></div></div></motion.article>)}</div>
      </div>
    </section>
  );
}
