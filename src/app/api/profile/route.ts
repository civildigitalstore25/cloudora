import { NextResponse } from "next/server";
import { z } from "zod";
import { AUTH_ERRORS } from "@/constants/auth";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { withId } from "@/lib/db/serialize";

const updateSchema = z.object({
  name: z.string().min(2).max(80),
  phone: z.string().max(20).optional().nullable(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: AUTH_ERRORS.unauthorized }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: AUTH_ERRORS.unauthorized }, { status: 401 });
  }

  return NextResponse.json({ data: withId(user) });
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: AUTH_ERRORS.unauthorized }, { status: 401 });
  }

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid profile" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone?.trim() || null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ data: withId(user) });
}
