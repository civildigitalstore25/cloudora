import { ASSETS } from "@/constants/assets";
import { ROUTES } from "@/constants/routes";
import { WELCOME_COPY } from "@/constants/content";
import { UI } from "@/constants/ui";

export const NAV_LINKS = [
  { label: "Home", href: ROUTES.HOME },
  { label: "The Villa", href: ROUTES.VILLA },
  { label: "Packages", href: ROUTES.PACKAGES },
  { label: "Experiences", href: ROUTES.EXPERIENCES },
  { label: "Gallery", href: ROUTES.GALLERY },
  { label: "Contact", href: ROUTES.CONTACT },
] as const;

export const HERO_COPY = {
  eyebrow: "Private 5 BHK Villa · Kodaikanal",
  titleLine1: "Escape to the Hills.",
  titleLine2Before: "",
  titleLine2Italic: "Stay",
  titleLine2After: " in Luxury.",
  body: WELCOME_COPY.body,
  primaryCta: "Explore packages",
  secondaryCta: "Discover Cloudora",
} as const;

export const INTRO_COPY = {
  eyebrow: "A place to come together",
  title: "Your private luxury escape in Kodaikanal",
  body: WELCOME_COPY.body,
  closing: WELCOME_COPY.closing,
  stats: [
    { value: "5", label: "BHK", sub: "Whole-villa privacy" },
    { value: "15", label: "guests", sub: "Families, friends & groups" },
    { value: "2", label: "floors", sub: "Space to gather and unwind" },
  ],
  badge: "15 Guests, one private villa",
} as const;

export const AMENITIES = [
  { id: "bedrooms", label: "Premium 5 BHK luxury villa", icon: "bed" },
  { id: "guests", label: "15 guest accommodation", icon: "users" },
  { id: "views", label: "Valley & mountain views", icon: "mountain" },
  { id: "parking", label: "Separate private car parking", icon: "car" },
  { id: "wifi", label: "Free high-speed Wi-Fi", icon: "wifi" },
  { id: "tv", label: "65-inch Smart TV", icon: "tv" },
  { id: "lounge", label: "Spacious sofa lounge", icon: "sofa" },
  { id: "dining", label: "Dining area", icon: "utensils" },
  { id: "kitchen", label: "Modern modular kitchen", icon: "utensils" },
  { id: "campfire", label: "Separate campfire area", icon: "flame" },
  { id: "hotwater", label: "24-hour hot water", icon: "droplets" },
  { id: "minibar", label: "Mini bar setup", icon: "heart" },
  { id: "power", label: "Power backup", icon: "zap" },
  { id: "caretaker", label: "Caretaker support", icon: "heart" },
] as const;

export const AMENITIES_COPY = {
  eyebrow: "Our specialities",
  title: "Everything you need for a memorable stay",
  body: "Thoughtfully designed spaces and comforts so your group can slow down, gather and enjoy Kodaikanal together.",
} as const;

export const VILLA_FLOORS = [
  {
    id: "ground",
    label: "Ground floor",
    title: "3 spacious bedrooms",
    image: ASSETS.GROUND_FLOOR,
    features: [
      "King-size beds and attached bathrooms",
      "32-inch TV in each bedroom",
      "Modern modular kitchen with self-cooking (on request)",
      "Separate outdoor campfire area",
      "Dedicated parking facility",
    ],
  },
  {
    id: "first",
    label: "First floor",
    title: "2 bedrooms & executive lounge",
    image: ASSETS.FIRST_FLOOR,
    features: [
      "King-size beds and attached bathrooms",
      "32-inch TV in each bedroom",
      "Comfortable dining area",
      "Spacious sofa lounge for relaxation",
      "65-inch Smart TV for entertainment",
      "Stylish mini bar setup",
      "Executive lounge for gatherings",
    ],
  },
] as const;

export const VILLA_COPY = {
  eyebrow: "The Villa",
  title: "Two floors. One beautiful stay.",
  subtitle: WELCOME_COPY.closing,
} as const;

export const EXPERIENCES = [
  {
    id: "sightseeing",
    title: "Local Kodaikanal sightseeing",
    body: "Sightseeing experiences shaped around the quiet, beautiful corners of Kodaikanal.",
    image: ASSETS.EXPERIENCE_LOCAL,
  },
  {
    id: "campfire",
    title: "Campfire & music",
    body: "Campfire and music entertainment at Cloudora — sing, dance and celebrate with your group.",
    image: ASSETS.EXPERIENCE_CAMPFIRE,
  },
  {
    id: "gather",
    title: "Gather & celebrate",
    body: "Family reunions, friends' get-togethers, corporate outings and birthday celebrations.",
    image: ASSETS.EXPERIENCE_GATHER,
  },
] as const;

export const EXPERIENCES_COPY = {
  eyebrow: "Experiences",
  title: "Make the hills entirely your own",
  enquire: "Enquire",
} as const;

export const PACKAGE_TEASER = {
  metaLeft: "Flexible stay",
  metaRight: `Up to ${UI.maxGuests} guests`,
  title: "Cloudora Luxury Homestay Stay",
  body: "A private 5 BHK luxury villa for families, friends and corporate groups, surrounded by the hills of Kodaikanal.",
  tariffLabel: "Tariff",
  tariffValue: "On enquiry",
  cta: "View details",
} as const;

export const GALLERY_COPY = {
  eyebrow: "A glimpse of Cloudora",
  title: "Room to breathe",
  body: "Bedrooms, living spaces, exteriors and evenings at our private Kodaikanal villa.",
} as const;

export const CTA_COPY = {
  eyebrow: "Your mountain escape awaits",
  title: UI.tagline,
  tamil: UI.taglineTamil,
  button: "Plan your stay",
} as const;

export const FOOTER_COPY = {
  tagline: UI.tagline,
  tamil: UI.taglineTamil,
  description: WELCOME_COPY.body,
  visit: "Visit",
  connect: "Connect",
  directions: "Get directions →",
  terms: "Terms",
  privacy: "Privacy",
  proprietor: `Proprietor: ${UI.proprietor}`,
} as const;

export const TESTIMONIALS_COPY = {
  eyebrow: "Guest feedback",
  title: "Stays that feel like home",
} as const;
