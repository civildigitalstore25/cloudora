import { WELCOME_COPY } from "@/constants/content";
import { UI } from "@/constants/ui";

export const SITE_NAME = UI.brandFull;
export const SITE_TAGLINE = UI.tagline;

export const SEO_DEFAULTS = {
  defaultTitle: `${UI.brandFull} | Private 5 BHK Villa in Kodaikanal`,
  titleTemplate: `%s | ${UI.brand}`,
  description: WELCOME_COPY.body,
  locale: "en_IN",
  type: "website" as const,
} as const;
