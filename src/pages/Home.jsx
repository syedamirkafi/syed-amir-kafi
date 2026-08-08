import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import { goToSection } from "../lib/sections.js";
import HeroSection from "../sections/HeroSection.jsx";
import AboutSection from "../sections/AboutSection.jsx";
import ExperienceSection from "../sections/ExperienceSection.jsx";
import ProjectsSection from "../sections/ProjectsSection.jsx";
import SkillsSection from "../sections/SkillsSection.jsx";
import EducationSection from "../sections/EducationSection.jsx";
import CertificationsSection from "../sections/CertificationsSection.jsx";
import WorkSamplesSection from "../sections/WorkSamplesSection.jsx";
import ContactSection from "../sections/ContactSection.jsx";

export default function Home() {
  useDocumentTitle(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const t = setTimeout(() => goToSection(id), 120);
      return () => clearTimeout(t);
    }
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const t = setTimeout(() => goToSection(id), 120);
      return () => clearTimeout(t);
    }
  }, [location]);

  return (
    <main className="flex-1">
      <HeroSection />
      <div className="max-w-4xl mx-auto px-6">
        <AboutSection />
        <ExperienceSection />
        <WorkSamplesSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </div>
    </main>
  );
}
