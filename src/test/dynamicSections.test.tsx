import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomSectionRenderer from "@/components/CustomSectionRenderer";
import { BrowserRouter } from "react-router-dom";

describe("CustomSectionRenderer", () => {
  it("renders custom_html section with dangerous HTML", () => {
    const section = {
      id: "custom_html_1",
      name: "Custom HTML Section",
      type: "custom_html" as const,
      order: 0,
      isHidden: false,
      htmlContent: "<div data-testid='custom-div'><p>Dangerous HTML content with <strong>bold</strong></p></div>"
    };

    render(
      <BrowserRouter>
        <CustomSectionRenderer section={section} />
      </BrowserRouter>
    );

    const el = screen.getByText(/Dangerous HTML content with/);
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("Dangerous HTML content with bold");
  });

  it("does not render when isHidden is true", () => {
    const section = {
      id: "custom_hidden",
      name: "Hidden Section",
      type: "custom_html" as const,
      order: 0,
      isHidden: true,
      htmlContent: "<div data-testid='hidden-div'>Should not show</div>"
    };

    const { container } = render(
      <BrowserRouter>
        <CustomSectionRenderer section={section} />
      </BrowserRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders hero banner section with heading and CTA", () => {
    const section = {
      id: "custom_hero",
      name: "Hero Strip",
      type: "hero" as const,
      order: 0,
      isHidden: false,
      heading: "Special Ayurvedic Health Camp",
      subheading: "FREE CONSULTATION",
      description: "Join our expert doctors this Sunday.",
      ctaText: "Book Appointment",
      ctaLink: "/appointment"
    };

    render(
      <BrowserRouter>
        <CustomSectionRenderer section={section} />
      </BrowserRouter>
    );

    expect(screen.getByText("Special Ayurvedic Health Camp")).toBeInTheDocument();
    expect(screen.getByText("FREE CONSULTATION")).toBeInTheDocument();
    expect(screen.getByText("Join our expert doctors this Sunday.")).toBeInTheDocument();
    expect(screen.getByText("Book Appointment")).toBeInTheDocument();
  });

  it("renders feature cards grid section", () => {
    const section = {
      id: "custom_cards",
      name: "Custom Cards",
      type: "cards" as const,
      order: 0,
      isHidden: false,
      heading: "Our Key Strengths",
      subheading: "WHY CHOOSE US",
      items: [
        { title: "24x7 Emergency", desc: "Always available Ayurvedic emergency care." },
        { title: "Herbal Garden", desc: "Over 500 species of medicinal plants." }
      ]
    };

    render(
      <BrowserRouter>
        <CustomSectionRenderer section={section} />
      </BrowserRouter>
    );

    expect(screen.getByText("Our Key Strengths")).toBeInTheDocument();
    expect(screen.getByText("24x7 Emergency")).toBeInTheDocument();
    expect(screen.getByText("Herbal Garden")).toBeInTheDocument();
  });
});
