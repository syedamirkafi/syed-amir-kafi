import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — THE MONOLITH` : "THE MONOLITH — Syed Amir Kafi";
  }, [title]);
}
