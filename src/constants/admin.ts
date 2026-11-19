import {
  CalendarOff,
  CalendarCheck2,
  Images,
  LayoutDashboard,
  MessageSquare,
  Package,
  BedDouble,
  Users,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { UI } from "@/constants/ui";

export const ADMIN_NAV = [
  {
    href: ROUTES.ADMIN.DASHBOARD,
    label: "Dashboard",
    description: "Occupancy & revenue",
    icon: LayoutDashboard,
  },
  {
    href: ROUTES.ADMIN.BOOKINGS,
    label: "Bookings",
    description: "Stays & payments",
    icon: CalendarCheck2,
  },
  {
    href: ROUTES.ADMIN.ROOMS,
    label: "Rooms",
    description: "Inventory & tariffs",
    icon: BedDouble,
  },
  {
    href: ROUTES.ADMIN.PACKAGES,
    label: "Packages",
    description: "Curated offers",
    icon: Package,
  },
  {
    href: ROUTES.ADMIN.BLOCKED,
    label: "Blocked dates",
    description: "Maintenance holds",
    icon: CalendarOff,
  },
  {
    href: ROUTES.ADMIN.GALLERY,
    label: "Gallery",
    description: "Photos & videos",
    icon: Images,
  },
  {
    href: ROUTES.ADMIN.ENQUIRIES,
    label: "Enquiries",
    description: "Guest messages",
    icon: MessageSquare,
  },
  {
    href: ROUTES.ADMIN.USERS,
    label: "Users",
    description: "Guests & admins",
    icon: Users,
  },
] as const;

export const ADMIN_COPY = {
  brand: UI.brand,
  panelLabel: "Operations",
  storefront: "View website",
  signOut: "Sign out",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  fallbackTitle: "Admin",
  fallbackDescription: "Manage Cloudora stays",
} as const;

export const ADMIN_ACTIONS = {
  add: "Add",
  edit: "Edit",
  save: "Save",
  saving: "Saving…",
  cancel: "Cancel",
  delete: "Delete",
  deleting: "Deleting…",
  confirmDelete: "Delete this item? This cannot be undone.",
  created: "Created",
  updated: "Updated",
  deleted: "Deleted",
  createFailed: "Create failed",
  updateFailed: "Update failed",
  deleteFailed: "Delete failed",
  empty: "Nothing here yet.",
  active: "Active",
  hidden: "Hidden",
  view: "View",
} as const;

export const LAYOUT = {
  container: "mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8",
} as const;
