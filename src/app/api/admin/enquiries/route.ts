import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withIds } from "@/lib/db/serialize";

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const rows = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ data: withIds(rows) });
}
