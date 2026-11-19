import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withId } from "@/lib/db/serialize";

const schema = z.object({
  title: z.string().default(""),
  url: z.string().min(1),
  type: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  alt: z.string().default(""),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid update" }, { status: 400 });
  }
  const item = await prisma.galleryItem.update({
    where: { id },
    data: parsed.data,
  });
  return NextResponse.json({ data: withId(item) });
}

export async function DELETE(_request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  await prisma.galleryItem.delete({ where: { id } });
  return NextResponse.json({ data: { ok: true } });
}
