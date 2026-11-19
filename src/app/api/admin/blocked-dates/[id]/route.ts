import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withId } from "@/lib/db/serialize";

const schema = z.object({
  roomId: z.string().nullable().optional(),
  startDate: z.string().min(8),
  endDate: z.string().min(8),
  reason: z.string().default(""),
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
  const row = await prisma.blockedDate.update({
    where: { id },
    data: {
      roomId: parsed.data.roomId || null,
      startDate: new Date(parsed.data.startDate),
      endDate: new Date(parsed.data.endDate),
      reason: parsed.data.reason,
    },
  });
  return NextResponse.json({ data: withId(row) });
}

export async function DELETE(_request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  await prisma.blockedDate.delete({ where: { id } });
  return NextResponse.json({ data: { ok: true } });
}
