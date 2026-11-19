import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { withId } from "@/lib/db/serialize";

const schema = z.object({
  role: z.enum(["user", "admin"]),
  name: z.string().min(1).optional(),
  phone: z.string().nullable().optional(),
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
  if (id === gate.session.user?.id && parsed.data.role !== "admin") {
    return NextResponse.json(
      { error: "You cannot demote your own admin account" },
      { status: 400 },
    );
  }
  const user = await prisma.user.update({
    where: { id },
    data: parsed.data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ data: withId(user) });
}

export async function DELETE(_request: Request, { params }: Params) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  if (id === gate.session.user?.id) {
    return NextResponse.json(
      { error: "You cannot delete your own account" },
      { status: 400 },
    );
  }
  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ data: { ok: true } });
  } catch {
    return NextResponse.json(
      { error: "Cannot delete user with linked bookings or enquiries." },
      { status: 409 },
    );
  }
}
