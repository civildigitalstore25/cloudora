import { NextResponse } from "next/server";
import type { Session } from "next-auth";
import { AUTH_ERRORS, USER_ROLES } from "@/constants/auth";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

/**
 * The JWT only stores the role that was current at sign-in. Re-read it from
 * the database so a demoted or deleted admin loses access immediately.
 */
export async function isAdminSession(
  session: Session | null | undefined,
): Promise<boolean> {
  const id = session?.user?.id;
  if (!id || session?.user?.role !== USER_ROLES.ADMIN) return false;
  const user = await prisma.user.findUnique({
    where: { id },
    select: { role: true },
  });
  return user?.role === USER_ROLES.ADMIN;
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !(await isAdminSession(session))) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { error: AUTH_ERRORS.unauthorized },
        { status: 401 },
      ),
    };
  }

  return { ok: true as const, session };
}
