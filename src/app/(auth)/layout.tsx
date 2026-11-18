import Link from "next/link";
import { AUTH_COPY } from "@/constants/auth";
import { ROUTES } from "@/constants/routes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden bg-primary-strong p-10 text-white md:flex md:flex-col md:justify-between">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          {AUTH_COPY.panelEyebrow}
        </p>
        <div>
          <h1 className="font-display text-4xl leading-tight">
            {AUTH_COPY.panelHeadline}
          </h1>
          <p className="mt-4 max-w-md text-white/75">{AUTH_COPY.panelBody}</p>
        </div>
        <Link href={ROUTES.HOME} className="text-sm text-accent">
          {AUTH_COPY.backToStore}
        </Link>
      </div>
      <div className="flex items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
