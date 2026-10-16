import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Specialties } from "@/components/Specialties";
import { Comparison } from "@/components/Comparison";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { DailyMeals } from "@/components/DailyMeals";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Effects } from "@/components/Effects";

export default function HomePage() {
  return (
    <>
      <div className="loader" aria-hidden="true" />
      <Header />
      <main id="principal" className="page-wrapper">
        <Hero />
        <About />
        <Specialties />
        <Comparison />
        <ProjectsCarousel />
        <DailyMeals />
        <ExperienceSection />
        <Contact />
        <Footer />
      </main>
      <Effects />
    </>
  );
}
