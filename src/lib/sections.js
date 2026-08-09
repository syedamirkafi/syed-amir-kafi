import { useEffect, useState } from "react";

export const NAV_SECTIONS = [
  { id: "top", label: "Home", number: "00" },
  { id: "experience", label: "Experience", number: "01" },
  { id: "work", label: "Selected Work", number: "02" },
  { id: "skills", label: "Skills", number: "03" },
  { id: "credentials", label: "Credentials", number: "04" },
  { id: "contact", label: "Contact", number: "05" },
];

export const MOBILE_NAV = [
  { id: "top", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
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
