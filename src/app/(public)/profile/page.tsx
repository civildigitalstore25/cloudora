import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/features/profile/ProfileForm";
import { PROFILE_COPY } from "@/constants/header";
import { ROUTES } from "@/constants/routes";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(ROUTES.LOGIN);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, phone: true },
  });

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <div className="bg-background px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl text-dark md:text-5xl">
          {PROFILE_COPY.title}
        </h1>
        <p className="mt-3 max-w-xl text-muted">{PROFILE_COPY.description}</p>
        <div className="mt-8">
          <ProfileForm
            initial={{
              name: user.name,
              email: user.email,
              phone: user.phone,
            }}
          />
        </div>
      </div>
    </div>
  );
}
