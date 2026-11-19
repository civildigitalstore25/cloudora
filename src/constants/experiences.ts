import { ASSETS } from "@/constants/assets";
import { ROUTES } from "@/constants/routes";

export const EXPERIENCES_PAGE = {
  eyebrow: "Experiences",
  title: "Make the hills entirely your own",
  body: "From quiet valley views to campfire nights and group celebrations — Cloudora is designed for memorable Kodaikanal stays.",
  enquireCta: "Plan an experience",
  enquireHref: ROUTES.CONTACT,
} as const;

export const EXPERIENCE_ITEMS = [
  {
    id: "sightseeing",
    number: "01",
    title: "Local Kodaikanal sightseeing",
    body: "Quiet corners, misty viewpoints and local highlights shaped around your group’s pace — not a rushed checklist.",
    details: [
      "Custom routes for families and friends",
      "Valley and pine-forest viewpoints",
      "Ideal half-day or full-day outings",
    ],
    image: ASSETS.EXPERIENCE_LOCAL,
  },
  {
    id: "campfire",
    number: "02",
    title: "Campfire & music",
    body: "Evenings around the private campfire terrace — sing, dance and unwind under cool hill-station skies.",
    details: [
      "Dedicated outdoor campfire area",
      "Music and group entertainment",
      "Perfect after a day in the hills",
    ],
    image: ASSETS.EXPERIENCE_CAMPFIRE,
  },
  {
    id: "gather",
    number: "03",
    title: "Gather & celebrate",
    body: "Family reunions, friends’ get-togethers, corporate outings and birthdays in a private 5 BHK villa for up to 15 guests.",
    details: [
      "Whole-villa privacy for your group",
      "Lounge, dining and outdoor spaces",
      "Caretaker support throughout your stay",
    ],
    image: ASSETS.EXPERIENCE_GATHER,
  },
  {
    id: "jeep",
    number: "04",
    title: "Jeep & hillside trails",
    body: "Pair your stay with scenic drives and hillside trails — a favourite add-on for groups who want more of Kodaikanal’s outdoors.",
    details: [
      "Scenic jeep-friendly routes",
      "Great for photo stops and views",
      "Arrange with our team in advance",
    ],
    image: ASSETS.EXPERIENCE_JEEP,
  },
] as const;

export const CONTACT_PAGE = {
  eyebrow: "Get in touch",
  title: "Plan your Cloudora stay",
  body: "Reach us for bookings, packages, experiences and directions to our private villa in Kodaikanal.",
  formTitle: "Send a message",
  paymentTitle: "Payment details",
  directions: "Get directions",
  whatsapp: "WhatsApp",
  visitLabel: "Visit",
  callLabel: "Call",
  writeLabel: "Write",
  hostLabel: "Host",
} as const;
