import { useEffect } from "react";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — SYED AMIR KAFI` : "SYED AMIR KAFI";
  }, [title]);
}
