"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/constants/assets";
import { NAV_LINKS } from "@/constants/home";
import { ROUTES } from "@/constants/routes";
import { UI } from "@/constants/ui";
import { USER_ROLES } from "@/constants/auth";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const isHome = pathname === ROUTES.HOME;

  return (
    <header
      className={cn(
        "absolute inset-x-0 top-0 z-50",
        !isHome && "relative bg-primary-strong text-white",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href={ROUTES.HOME} className="flex items-center gap-3">
          <Image
            src={ASSETS.LOGO}
            alt={UI.brandFull}
            width={44}
            height={44}
            className="rounded-full bg-white/90 object-contain p-0.5"
          />
          <span
            className={cn(
              "font-display text-sm font-semibold tracking-[0.14em] uppercase sm:text-base",
              isHome ? "text-accent" : "text-accent",
            )}
          >
            {UI.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs font-semibold tracking-[0.16em] uppercase transition-colors",
                isHome ? "text-white/90 hover:text-white" : "text-white/90 hover:text-white",
                pathname === link.href && "text-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={session ? ROUTES.BOOKINGS : ROUTES.LOGIN}
            className={cn(
              "text-xs font-semibold tracking-[0.14em] uppercase",
              isHome ? "text-white" : "text-white",
            )}
          >
            My booking
          </Link>
          {session?.user?.role === USER_ROLES.ADMIN ? (
            <Link
              href={ROUTES.ADMIN.DASHBOARD}
              className="text-xs font-semibold tracking-[0.14em] uppercase text-accent"
            >
              Admin
            </Link>
          ) : null}
          {session ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: ROUTES.HOME })}
              className="text-xs font-semibold tracking-[0.14em] uppercase text-white/80"
            >
              Sign out
            </button>
          ) : null}
          <Button asChild variant="accent" size="sm">
            <Link href={ROUTES.BOOK}>Book your stay</Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-primary-strong px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold tracking-[0.12em] uppercase text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={session ? ROUTES.BOOKINGS : ROUTES.LOGIN}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold tracking-[0.12em] uppercase text-white"
            >
              My booking
            </Link>
            <Button asChild variant="accent" className="mt-2">
              <Link href={ROUTES.BOOK} onClick={() => setOpen(false)}>
                Book your stay
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
