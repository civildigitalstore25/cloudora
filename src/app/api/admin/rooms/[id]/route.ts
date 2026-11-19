import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withId } from "@/lib/db/serialize";

const updateSchema = z.object({
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

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  const room = await prisma.room.findUnique({ where: { id } });
  if (!room) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: withId(room) });
}

export async function PUT(request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  }
  const room = await prisma.room.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ data: withId(room) });
}

export async function DELETE(_request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  try {
    await prisma.room.delete({ where: { id } });
    return NextResponse.json({ data: { ok: true } });
  } catch {
    return NextResponse.json(
      { error: "Cannot delete room linked to bookings. Hide it instead." },
      { status: 409 },
    );
  }
}
