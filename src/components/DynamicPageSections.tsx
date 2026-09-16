import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { usePageLayout, SectionLayoutItem } from "@/hooks/usePageLayout";
import CustomSectionRenderer from "@/components/CustomSectionRenderer";
import PageGallery from "@/components/PageGallery";

interface DynamicPageSectionsProps {
  pageId: string;
  defaultSections: Record<string, ReactNode>;
  defaultOrder: string[];
}

export default function DynamicPageSections({
  pageId,
  defaultSections,
  defaultOrder
}: DynamicPageSectionsProps) {
  const location = useLocation();
  if (typeof window !== 'undefined') {
    (window as any).__renderedDynamicPagePath = location.pathname;
  }
  const { data: layoutData, isLoading } = usePageLayout(pageId);

  // If loading or no valid sections array received, render default order
  if (isLoading || !layoutData || !Array.isArray(layoutData.sections) || layoutData.sections.length === 0) {
    return (
      <>
        {defaultOrder.map((id) => (
          <React.Fragment key={id}>{defaultSections[id] || null}</React.Fragment>
        ))}
      </>
    );
  }

  const sections: SectionLayoutItem[] = layoutData.sections;
  const renderedIds = new Set<string>();

  return (
    <>
      {sections.map((sec) => {
        // Skip hidden sections
        if (sec.isHidden) {
          renderedIds.add(sec.id);
          renderedIds.add(sec.id.replace(/-/g, "_"));
          renderedIds.add(sec.id.replace(/_/g, "-"));
          return null;
        }

        // Direct or aliased match (hyphen vs underscore)
        const direct = defaultSections[sec.id];
        const under = defaultSections[sec.id.replace(/-/g, "_")];
        const dash = defaultSections[sec.id.replace(/_/g, "-")];
        const target = direct || under || dash;

        if (target) {
          renderedIds.add(sec.id);
          renderedIds.add(sec.id.replace(/-/g, "_"));
          renderedIds.add(sec.id.replace(/_/g, "-"));
          return <React.Fragment key={sec.id}>{target}</React.Fragment>;
        }

        // Built-in gallery section placed in layout
        if (sec.id === "gallery" || sec.id === "page_gallery") {
          renderedIds.add(sec.id);
          return <PageGallery key={sec.id} isInline={true} />;
        }

        // Otherwise, render custom section (custom_html, hero, split, cards, cta, faq)
        return <CustomSectionRenderer key={sec.id} section={sec} />;
      })}

      {/* Render any default sections that were not in backend layout and not hidden */}
      {defaultOrder.map((id) => {
        if (!renderedIds.has(id) && defaultSections[id]) {
          return <React.Fragment key={id}>{defaultSections[id]}</React.Fragment>;
        }
        return null;
      })}
    </>
  );
}
