import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withId, withIds } from "@/lib/db/serialize";

const schema = z.object({
  roomId: z.string().nullable().optional(),
  startDate: z.string().min(8),
  endDate: z.string().min(8),
  reason: z.string().default(""),
});

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const rows = await prisma.blockedDate.findMany({
    orderBy: { startDate: "asc" },
    include: { room: true },
  });
  return NextResponse.json({ data: withIds(rows) });
}

export async function POST(request: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid block" }, { status: 400 });
  }
  const row = await prisma.blockedDate.create({
    data: {
      roomId: parsed.data.roomId || null,
      startDate: new Date(parsed.data.startDate),
      endDate: new Date(parsed.data.endDate),
      reason: parsed.data.reason,
    },
  });
  return NextResponse.json({ data: withId(row) });
}
