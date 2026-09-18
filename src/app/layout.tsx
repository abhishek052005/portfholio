import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhishek Tiwari | Data Scientist and ML Engineer",
  description: "Abhishek Tiwari is an aspiring Data Scientist and ML Engineer focused on machine learning, NLP, computer vision, and data visualization.",
  keywords: [
    "Abhishek Tiwari",
    "Data Scientist",
    "ML Engineer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "Python Developer",
    "AIML Engineering",
    "Universal College of Engineering",
    "Portfolio Website",
  ],
  authors: [{ name: "Abhishek Tiwari" }],
  creator: "Abhishek Tiwari",
  openGraph: {
    title: "Abhishek Tiwari | Data Scientist and ML Engineer",
    description: "Abhishek Tiwari is an aspiring Data Scientist and ML Engineer focused on machine learning, NLP, computer vision, and data visualization.",
    type: "website",
    locale: "en_IN",
    siteName: "Abhishek Tiwari",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Tiwari | Data Scientist and ML Engineer",
    description: "Abhishek Tiwari is an aspiring Data Scientist and ML Engineer focused on machine learning, NLP, computer vision, and data visualization.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
