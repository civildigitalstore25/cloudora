import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@cloudora.local").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "CloudoraAdmin123";
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log("NOT_FOUND", email);
    return;
  }
  const ok = user.passwordHash
    ? await bcrypt.compare(password, user.passwordHash)
    : false;
  console.log({
    email: user.email,
    role: user.role,
    hasPassword: Boolean(user.passwordHash),
    passwordMatches: ok,
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
