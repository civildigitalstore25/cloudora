import { ASSETS } from "@/constants/assets";
import { ROUTES } from "@/constants/routes";
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
  body: "Experience comfort, privacy and unforgettable mountain views at Cloudora Luxury Homestay.",
  primaryCta: "Explore packages",
  secondaryCta: "Discover Cloudora",
} as const;

export const INTRO_COPY = {
  eyebrow: "A place to come together",
  title: "Your private luxury escape in Kodaikanal",
  body: "Cloudora is a spacious 5 BHK luxury villa created for families, friends and corporate groups who value privacy, comfort and time in nature. Wake to cool mountain air, gather in generous lounges and let our caretaker make every stay feel effortless.",
  stats: [
    { value: "5", label: "BHK", sub: "Whole-villa privacy" },
    { value: "2", label: "floors", sub: "Space to gather and unwind" },
  ],
  badge: "15 Guests, one private villa",
} as const;

export const AMENITIES = [
  { id: "bedrooms", label: "5 spacious bedrooms", icon: "bed" },
  { id: "guests", label: "Up to 15 guests", icon: "users" },
  { id: "views", label: "Valley & mountain views", icon: "mountain" },
  { id: "parking", label: "Private car parking", icon: "car" },
  { id: "wifi", label: "High-speed Wi-Fi", icon: "wifi" },
  { id: "kitchen", label: "Modular kitchen", icon: "utensils" },
  { id: "campfire", label: "Campfire area", icon: "flame" },
  { id: "tv", label: "65-inch Smart TV", icon: "tv" },
  { id: "caretaker", label: "Caretaker support", icon: "heart" },
  { id: "hotwater", label: "24-hour hot water", icon: "droplets" },
  { id: "power", label: "Power backup", icon: "zap" },
  { id: "lounge", label: "Dining & lounge", icon: "sofa" },
] as const;

export const AMENITIES_COPY = {
  eyebrow: "Everything you need",
  title: "Thoughtful comfort, everywhere",
  body: "Modern amenities are woven quietly into every corner, leaving you free to slow down and be together.",
} as const;

export const VILLA_FLOORS = [
  {
    id: "ground",
    label: "Ground floor",
    title: "3 spacious bedrooms",
    image: ASSETS.GROUND_FLOOR,
    features: [
      "King-size beds & attached baths",
      "Modular self-cooking kitchen",
      "32-inch TV in each room",
      "Campfire area & dedicated parking",
    ],
  },
  {
    id: "first",
    label: "First floor",
    title: "2 bedrooms & executive lounge",
    image: ASSETS.FIRST_FLOOR,
    features: [
      "King-size beds & attached baths",
      "65-inch Smart TV",
      "Dining and sofa lounge",
      "Mini bar setup",
    ],
  },
] as const;

export const VILLA_COPY = {
  eyebrow: "The Villa",
  title: "Two floors. One beautiful stay.",
} as const;

export const EXPERIENCES = [
  {
    id: "local",
    title: "Local discovery",
    body: "Sightseeing routes shaped around the quiet, beautiful corners of Kodaikanal.",
    image: ASSETS.EXPERIENCE_LOCAL,
  },
  {
    id: "jeep",
    title: "Jeep trails",
    body: "Off-road adventures through mountain tracks, arranged with trusted local partners.",
    image: ASSETS.EXPERIENCE_JEEP,
  },
  {
    id: "gather",
    title: "Gather & celebrate",
    body: "Campfires, birthdays and intimate occasions thoughtfully arranged for your group.",
    image: ASSETS.EXPERIENCE_GATHER,
  },
] as const;

export const EXPERIENCES_COPY = {
  title: "Make the hills entirely your own",
  enquire: "Enquire",
} as const;

export const PACKAGE_TEASER = {
  metaLeft: "Flexible stay",
  metaRight: `Up to ${UI.maxGuests} guests`,
  title: "Cloudora Signature Villa Stay",
  body: "A private 5 BHK villa experience for families, friends and corporate groups, surrounded by the quiet hills of Kodaikanal.",
  tariffLabel: "Tariff",
  tariffValue: "On request",
  cta: "View details",
} as const;

export const GALLERY_COPY = {
  eyebrow: "A glimpse of Cloudora",
  title: "Room to breathe",
} as const;

export const CTA_COPY = {
  eyebrow: "Your mountain escape awaits",
  title: "Come for the view. Stay for the feeling.",
  button: "Plan your stay",
} as const;

export const FOOTER_COPY = {
  tagline: UI.tagline,
  description:
    "A private 5 BHK mountain villa crafted for families, friends and meaningful stays in Kodaikanal.",
  visit: "Visit",
  connect: "Connect",
  directions: "Get directions →",
  terms: "Terms",
  privacy: "Privacy",
} as const;
