import { UI } from "@/constants/ui";

export const SOCIAL_COPY = {
  follow: "Follow us",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
} as const;

export const SOCIAL_LINKS = [
  {
    id: "whatsapp",
    label: SOCIAL_COPY.whatsapp,
    href: UI.social.whatsapp,
  },
  {
    id: "instagram",
    label: SOCIAL_COPY.instagram,
    href: UI.social.instagram,
  },
  {
    id: "facebook",
    label: SOCIAL_COPY.facebook,
    href: UI.social.facebook,
  },
  {
    id: "youtube",
    label: SOCIAL_COPY.youtube,
    href: UI.social.youtube,
  },
] as const;

export function getActiveSocialLinks() {
  return SOCIAL_LINKS.filter((link) => Boolean(link.href.trim()));
}
