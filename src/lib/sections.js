import { useEffect, useState } from "react";

export const NAV_SECTIONS = [
  { id: "top", label: "Home", number: "00" },
  { id: "skills", label: "Skills", number: "01" },
  { id: "work", label: "Projects", number: "02" },
  { id: "journey", label: "Journey", number: "03" },
  { id: "certifications", label: "Certifications", number: "04" },
  { id: "contact", label: "Contact", number: "05" },
];

export const MOBILE_NAV = [
  { id: "top", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "certifications", label: "Certifications" },
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
