import { useEffect, useState } from "react";

export const NAV_SECTIONS = [
  { id: "about", label: "About", number: "01" },
  { id: "experience", label: "Experience", number: "02" },
  { id: "work-samples", label: "Work samples", number: "03" },
  { id: "projects", label: "Projects", number: "04" },
  { id: "skills", label: "Skills", number: "05" },
  { id: "education", label: "Education", number: "06" },
  { id: "certifications", label: "Certifications", number: "07" },
  { id: "contact", label: "Contact", number: "08" },
];

export const MOBILE_NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function goToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function useActiveSection() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    NAV_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}
