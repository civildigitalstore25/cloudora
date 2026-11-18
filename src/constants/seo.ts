import { UI } from "@/constants/ui";

export const SITE_NAME = UI.brandFull;
export const SITE_TAGLINE = UI.tagline;

export const SEO_DEFAULTS = {
  defaultTitle: `${UI.brandFull} | Private 5 BHK Villa in Kodaikanal`,
  titleTemplate: `%s | ${UI.brand}`,
  description:
    "Book Cloudora Luxury Homestay — a private 5 BHK mountain villa in Kodaikanal for families, friends and corporate groups. Up to 15 guests, valley views, and caretaker support.",
  locale: "en_IN",
  type: "website" as const,
} as const;
