import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withIds, withId } from "@/lib/db/serialize";

const createSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().default(""),
  floor: z.enum(["GROUND", "FIRST"]),
  maxGuests: z.number().int().min(1).max(15),
  baseTariffPerNight: z.number().positive(),
  extraGuestFee: z.number().min(0).default(0),
  images: z.array(z.string()).default([]),
  amenities: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const rooms = await prisma.room.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json({ data: withIds(rooms) });
}

export async function POST(request: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const parsed = createSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid room" }, { status: 400 });
  }
  const room = await prisma.room.create({ data: parsed.data });
  return NextResponse.json({ data: withId(room) });
}
