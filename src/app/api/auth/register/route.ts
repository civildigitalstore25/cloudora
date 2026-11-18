import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { AUTH, AUTH_ERRORS, USER_ROLES } from "@/constants/auth";
import { prisma } from "@/lib/db/prisma";
import { registerSchema } from "@/lib/auth/schemas";
import { withId } from "@/lib/db/serialize";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: AUTH_ERRORS.invalidInput },
        { status: 400 },
      );
    }

    const email = parsed.data.email.toLowerCase();
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { error: AUTH_ERRORS.emailTaken },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(
      parsed.data.password,
      AUTH.bcryptRounds,
    );
    const user = withId(
      await prisma.user.create({
        data: {
          name: parsed.data.name,
          email,
          passwordHash,
          phone: parsed.data.phone,
          role: USER_ROLES.USER,
        },
      }),
    );

    return NextResponse.json({
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : AUTH_ERRORS.registerFailed,
      },
      { status: 500 },
    );
  }
}
