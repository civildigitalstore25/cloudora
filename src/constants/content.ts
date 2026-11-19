import { ASSETS } from "@/constants/assets";
import { UI } from "@/constants/ui";

export const SPECIALITIES = [
  "Premium 5 BHK luxury villa",
  "15 guest accommodation",
  "Beautiful valley and mountain views",
  "Separate private car parking",
  "Free high-speed Wi-Fi",
  "65-inch Smart TV",
  "Spacious sofa lounge",
  "Dining area",
  "Modern modular kitchen",
  "Separate campfire area",
  "24-hour hot water",
  "Mini bar setup",
  "Power backup",
  "Caretaker support",
] as const;

export const IDEAL_FOR = [
  "Family vacations and reunions",
  "Friends' get-togethers",
  "Corporate team outings",
  "Small group meetings",
  "Birthday celebrations and special occasions",
] as const;

export const COMMON_FACILITIES = [
  "Accommodation for up to 15 guests",
  "Beautiful valley and mountain views",
  "Free high-speed Wi-Fi with individual bedroom routers",
  "Separate private car parking",
  "24-hour hot water facility",
  "Inverter power backup for essential lighting",
  "Dedicated caretaker assistance",
] as const;

export const WELCOME_COPY = {
  title: "Welcome to Cloudora Luxury Homestay, Kodaikanal!",
  body: "Experience a memorable holiday amidst the beautiful hills and scenic valley views of Kodaikanal. Cloudora is a spacious 5 BHK luxury homestay, thoughtfully designed for families, friends and corporate groups, accommodating up to 15 guests.",
  closing:
    "At Cloudora, every space is designed to bring people together while allowing you to relax and enjoy the beauty of nature.",
  englishTagline: UI.tagline,
  tamilTagline: "இயற்கையை ரசிப்போம்... நினைவுகளை உருவாக்குவோம்!",
} as const;

export const TESTIMONIALS = [
  {
    id: "abhilash",
    name: "Abhilash G P",
    date: "November 16, 2026",
    body: "Excellent stay at Cloudora feels like homely atmosphere and room service is very good, especially Sukumar proprietor of Cloudora is very friendly and caring. Our visit is looking forward to stay again in Cloudora.",
  },
  {
    id: "fathima",
    name: "Fathima Shadha",
    date: "November 13, 2026",
    body: "Had a wonderful experience at Cloudora. Looking forward to choosing Cloudora again on our next visit to Kodaikanal!",
  },
] as const;

export const PACKAGES_CONTENT = [
  {
    id: "signature",
    slug: "signature-villa-stay",
    name: "Cloudora Luxury Homestay Stay",
    shortDescription:
      "A private 5 BHK luxury villa in Kodaikanal for families, friends and corporate groups — up to 15 guests.",
    description:
      "Book Cloudora for a memorable holiday amidst the hills and valley views of Kodaikanal. Spacious bedrooms, lounge, dining, campfire area and caretaker support throughout your stay.",
    images: [
      ASSETS.AMENITIES[2],
      ASSETS.EXTERIOR[1],
      ASSETS.AMENITIES[0],
    ],
    includes: [
      "Premium 5 BHK luxury villa",
      "Up to 15 guests",
      "Valley and mountain views",
      "Private car parking",
      "High-speed Wi-Fi",
      "Caretaker support",
    ],
    enquiryPhones: [
      { label: "Cloudora – Kodaikanal", phone: UI.phonePrimary },
      { label: "Also available", phone: UI.phoneSecondary },
    ],
    priceLabel: "Tariff on enquiry",
  },
  {
    id: "sai-travels",
    slug: "sai-travels-theni-kodai",
    name: "Sai Travels to Cloudora (Theni to Kodaikanal)",
    shortDescription:
      "Travel together. Stay together. Celebrate together — exclusive Theni to Kodaikanal partnership.",
    description:
      "An exclusive travel partnership between Sai Travels, Theni and Cloudora, Kodaikanal. Advance booking required. Package pricing and inclusions will be confirmed based on group size, travel dates and availability.",
    images: [
      ASSETS.EXPERIENCE_GATHER,
      ASSETS.EXPERIENCE_CAMPFIRE,
      ASSETS.EXPERIENCE_LOCAL,
    ],
    includes: [
      "Transportation from Theni to Kodaikanal and return",
      "Comfortable luxury group accommodation",
      "Local Kodaikanal sightseeing experience",
      "Campfire and music entertainment at Cloudora",
      "Singing, dancing and fun with your group",
      "Complimentary breakfast at Cloudora",
    ],
    enquiryPhones: [
      { label: "Cloudora – Kodaikanal", phone: UI.phonePrimary },
      { label: "Sai Travels – Theni", phone: UI.saiTravelsPhone },
    ],
    priceLabel: "On enquiry",
  },
] as const;

export const ABOUT_META = {
  companyName: UI.brandFull,
  yearEstablished: "2026",
  natureOfBusiness: "Homestay",
  proprietor: UI.proprietor,
} as const;
