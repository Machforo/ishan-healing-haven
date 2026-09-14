import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MediaGalleryImage {
  url?: string;
  src?: string;
  caption?: string;
  alt?: string;
}

interface MediaGalleryProps {
  images?: MediaGalleryImage[] | null;
  /** Optional heading rendered above the grid. */
  title?: string;
  /** Fallback images used when the CMS has none yet. */
  fallback?: MediaGalleryImage[];
  className?: string;
  /** Base alt text; the image index is appended when a caption is missing. */
  altPrefix?: string;
  /** Turn the grid into a lightbox. Defaults to on. */
  lightbox?: boolean;
}

/**
 * Renders however many images the CMS holds — one, two, or twenty — without the
 * layout falling apart. The column count is chosen from the image count so a
 * single image still reads as a feature image and large sets stay on a tidy grid.
 */
export default function MediaGallery({
  images,
  title,
  fallback,
  className,
  altPrefix = "Gallery image",
  lightbox = true,
}: MediaGalleryProps) {
  const source = (images && images.length > 0 ? images : fallback) || [];
  const items = source
    .map((img) => (typeof img === "string" ? { url: img } : img))
    .filter((img) => img && (img.url || img.src));

  const [openAt, setOpenAt] = useState<number | null>(null);

  useEffect(() => {
    if (openAt === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenAt(null);
      if (e.key === "ArrowRight") setOpenAt((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpenAt((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openAt, items.length]);

  if (items.length === 0) return null;

  // Column count follows the number of images so nothing is stretched or orphaned.
  const gridCols =
    items.length === 1 ? "grid-cols-1"
      : items.length === 2 ? "grid-cols-1 sm:grid-cols-2"
        : items.length === 3 ? "grid-cols-2 sm:grid-cols-3"
          : items.length === 4 ? "grid-cols-2 lg:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  const aspect = items.length === 1 ? "aspect-[16/7]" : items.length === 2 ? "aspect-[4/3]" : "aspect-[4/3]";

  return (
    <div className={cn("space-y-5", className)}>
      {title && <h3 className="text-xl md:text-2xl font-bold text-foreground">{title}</h3>}

      <div className={cn("grid gap-4", gridCols)}>
        {items.map((img, i) => {
          const src = img.url || img.src;
          const alt = img.alt || img.caption || `${altPrefix} ${i + 1}`;
          const Wrapper = lightbox ? "button" : "div";
          return (
            <Wrapper
              key={`${src}-${i}`}
              {...(lightbox ? { type: "button" as const, onClick: () => setOpenAt(i), "aria-label": `Open ${alt}` } : {})}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-card shadow-sm text-left",
                aspect,
                lightbox && "cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              )}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { (e.currentTarget.closest("button, div") as HTMLElement | null)?.style.setProperty("display", "none"); }}
              />
              {img.caption && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {img.caption}
                </span>
              )}
            </Wrapper>
          );
        })}
      </div>

      {lightbox && openAt !== null && items[openAt] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 animate-in fade-in duration-200"
          onClick={() => setOpenAt(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setOpenAt(null)}
            className="absolute top-5 right-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpenAt((i) => (i === null ? i : (i - 1 + items.length) % items.length)); }}
                className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpenAt((i) => (i === null ? i : (i + 1) % items.length)); }}
                className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <figure className="max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[openAt].url || items[openAt].src}
              alt={items[openAt].alt || items[openAt].caption || `${altPrefix} ${openAt + 1}`}
              className="max-h-[80vh] w-auto mx-auto rounded-lg object-contain"
            />
            {items[openAt].caption && (
              <figcaption className="mt-3 text-center text-sm text-white/80">{items[openAt].caption}</figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  );
}
