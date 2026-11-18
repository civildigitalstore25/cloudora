import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withId, withIds } from "@/lib/db/serialize";

const schema = z.object({
  title: z.string().default(""),
  url: z.string().min(1),
  type: z.enum(["IMAGE", "VIDEO"]).default("IMAGE"),
  alt: z.string().default(""),
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export async function GET() {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  return NextResponse.json({
    data: withIds(
      await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } }),
    ),
  });
}

export async function POST(request: Request) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid item" }, { status: 400 });
  }
  const item = await prisma.galleryItem.create({ data: parsed.data });
  return NextResponse.json({ data: withId(item) });
}
