import { describe, expect, it } from "vitest";
import { toRichHtml, richTextToPlain, hasRichText } from "@/lib/richText";

describe("toRichHtml", () => {
  it("returns an empty string for empty values", () => {
    expect(toRichHtml(null)).toBe("");
    expect(toRichHtml(undefined)).toBe("");
    expect(toRichHtml("")).toBe("");
    expect(toRichHtml("   ")).toBe("");
  });

  it("keeps real HTML intact", () => {
    const html = toRichHtml("<p>Hello</p><ul><li>One</li></ul>");
    expect(html).toContain("<p>Hello</p>");
    expect(html).toContain("<li>One</li>");
  });

  it("turns plain text into paragraphs and line breaks", () => {
    const html = toRichHtml("First para\n\nSecond line one\nsecond line two");
    expect(html).toBe("<p>First para</p><p>Second line one<br />second line two</p>");
  });

  it("escapes stray angle brackets in plain text rather than emitting them raw", () => {
    expect(toRichHtml("5 < 10 & rising")).toBe("<p>5 &lt; 10 &amp; rising</p>");
  });

  it("decodes content that was stored double-escaped", () => {
    // This is the case that showed raw tags on the frontend.
    const html = toRichHtml("&lt;p&gt;Escaped paragraph&lt;/p&gt;");
    expect(html).toContain("<p>Escaped paragraph</p>");
    expect(html).not.toContain("&lt;p&gt;");
  });

  it("wraps an unwrapped run of inline markup in a paragraph", () => {
    expect(toRichHtml("Line one<br>Line two")).toMatch(/^<p>/);
  });

  it("strips scripts and inline event handlers", () => {
    const html = toRichHtml('<p onclick="steal()">Hi</p><script>alert(1)</script>');
    expect(html).not.toContain("script");
    expect(html).not.toContain("onclick");
    expect(html).toContain("Hi");
  });

  it("drops javascript: URLs but keeps ordinary links", () => {
    expect(toRichHtml('<a href="javascript:alert(1)">x</a>')).not.toContain("javascript:");
    expect(toRichHtml('<a href="/about">About</a>')).toContain('href="/about"');
  });

  it("adds rel=noopener to links that open a new tab", () => {
    expect(toRichHtml('<a href="https://x.test" target="_blank">x</a>')).toContain('rel="noopener noreferrer"');
  });

  it("keeps the classes that admin section templates rely on", () => {
    expect(toRichHtml('<section class="py-20 bg-slate-50">Hi</section>')).toContain('class="py-20 bg-slate-50"');
  });

  it("keeps form controls used by the newsletter section template", () => {
    const html = toRichHtml('<form><input type="email" placeholder="Email"><button type="submit">Go</button></form>');
    expect(html).toContain("<form>");
    expect(html).toContain('type="email"');
    expect(html).toContain("<button");
  });

  it("flattens arrays of values", () => {
    expect(toRichHtml(["<p>A</p>", "<p>B</p>"])).toBe("<p>A</p><p>B</p>");
  });
});

describe("richTextToPlain", () => {
  it("reduces markup to readable text for headings and alt attributes", () => {
    expect(richTextToPlain("<p>Hello <strong>there</strong></p>")).toBe("Hello there");
  });

  it("handles plain text unchanged", () => {
    expect(richTextToPlain("Just words")).toBe("Just words");
  });

  it("returns an empty string for empty input", () => {
    expect(richTextToPlain(undefined)).toBe("");
  });
});

describe("hasRichText", () => {
  it("is false for markup with no readable content", () => {
    expect(hasRichText("<p></p>")).toBe(false);
    expect(hasRichText("<p><br></p>")).toBe(false);
  });

  it("is true when there is text to show", () => {
    expect(hasRichText("<p>Something</p>")).toBe(true);
  });
});
