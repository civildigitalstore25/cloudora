import Image from "next/image";
import Link from "next/link";
import { ASSETS } from "@/constants/assets";
import { AUTH_COPY } from "@/constants/auth";
import { ROUTES } from "@/constants/routes";
import { UI } from "@/constants/ui";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="forest-gradient relative hidden overflow-hidden p-10 text-cream md:flex md:flex-col md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={ASSETS.LOGO}
            alt={UI.brandFull}
            width={44}
            height={44}
            className="rounded-full bg-white object-contain p-0.5"
          />
          <div>
            <p className="font-display text-lg text-white">{UI.brand}</p>
            <p className="text-[11px] tracking-[0.18em] text-accent uppercase">
              {AUTH_COPY.panelEyebrow}
            </p>
          </div>
        </div>
        <div>
          <h1 className="max-w-md font-display text-4xl leading-tight text-white">
            {AUTH_COPY.panelHeadline}
          </h1>
          <p className="mt-4 max-w-md text-cream/75">{AUTH_COPY.panelBody}</p>
        </div>
        <Link href={ROUTES.HOME} className="text-sm font-semibold text-accent">
          {AUTH_COPY.backToStore}
        </Link>
      </div>
      <div className="flex items-center justify-center bg-[#f3f1ea] px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
