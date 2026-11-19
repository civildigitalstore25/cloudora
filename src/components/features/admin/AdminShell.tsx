"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LogOut, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { AdminSidebarNav } from "@/components/features/admin/AdminSidebarNav";
import { ADMIN_COPY, ADMIN_NAV, LAYOUT } from "@/constants/admin";
import { ASSETS } from "@/constants/assets";
import { ROUTES } from "@/constants/routes";
import { UI } from "@/constants/ui";
import { cn } from "@/lib/utils/cn";

function BrandBlock({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href={ROUTES.ADMIN.DASHBOARD}
      onClick={onClick}
      className="flex flex-col items-center text-center group"
    >
      <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-lg shadow-black/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
        <Image
          src={ASSETS.LOGO}
          alt={UI.brandFull}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full bg-white object-contain p-1"
        />
      </div>
      <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
        {ADMIN_COPY.panelLabel}
      </p>
    </Link>
  );
}

function ShellActions({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="shrink-0 space-y-2 border-t border-cream/10 pt-4">
      <Link
        href={ROUTES.HOME}
        onClick={onNavigate}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-cream/75 transition hover:bg-cream/10 hover:text-white"
      >
        <ExternalLink className="h-4 w-4 shrink-0" />
        <span>{ADMIN_COPY.storefront}</span>
      </Link>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: ROUTES.HOME })}
        className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-cream/75 transition hover:bg-cream/10 hover:text-white"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        <span>{ADMIN_COPY.signOut}</span>
      </button>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const page = ADMIN_NAV.find((item) => pathname.startsWith(item.href));

  return (
    <div className="min-h-screen bg-[#f3f1ea] lg:h-screen lg:overflow-hidden">
      <div className="flex min-h-screen w-full lg:h-full">
        <aside className="forest-gradient hidden w-72 shrink-0 flex-col border-r border-black/10 p-5 text-cream lg:flex lg:h-full lg:overflow-hidden">
          <BrandBlock />
          <div className="custom-scrollbar my-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1.5">
            <AdminSidebarNav pathname={pathname} />
          </div>
          <ShellActions />
        </aside>

        {open ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-dark/60 backdrop-blur-xs"
              aria-label={ADMIN_COPY.closeMenu}
              onClick={() => setOpen(false)}
            />
            <aside className="forest-gradient absolute left-0 top-0 flex h-full w-72 flex-col p-5 text-cream shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="flex shrink-0 items-center justify-between border-b border-cream/10 pb-3">
                <Link
                  href={ROUTES.ADMIN.DASHBOARD}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={ASSETS.LOGO}
                    alt={UI.brandFull}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full bg-white object-contain p-0.5"
                  />
                  <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                    {ADMIN_COPY.panelLabel}
                  </p>
                </Link>
                <button
                  type="button"
                  aria-label={ADMIN_COPY.closeMenu}
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1 text-cream/70 transition hover:bg-cream/10 hover:text-cream"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="custom-scrollbar my-4 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1.5">
                <AdminSidebarNav
                  pathname={pathname}
                  onNavigate={() => setOpen(false)}
                />
              </div>
              <ShellActions onNavigate={() => setOpen(false)} />
            </aside>
          </div>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col lg:h-full lg:min-h-0 lg:overflow-y-auto overscroll-contain">
          <header
            className={cn(
              "sticky top-0 z-30 border-b border-border/80 bg-[#f3f1ea]/90 py-3.5 backdrop-blur-xl",
              LAYOUT.container,
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-xl border border-border bg-card p-2 transition hover:border-primary/30 hover:bg-primary-soft lg:hidden"
                  aria-label={ADMIN_COPY.openMenu}
                  onClick={() => setOpen(true)}
                >
                  <Menu className="h-5 w-5 text-dark" />
                </button>
                <div>
                  <p className="eyebrow">{page?.label ?? ADMIN_COPY.fallbackTitle}</p>
                  <p className="text-sm font-medium text-dark">
                    {page?.description ?? ADMIN_COPY.fallbackDescription}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-dark">
                    {session?.user?.name ?? "Admin"}
                  </p>
                  <p className="text-xs text-muted">{session?.user?.email}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground shadow-sm ring-2 ring-accent/50 ring-offset-2 ring-offset-[#f3f1ea]">
                  {(session?.user?.name ?? "A").slice(0, 1).toUpperCase()}
                </div>
              </div>
            </div>
          </header>
          <main className={cn("flex-1 py-6 md:py-8", LAYOUT.container)}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
