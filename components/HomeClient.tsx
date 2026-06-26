"use client";

import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import type { BlogPost } from "@/types/blog";
import type { PortfolioData } from "@/types/portfolio";

interface HomeClientProps {
  data: PortfolioData;
  posts: BlogPost[];
}

export default function HomeClient({ data, posts }: HomeClientProps) {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);
  const { settings, experiences, projects, achievements } = data;

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />
      <ScrollProgress />
      <Navbar ctaText={settings.navCtaText} />
      <main>
        <Hero settings={settings} />
        <Intro settings={settings} />
        <About settings={settings} />
        <Skills settings={settings} />
        <Experience settings={settings} experiences={experiences} />
        <Projects settings={settings} projects={projects} />
        <Achievements settings={settings} achievements={achievements} />
        <Blog settings={settings} posts={posts} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
