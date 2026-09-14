import { createElement } from "react";
import { cn } from "@/lib/utils";
import { toRichHtml } from "@/lib/richText";

interface RichTextProps {
  /** Raw CMS value — HTML, escaped HTML or plain text with line breaks. */
  value: unknown;
  /** Used when `value` is empty. */
  fallback?: unknown;
  className?: string;
  /** Wrapper element. Defaults to a div; use "span" inside inline contexts. */
  as?: keyof JSX.IntrinsicElements;
  /** Render nothing at all when there is no content (default) or an empty wrapper. */
  keepEmpty?: boolean;
}

/**
 * Renders CMS-authored content as formatted HTML instead of raw tags.
 * See `src/lib/richText.ts` for the normalisation rules and `.rich-text` in
 * `index.css` for the typography that restores headings, lists and links.
 */
export default function RichText({
  value,
  fallback,
  className,
  as = "div",
  keepEmpty = false,
}: RichTextProps) {
  const html = toRichHtml(value) || toRichHtml(fallback);

  if (!html && !keepEmpty) return null;

  return createElement(as, {
    className: cn("rich-text", className),
    dangerouslySetInnerHTML: { __html: html },
  });
}
