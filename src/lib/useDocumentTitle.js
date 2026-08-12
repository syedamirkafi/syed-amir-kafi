import { useEffect } from "react";

const SITE_NAME = "Syed Amir Kafi";

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Business Analyst`;
  }, [title]);
}
