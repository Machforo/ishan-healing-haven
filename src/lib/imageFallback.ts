/**
 * Global safety net for images that fail to load.
 *
 * A number of legacy image URLs (dead Unsplash photo IDs, WordPress uploads that
 * now return 403) are still referenced as fallbacks in the components and in
 * older CMS records. Browsers render those as a torn-image icon plus the alt
 * text, which looks broken next to the rest of the design.
 *
 * This listens for image load errors during the capture phase — the only way to
 * catch them globally, since `error` on <img> does not bubble — and swaps the
 * element for a neutral muted panel that keeps the same box in the layout.
 *
 * Fixing the underlying URLs is still the right answer; this stops a stale URL
 * from disfiguring a page in the meantime.
 */
const HANDLED = 'data-img-failed';

function markFailed(img: HTMLImageElement) {
  if (img.hasAttribute(HANDLED)) return;
  img.setAttribute(HANDLED, 'true');

  // Keep the element (and its sizing classes) in place; just stop showing the
  // browser's broken-image affordance.
  img.style.setProperty('background-color', 'hsl(var(--muted))');
  img.style.setProperty('object-fit', 'cover');
  img.style.setProperty('color', 'transparent');
  // A 1x1 transparent GIF: renders nothing, never errors again.
  img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
}

export function installImageFallback() {
  if (typeof window === 'undefined') return;
  document.addEventListener(
    'error',
    (event) => {
      const target = event.target as HTMLElement | null;
      if (target && target.tagName === 'IMG') markFailed(target as HTMLImageElement);
    },
    true // capture — image errors do not bubble
  );
}
