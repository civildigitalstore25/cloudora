import { ASSETS } from "@/constants/assets";
import { UI } from "@/constants/ui";

function siteBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}

export const EMAIL_THEME = {
  primary: "#1A302B",
  primaryForeground: "#FFFFFF",
  accent: "#C5A373",
  cream: "#F9F8F3",
  dark: "#0B2D1E",
  muted: "#6B6B6B",
  border: "#E5E2D9",
  card: "#FFFFFF",
  fontSans: "'Fraunces', Georgia, 'Times New Roman', serif",
  fontBody: "'Nunito Sans', Arial, Helvetica, sans-serif",
  logoUrl: `${siteBase()}${ASSETS.LOGO_PNG}`,
} as const;

export function getEmailSiteUrl(path = ""): string {
  return `${siteBase()}${path.startsWith("/") ? path : path ? `/${path}` : ""}`;
}

export const EMAIL_COPY = {
  bookingConfirmSubject: `${UI.brand} — booking confirmed`,
  bookingAdminSubject: (ref: string) => `${UI.brand} — new booking ${ref}`,
  statusSubject: (status: string) =>
    `${UI.brand} — booking ${status.toLowerCase()}`,
  contactSubject: (name: string) => `${UI.brand} — enquiry from ${name}`,
  resetSubject: `${UI.brand} — reset your password`,
  contactThanks: "Thanks — we received your message and will reply soon.",
  contactError: "Could not send your message. Please call or WhatsApp us.",
  contactSubmit: "Send message",
  contactSending: "Sending…",
  contactName: "Your name",
  contactEmail: "Email",
  contactPhone: "Phone",
  contactMessage: "Message",
  footerTagline: UI.tagline,
} as const;

export type EmailSocialLink = {
  label: string;
  href: string;
};

function whatsappHref(): string {
  const n = UI.whatsappNumber.replace(/\D/g, "");
  return n ? `https://wa.me/${n}` : "";
}

export function getEmailSocialLinks(): EmailSocialLink[] {
  const links: EmailSocialLink[] = [
    { label: "WhatsApp", href: whatsappHref() },
    { label: "Instagram", href: UI.social.instagram },
    { label: "Facebook", href: UI.social.facebook },
    { label: "YouTube", href: UI.social.youtube },
  ];
  return links.filter((l) => Boolean(l.href));
}

export function getAdminNotifyEmail(): string {
  return (
    process.env.ADMIN_NOTIFY_EMAIL?.trim() ||
    process.env.ADMIN_EMAIL?.trim() ||
    UI.email
  );
}
