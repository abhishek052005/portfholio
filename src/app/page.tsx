import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Loading Entrance Overlay */}
      <LoadingScreen />
      
      {/* Scroll indicator bar at the top */}
      <ScrollProgress />
      
      {/* Sticky header navigation */}
      <Navbar />
      
      {/* Main content sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Site map and copyright */}
      <Footer />
      
      {/* Floating button back-to-top */}
      <BackToTop />
    </div>
  );
}
