import { NextResponse } from "next/server";
import { z } from "zod";
import { EMAIL_COPY } from "@/constants/email";
import { sendEnquiryEmails } from "@/lib/email/send";
import { prisma } from "@/lib/db/prisma";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().default("General enquiry"),
  message: z.string().min(5),
  type: z.enum(["CONTACT", "EXPERIENCE", "PACKAGE", "GENERAL"]).default("CONTACT"),
});

export async function POST(request: Request) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form" }, { status: 400 });
    }

    await prisma.enquiry.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        phone: parsed.data.phone,
        subject: parsed.data.subject,
        message: parsed.data.message,
        type: parsed.data.type,
      },
    });

    await sendEnquiryEmails(parsed.data);

    return NextResponse.json({
      data: { ok: true, message: EMAIL_COPY.contactThanks },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : EMAIL_COPY.contactError,
      },
      { status: 500 },
    );
  }
}
