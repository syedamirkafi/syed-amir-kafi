import { useEffect } from "react";
import { useLocation } from "react-router";
import { useDocumentTitle } from "../lib/useDocumentTitle.js";
import { goToSection } from "../lib/sections.js";
import HeroSection from "../sections/HeroSection.jsx";
import ExperienceTimeline from "../sections/ExperienceTimeline.jsx";
import SelectedWork from "../sections/SelectedWork.jsx";
import SkillsSection from "../sections/SkillsSection.jsx";
import EducationCredentials from "../sections/EducationCredentials.jsx";
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
        <ExperienceTimeline />
        <SelectedWork />
        <SkillsSection />
        <EducationCredentials />
        <ContactSection />
      </div>
    </main>
  );
}
