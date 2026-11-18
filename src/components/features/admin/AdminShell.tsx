"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  { href: ROUTES.ADMIN.DASHBOARD, label: "Dashboard" },
  { href: ROUTES.ADMIN.BOOKINGS, label: "Bookings" },
  { href: ROUTES.ADMIN.ROOMS, label: "Rooms" },
  { href: ROUTES.ADMIN.PACKAGES, label: "Packages" },
  { href: ROUTES.ADMIN.BLOCKED, label: "Blocked dates" },
  { href: ROUTES.ADMIN.GALLERY, label: "Gallery" },
  { href: ROUTES.ADMIN.ENQUIRIES, label: "Enquiries" },
  { href: ROUTES.ADMIN.USERS, label: "Users" },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-cream-dark">
      <div className="border-b border-border bg-primary-strong text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href={ROUTES.ADMIN.DASHBOARD} className="font-display text-xl">
            Cloudora Admin
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/70">{session?.user?.email}</span>
            <Link href={ROUTES.HOME} className="text-accent">
              View site
            </Link>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: ROUTES.HOME })}
              className="text-white/80"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl bg-card p-3 shadow-sm">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium text-muted hover:bg-primary-soft hover:text-primary",
                  pathname.startsWith(link.href) &&
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
