import { PrismaClient } from "@prisma/client";

const password = encodeURIComponent("CivilDigitalStore25@#");
const ref = "vmtodtthrvfzzdtkoghh";
const candidates = [
  `postgresql://postgres.${ref}:${password}@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true`,
  `postgresql://postgres.${ref}:${password}@aws-1-ap-south-1.pooler.supabase.com:5432/postgres`,
  `postgresql://postgres:${password}@[2406:da14:1772:ea02:3cba:a0ae:4657:706a]:5432/postgres?sslmode=require`,
  `postgresql://postgres.${ref}:${password}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true`,
];

async function tryUrl(url: string) {
  const label = url.replace(password, "***");
  const prisma = new PrismaClient({
    datasources: { db: { url } },
  });
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("SUCCESS", label);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log("FAIL", label);
    console.log(" ", message.replace(/\s+/g, " ").slice(0, 240));
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  for (const url of candidates) {
    const ok = await tryUrl(url);
    if (ok) break;
  }
}

main();
