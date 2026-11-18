import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withIds } from "@/lib/db/serialize";

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ data: withIds(users) });
}
