"use client";

import Link from "next/link";
import { ADMIN_NAV } from "@/constants/admin";
import { cn } from "@/lib/utils/cn";

export function AdminSidebarNav({
  pathname,
  onNavigate,
  className,
}: {
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <nav className={cn("space-y-1.5", className)}>
      {ADMIN_NAV.map(({ href, label, description, icon: Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all",
              active
                ? "bg-cream/10 text-white shadow-[inset_0_0_0_1px_rgba(197,163,115,0.35)]"
                : "text-cream/75 hover:bg-cream/[0.07] hover:text-white",
            )}
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                active
                  ? "bg-accent text-accent-foreground shadow-sm shadow-black/20"
                  : "bg-cream/[0.06] text-cream/80 group-hover:bg-cream/10 group-hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{label}</span>
              <span
                className={cn(
                  "block truncate text-[11px]",
                  active ? "text-cream/75" : "text-cream/55",
                )}
              >
                {description}
              </span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
