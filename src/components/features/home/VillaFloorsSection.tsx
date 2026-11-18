import Image from "next/image";
import { Check } from "lucide-react";
import { VILLA_COPY, VILLA_FLOORS } from "@/constants/home";

export function VillaFloorsSection() {
  return (
    <section className="bg-background px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {VILLA_COPY.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl text-dark md:text-5xl">
            {VILLA_COPY.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {VILLA_FLOORS.map((floor) => (
            <article
              key={floor.id}
              className="overflow-hidden rounded-3xl bg-card shadow-sm"
            >
              <div className="relative aspect-[16/11]">
                <Image
                  src={floor.image}
                  alt={floor.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                  {floor.label}
                </p>
                <h3 className="mt-2 font-display text-2xl text-dark md:text-3xl">
                  {floor.title}
                </h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {floor.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
