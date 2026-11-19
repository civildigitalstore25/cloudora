"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { CalendarCheck2, LayoutDashboard, LogOut, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HEADER_COPY } from "@/constants/header";
import { USER_ROLES } from "@/constants/auth";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils/cn";

export function HeaderUserMenu({ light = false }: { light?: boolean }) {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === USER_ROLES.ADMIN;
  const initial =
    session?.user?.name?.trim()?.charAt(0)?.toUpperCase() ||
    session?.user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  if (status === "loading") {
    return (
      <span
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full border",
          light ? "border-white/25 bg-white/10" : "border-white/20 bg-white/10",
        )}
        aria-hidden
      />
    );
  }

  if (!session?.user) {
    return (
      <Link
        href={ROUTES.LOGIN}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full border transition",
          light
            ? "border-white/30 text-white hover:bg-white/10"
            : "border-white/25 text-white hover:bg-white/10",
        )}
        aria-label={HEADER_COPY.signIn}
      >
        <UserRound className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={HEADER_COPY.accountMenu}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            light
              ? "border-white/30 bg-white/10 text-white hover:bg-white/15"
              : "border-white/25 bg-white/10 text-white hover:bg-white/15",
          )}
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          ) : (
            initial
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {session.user.name || session.user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={ROUTES.PROFILE}>
            <UserRound className="h-4 w-4" />
            {HEADER_COPY.profile}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={ROUTES.BOOKINGS}>
            <CalendarCheck2 className="h-4 w-4" />
            {HEADER_COPY.myBookings}
          </Link>
        </DropdownMenuItem>
        {isAdmin ? (
          <DropdownMenuItem asChild>
            <Link href={ROUTES.ADMIN.DASHBOARD}>
              <LayoutDashboard className="h-4 w-4" />
              {HEADER_COPY.admin}
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => signOut({ callbackUrl: ROUTES.HOME })}
          className="text-destructive focus:bg-destructive-soft focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          {HEADER_COPY.signOut}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
