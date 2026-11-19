import Image from "next/image";

export function PropertyPhotosStrip({
  images,
  altPrefix,
}: {
  images: readonly string[];
  altPrefix: string;
}) {
  const [hero, second, third, ...rest] = images;

  if (!hero) return null;

  return (
    <div className="space-y-2.5 sm:space-y-3">
      {/* Bento: one large on top */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:aspect-[21/9] sm:rounded-3xl">
        <Image
          src={hero}
          alt={altPrefix}
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>

      {/* Two side-by-side under the hero */}
      {second || third ? (
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {second ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl">
              <Image
                src={second}
                alt={altPrefix}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          ) : null}
          {third ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl">
              <Image
                src={third}
                alt={altPrefix}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Remaining images in pairs */}
      {rest.length > 0 ? (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {rest.map((src) => (
            <div
              key={src}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <Image
                src={src}
                alt={altPrefix}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
