import { ASSETS } from "@/constants/assets";

export const GALLERY_PAGE = {
  eyebrow: "A glimpse of Cloudora",
  title: "Room to breathe",
  body: "Bedrooms, living spaces, exteriors and evenings at our private Kodaikanal villa.",
  open: "View",
  videosTitle: "Villa films",
  of: "of",
} as const;

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "rooms", label: "Rooms" },
  { id: "living", label: "Living" },
  { id: "exterior", label: "Exterior" },
  { id: "amenities", label: "Amenities" },
  { id: "views", label: "Views" },
] as const;

export type GalleryCategoryId =
  (typeof GALLERY_CATEGORIES)[number]["id"];

export type GalleryItem = {
  id: string;
  src: string;
  title: string;
  category: Exclude<GalleryCategoryId, "all">;
  span?: "tall" | "wide" | "normal";
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g01", src: ASSETS.GALLERY[0], title: "Lounge calm", category: "living", span: "wide" },
  { id: "g02", src: ASSETS.GALLERY[1], title: "Interior light", category: "living" },
  { id: "g03", src: ASSETS.GALLERY[14], title: "Bedroom balcony", category: "rooms", span: "tall" },
  { id: "g04", src: ASSETS.GALLERY[15], title: "Desk & wardrobe", category: "rooms" },
  { id: "g05", src: ASSETS.GALLERY[18], title: "Living & dining", category: "living", span: "wide" },
  { id: "g06", src: ASSETS.GALLERY[20], title: "Modular kitchen", category: "amenities" },
  { id: "g07", src: ASSETS.GALLERY[13], title: "Campfire terrace", category: "amenities", span: "tall" },
  { id: "g08", src: ASSETS.GALLERY[35], title: "Villa entrance", category: "exterior", span: "wide" },
  { id: "g09", src: ASSETS.GALLERY[40], title: "Facade flowers", category: "exterior" },
  { id: "g10", src: ASSETS.GALLERY[47], title: "Balcony facade", category: "exterior" },
  { id: "g11", src: ASSETS.GALLERY[48], title: "Neighbourhood hills", category: "views", span: "wide" },
  { id: "g12", src: ASSETS.GALLERY[5], title: "Hill mist", category: "views", span: "tall" },
  { id: "g13", src: ASSETS.GALLERY[21], title: "Red accent suite", category: "rooms" },
  { id: "g14", src: ASSETS.GALLERY[25], title: "Balcony desk view", category: "rooms", span: "tall" },
  { id: "g15", src: ASSETS.GALLERY[32], title: "Open living", category: "living" },
  { id: "g16", src: ASSETS.GALLERY[16], title: "Bathroom vanity", category: "amenities" },
  { id: "g17", src: ASSETS.GALLERY[19], title: "Rain shower", category: "amenities" },
  { id: "g18", src: ASSETS.GALLERY[17], title: "Private parking", category: "exterior" },
  { id: "g19", src: ASSETS.GALLERY[23], title: "Front entrance", category: "exterior", span: "wide" },
  { id: "g20", src: ASSETS.GALLERY[37], title: "Breakfast bar", category: "living" },
  { id: "g21", src: ASSETS.GALLERY[44], title: "Common lounge", category: "living" },
  { id: "g22", src: ASSETS.GALLERY[49], title: "Mountain bedroom", category: "rooms", span: "tall" },
  { id: "g23", src: ASSETS.GALLERY[52], title: "Suite hallway", category: "rooms" },
  { id: "g24", src: ASSETS.GALLERY[7], title: "Ground floor stay", category: "rooms" },
  { id: "g25", src: ASSETS.GALLERY[8], title: "First floor calm", category: "rooms" },
  { id: "g26", src: ASSETS.GALLERY[9], title: "Whole villa feel", category: "exterior" },
  { id: "g27", src: ASSETS.GALLERY[28], title: "Stone bathroom", category: "amenities" },
  { id: "g28", src: ASSETS.GALLERY[41], title: "Patterned bath", category: "amenities" },
  { id: "g29", src: ASSETS.GALLERY[4], title: "Comfort stay", category: "living" },
  { id: "g30", src: ASSETS.GALLERY[12], title: "Gather evenings", category: "amenities", span: "wide" },
];
