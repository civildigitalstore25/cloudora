import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withId, withIds } from "@/lib/db/serialize";

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().default(""),
  shortDescription: z.string().default(""),
  images: z.array(z.string()).default([]),
  roomIds: z.array(z.string()).default([]),
  pricePerNight: z.number().positive().nullable().optional(),
  totalPrice: z.number().positive().nullable().optional(),
  maxGuests: z.number().int().min(1).default(15),
  includes: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  return NextResponse.json({
    data: withIds(await prisma.package.findMany({ orderBy: { sortOrder: "asc" } })),
  });
}

export async function POST(request: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid package" }, { status: 400 });
  }
  const pkg = await prisma.package.create({ data: parsed.data });
  return NextResponse.json({ data: withId(pkg) });
}
