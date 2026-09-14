import React, { ReactNode } from "react";
import { usePageLayout, SectionLayoutItem } from "@/hooks/usePageLayout";
import CustomSectionRenderer from "@/components/CustomSectionRenderer";

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

  return (
    <>
      {sections.map((sec) => {
        // Skip hidden sections
        if (sec.isHidden) return null;

        // If it's a built-in section registered in defaultSections, render it
        if (sec.type === "builtin" && defaultSections[sec.id]) {
          return <React.Fragment key={sec.id}>{defaultSections[sec.id]}</React.Fragment>;
        }

        // Otherwise, render custom section (custom_html, hero, split, cards, cta, faq)
        return <CustomSectionRenderer key={sec.id} section={sec} />;
      })}
    </>
  );
}
