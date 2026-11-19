import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { AUTH } from "../src/constants/auth";
import { ASSETS } from "../src/constants/assets";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@cloudora.local").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "CloudoraAdmin123";

  const passwordHash = await bcrypt.hash(adminPassword, AUTH.bcryptRounds);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "admin", passwordHash, name: "Cloudora Admin" },
    create: {
      email: adminEmail,
      name: "Cloudora Admin",
      role: "admin",
      passwordHash,
    },
  });

  const rooms = [
    {
      name: "Ground Bedroom 1",
      slug: "ground-bedroom-1",
      floor: "GROUND" as const,
      sortOrder: 1,
      description: "King-size bed with attached bath and 32-inch TV.",
    },
    {
      name: "Ground Bedroom 2",
      slug: "ground-bedroom-2",
      floor: "GROUND" as const,
      sortOrder: 2,
      description: "King-size bed with attached bath and 32-inch TV.",
    },
    {
      name: "Ground Bedroom 3",
      slug: "ground-bedroom-3",
      floor: "GROUND" as const,
      sortOrder: 3,
      description: "King-size bed with attached bath and 32-inch TV.",
    },
    {
      name: "First Bedroom 1",
      slug: "first-bedroom-1",
      floor: "FIRST" as const,
      sortOrder: 4,
      description: "King-size bed with attached bath near the lounge.",
    },
    {
      name: "First Bedroom 2",
      slug: "first-bedroom-2",
      floor: "FIRST" as const,
      sortOrder: 5,
      description: "King-size bed with attached bath near the lounge.",
    },
  ];

  const roomIds: string[] = [];
  for (const [index, room] of rooms.entries()) {
    const roomImage = ASSETS.ROOMS[index] ?? ASSETS.ROOM_DEFAULT;
    const saved = await prisma.room.upsert({
      where: { slug: room.slug },
      update: {
        name: room.name,
        description: room.description,
        floor: room.floor,
        sortOrder: room.sortOrder,
        isActive: true,
        images: [roomImage],
      },
      create: {
        ...room,
        maxGuests: 3,
        baseTariffPerNight: 5500,
        extraGuestFee: 1000,
        images: [roomImage],
        amenities: ["King bed", "Attached bath", "TV", "Hot water"],
      },
    });
    roomIds.push(saved.id);
  }

  await prisma.package.upsert({
    where: { slug: "signature-villa-stay" },
    update: {
      roomIds,
      isActive: true,
      name: "Cloudora Luxury Homestay Stay",
      shortDescription:
        "A private 5 BHK luxury villa in Kodaikanal for families, friends and corporate groups — up to 15 guests.",
      description:
        "Book Cloudora for a memorable holiday amidst the hills and valley views of Kodaikanal. Spacious bedrooms, lounge, dining, campfire area and caretaker support throughout your stay.",
      pricePerNight: null,
      totalPrice: null,
      includes: [
        "Premium 5 BHK luxury villa",
        "Up to 15 guests",
        "Valley and mountain views",
        "Private car parking",
        "High-speed Wi-Fi",
        "Caretaker support",
      ],
    },
    create: {
      name: "Cloudora Luxury Homestay Stay",
      slug: "signature-villa-stay",
      shortDescription:
        "A private 5 BHK luxury villa in Kodaikanal for families, friends and corporate groups — up to 15 guests.",
      description:
        "Book Cloudora for a memorable holiday amidst the hills and valley views of Kodaikanal. Spacious bedrooms, lounge, dining, campfire area and caretaker support throughout your stay.",
      images: [ASSETS.PACKAGE],
      roomIds,
      pricePerNight: null,
      totalPrice: null,
      maxGuests: 15,
      includes: [
        "Premium 5 BHK luxury villa",
        "Up to 15 guests",
        "Valley and mountain views",
        "Private car parking",
        "High-speed Wi-Fi",
        "Caretaker support",
      ],
      isActive: true,
      sortOrder: 1,
    },
  });

  await prisma.package.upsert({
    where: { slug: "sai-travels-theni-kodai" },
    update: {
      isActive: true,
      name: "Sai Travels to Cloudora (Theni to Kodaikanal)",
      shortDescription:
        "Travel together. Stay together. Celebrate together — exclusive Theni to Kodaikanal partnership.",
      description:
        "An exclusive travel partnership between Sai Travels, Theni and Cloudora, Kodaikanal. Advance booking required. Package pricing and inclusions confirmed by group size, travel dates and availability.",
      includes: [
        "Transportation from Theni to Kodaikanal and return",
        "Comfortable luxury group accommodation",
        "Local Kodaikanal sightseeing experience",
        "Campfire and music entertainment at Cloudora",
        "Singing, dancing and fun with your group",
        "Complimentary breakfast at Cloudora",
      ],
      pricePerNight: null,
      totalPrice: null,
    },
    create: {
      name: "Sai Travels to Cloudora (Theni to Kodaikanal)",
      slug: "sai-travels-theni-kodai",
      shortDescription:
        "Travel together. Stay together. Celebrate together — exclusive Theni to Kodaikanal partnership.",
      description:
        "An exclusive travel partnership between Sai Travels, Theni and Cloudora, Kodaikanal. Advance booking required. Package pricing and inclusions confirmed by group size, travel dates and availability.",
      images: [ASSETS.EXPERIENCE_LOCAL],
      roomIds,
      totalPrice: null,
      pricePerNight: null,
      maxGuests: 15,
      includes: [
        "Transportation from Theni to Kodaikanal and return",
        "Comfortable luxury group accommodation",
        "Local Kodaikanal sightseeing experience",
        "Campfire and music entertainment at Cloudora",
        "Singing, dancing and fun with your group",
        "Complimentary breakfast at Cloudora",
      ],
      isActive: true,
      sortOrder: 2,
    },
  });


  const gallerySeed = [
    ...ASSETS.GALLERY.map((url, i) => ({
      title: `Gallery ${i + 1}`,
      url,
      type: "IMAGE" as const,
      sortOrder: i + 1,
    })),
    ...ASSETS.VIDEOS.map((url, i) => ({
      title: `Video ${i + 1}`,
      url,
      type: "VIDEO" as const,
      sortOrder: 20 + i,
    })),
  ];

  for (const item of gallerySeed) {
    const existing = await prisma.galleryItem.findFirst({
      where: { url: item.url },
    });
    if (existing) continue;
    await prisma.galleryItem.create({
      data: {
        ...item,
        alt: item.title,
        isActive: true,
      },
    });
  }

  console.info("Seed complete");
  console.info(`Admin: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
