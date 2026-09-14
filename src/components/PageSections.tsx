import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { rt } from "@/lib/richText";

// List of hospital routes where sections are dynamically ordered inline via DynamicPageSections
const DYNAMIC_LAYOUT_ROUTES = [
  "/",
  "/why-ishan",
  "/doctors",
  "/departments",
  "/patient-services",
  "/patient-faqs",
  "/appointment",
  "/contact"
];

export default function PageSections({ sections: propSections }: { sections?: any }) {
  const [globalData, setGlobalData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    // If this route is managed via DynamicPageSections, custom sections are placed inline
    if (DYNAMIC_LAYOUT_ROUTES.includes(location.pathname)) {
      setGlobalData(null);
      return;
    }

    const fetchGlobalSections = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiBase}/hospital/page-sections/by-url?url=${location.pathname}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.sections && data.sections.length > 0) {
             setGlobalData(data);
          } else {
             setGlobalData(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch global sections", err);
      }
    };
    fetchGlobalSections();
  }, [location.pathname]);

  // If this route is dynamically managed, do not render duplicate sections at the bottom
  if (DYNAMIC_LAYOUT_ROUTES.includes(location.pathname)) {
    return null;
  }

  // Use global data if it exists, otherwise fallback to props
  let actualSections = globalData?.sections || propSections;

  if (actualSections && !Array.isArray(actualSections) && typeof actualSections === 'object') {
     actualSections = actualSections.sections;
  }

  if (!actualSections || !Array.isArray(actualSections) || actualSections.length === 0) return null;

  return (
    <>
      {actualSections.map((sec: any, i: number) => (
        <div key={i} className="page-custom-section" dangerouslySetInnerHTML={{ __html: rt(sec.htmlContent || "") }} />
      ))}
    </>
  );
}
