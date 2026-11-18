import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EXPERIENCES, EXPERIENCES_COPY } from "@/constants/home";
import { ROUTES } from "@/constants/routes";

export function ExperiencesSection() {
  return (
    <section className="bg-background px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-2xl font-display text-3xl text-dark md:text-5xl">
          {EXPERIENCES_COPY.title}
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {EXPERIENCES.map((item) => (
            <article
              key={item.id}
              className="group relative min-h-[420px] overflow-hidden rounded-3xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/80">{item.body}</p>
                <Link
                  href={`${ROUTES.EXPERIENCES}?topic=${item.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-accent uppercase"
                >
                  {EXPERIENCES_COPY.enquire}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
