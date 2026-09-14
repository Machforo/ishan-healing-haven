import { useQuery } from "@tanstack/react-query";

export interface SectionLayoutItem {
  id: string;
  name: string;
  type: 'builtin' | 'custom_html' | 'hero' | 'split' | 'cards' | 'cta' | 'faq';
  order: number;
  isHidden: boolean;
  heading?: string;
  subheading?: string;
  description?: string;
  htmlContent?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  items?: any[];
  settings?: any;
}

export interface PageLayoutResponse {
  siteKey: string;
  pageId: string;
  sections: SectionLayoutItem[];
  isDefault?: boolean;
}

export function usePageLayout(pageId: string) {
  return useQuery<PageLayoutResponse>({
    queryKey: ["hospital-page-layout", pageId],
    queryFn: async () => {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiBase}/hospital/page-layout/${pageId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch page layout for ${pageId}`);
      }
      const data = await response.json();
      return data;
    },
    staleTime: 1000 * 30, // 30 seconds fresh
    refetchOnWindowFocus: true,
  });
}
