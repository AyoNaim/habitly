import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

try {
  console.log("Connecting to DB...");
  const now = await prisma.$queryRaw`SELECT NOW()`;
  console.log("SUCCESS:", now);
} catch (err) {
  console.error("DB ERROR:", err);
} finally {
  await prisma.$disconnect();
}
