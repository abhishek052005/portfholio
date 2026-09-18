"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

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

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required.";
    
    if (!form.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!form.subject.trim()) tempErrors.subject = "Subject is required.";
    if (!form.message.trim()) {
      tempErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#14b8a6", "#4f46e5"],
      });

      setForm({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const contactDetails = [
    {
      name: "Email Address",
      value: "abhishektiwari8134@gmail.com",
      href: "mailto:abhishektiwari8134@gmail.com",
      icon: <Mail className="w-5 h-5 text-primary" />,
      actionText: "Send email",
    },
    {
      name: "LinkedIn Professional",
      value: "linkedin.com/in/abhishek-tiwari-795356381",
      href: "https://www.linkedin.com/in/abhishek-tiwari-795356381/",
      icon: <LinkedinIcon className="w-5 h-5 text-accent" />,
      actionText: "Connect with me",
    },
    {
      name: "GitHub Developer",
      value: "github.com/abhishek052005",
      href: "https://github.com/abhishek052005",
      icon: <GithubIcon className="w-5 h-5 text-indigo-500" />,
      actionText: "Check repository",
    },
];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold text-primary tracking-wider uppercase"
          >
            Get In Touch
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight"
          >
            Let&apos;s Connect
          </motion.h3>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Grid Left: Detail Cards */}
          <div className="lg:col-span-5 space-y-4">
            {contactDetails.map((detail, idx) => (
              <motion.a
                key={detail.name}
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-5 rounded-2xl border border-card-border bg-card-bg glass flex gap-4 items-center group transition-all duration-200 hover:border-primary/30 hover:shadow-md cursor-pointer block"
              >
                <div className="p-3 rounded-xl bg-card-bg border border-card-border shadow-sm group-hover:scale-110 transition-transform duration-200">
                  {detail.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-muted tracking-wider uppercase">{detail.name}</h4>
                  <p className="text-sm font-bold text-foreground truncate mt-0.5">{detail.value}</p>
                </div>
                <span className="text-[10px] font-bold text-primary group-hover:translate-x-1 transition-transform pl-2">
                  {detail.actionText} →
                </span>
              </motion.a>
            ))}
          </div>

          {/* Grid Right: Form Panel */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl border border-card-border bg-card-bg glass shadow-lg relative overflow-hidden"
            >
              {/* Success Notification */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 flex items-center gap-3 text-sm font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Thank you! Your message was sent successfully. Abhishek will reply shortly!</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-foreground/80">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 rounded-xl border bg-background/50 text-sm text-foreground outline-none transition-all duration-200 focus:bg-background ${
                        errors.name
                          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-card-border focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                    />
                    {errors.name && <p className="text-[10px] font-bold text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-foreground/80">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className={`w-full px-4 py-3 rounded-xl border bg-background/50 text-sm text-foreground outline-none transition-all duration-200 focus:bg-background ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-card-border focus:border-primary focus:ring-1 focus:ring-primary"
                      }`}
                    />
                    {errors.email && <p className="text-[10px] font-bold text-red-500">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-bold text-foreground/80">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Proposal / Job Opportunity"
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 text-sm text-foreground outline-none transition-all duration-200 focus:bg-background ${
                      errors.subject
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-card-border focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {errors.subject && <p className="text-[10px] font-bold text-red-500">{errors.subject}</p>}
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-foreground/80">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className={`w-full px-4 py-3 rounded-xl border bg-background/50 text-sm text-foreground outline-none transition-all duration-200 focus:bg-background resize-none ${
                      errors.message
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-card-border focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  />
                  {errors.message && <p className="text-[10px] font-bold text-red-500">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-primary/20 disabled:opacity-75 disabled:cursor-not-allowed hover:translate-y-[-1px] active:translate-y-0 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
