"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HEADER_COPY } from "@/constants/header";
import { NAV_LINKS } from "@/constants/home";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils/cn";

export function MobileNav({
  pathname,
  isAdmin,
  signedIn,
  onClose,
}: {
  pathname: string;
  isAdmin: boolean;
  signedIn: boolean;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] lg:hidden" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        aria-label={HEADER_COPY.closeMenu}
        onClick={onClose}
      />

      <div className="absolute inset-x-0 top-0 max-h-[min(72vh,560px)] overflow-hidden rounded-b-2xl border-b border-accent/20 bg-primary-strong shadow-2xl">
        <div className="flex items-center justify-between px-3 py-2.5">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-accent uppercase">
            Menu
          </p>
          <button
            type="button"
            className="rounded-full p-1.5 text-white"
            onClick={onClose}
            aria-label={HEADER_COPY.closeMenu}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="max-h-[calc(min(72vh,560px)-108px)] overflow-y-auto px-2.5 pb-2">
          <div className="flex flex-col gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "rounded-lg px-3 py-2 text-[11px] font-semibold tracking-[0.14em] text-white/90 uppercase",
                  pathname === link.href && "bg-white/10 text-accent",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="my-1.5 h-px bg-white/10" />
            {signedIn ? (
              <>
                <Link
                  href={ROUTES.PROFILE}
                  onClick={onClose}
                  className="rounded-lg px-3 py-2 text-[11px] font-semibold tracking-[0.14em] text-white/90 uppercase"
                >
                  {HEADER_COPY.profile}
                </Link>
                <Link
                  href={ROUTES.BOOKINGS}
                  onClick={onClose}
                  className="rounded-lg px-3 py-2 text-[11px] font-semibold tracking-[0.14em] text-white/90 uppercase"
                >
                  {HEADER_COPY.myBookings}
                </Link>
                {isAdmin ? (
                  <Link
                    href={ROUTES.ADMIN.DASHBOARD}
                    onClick={onClose}
                    className="rounded-lg px-3 py-2 text-[11px] font-semibold tracking-[0.14em] text-accent uppercase"
                  >
                    {HEADER_COPY.admin}
                  </Link>
                ) : null}
              </>
            ) : (
              <Link
                href={ROUTES.LOGIN}
                onClick={onClose}
                className="rounded-lg px-3 py-2 text-[11px] font-semibold tracking-[0.14em] text-white/90 uppercase"
              >
                {HEADER_COPY.signIn}
              </Link>
            )}
          </div>
        </nav>

        <div className="border-t border-white/10 px-3 py-2.5">
          <Button asChild variant="accent" size="sm" className="h-9 w-full text-xs">
            <Link href={ROUTES.BOOK} onClick={onClose}>
              {HEADER_COPY.bookStay}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
