"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HeaderUserMenu } from "@/components/layout/Header/HeaderUserMenu";
import { MobileNav } from "@/components/layout/Header/MobileNav";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/constants/assets";
import { USER_ROLES } from "@/constants/auth";
import { HEADER_COPY } from "@/constants/header";
import { NAV_LINKS } from "@/constants/home";
import { ROUTES } from "@/constants/routes";
import { UI } from "@/constants/ui";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isHome = pathname === ROUTES.HOME;
  const isAdmin = session?.user?.role === USER_ROLES.ADMIN;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "inset-x-0 top-0 z-50 transition-all duration-300",
          isHome ? "absolute" : "relative bg-primary-strong text-white",
          isHome &&
            scrolled &&
            "fixed bg-primary-strong/95 shadow-lg backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
          <Link
            href={ROUTES.HOME}
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          >
            <Image
              src={ASSETS.LOGO}
              alt={UI.brandFull}
              width={44}
              height={44}
              className="h-9 w-9 rounded-full bg-white/90 object-contain p-0.5 sm:h-11 sm:w-11"
            />
            <span className="truncate font-display text-sm font-semibold tracking-[0.14em] text-accent uppercase sm:text-base">
              {UI.brand}
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[11px] font-semibold tracking-[0.16em] text-white/90 uppercase transition-colors hover:text-white xl:text-xs",
                  pathname === link.href && "text-accent",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <HeaderUserMenu light={isHome && !scrolled} />
            <Button asChild variant="accent" size="sm">
              <Link href={ROUTES.BOOK}>{HEADER_COPY.bookStay}</Link>
            </Button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <HeaderUserMenu light={isHome && !scrolled} />
            <button
              type="button"
              className="rounded-full p-2 text-white"
              onClick={() => setOpen(true)}
              aria-label={HEADER_COPY.openMenu}
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open && mounted
        ? createPortal(
            <MobileNav
              pathname={pathname}
              isAdmin={isAdmin}
              signedIn={Boolean(session)}
              onClose={() => setOpen(false)}
            />,
            document.body,
          )
        : null}
    </>
  );
}
