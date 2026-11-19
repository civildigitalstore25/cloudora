import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withId } from "@/lib/db/serialize";

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

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  const pkg = await prisma.package.findUnique({ where: { id } });
  if (!pkg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ data: withId(pkg) });
}

export async function PUT(request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  }
  const pkg = await prisma.package.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ data: withId(pkg) });
}

export async function DELETE(_request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  await prisma.package.delete({ where: { id } });
  return NextResponse.json({ data: { ok: true } });
}
