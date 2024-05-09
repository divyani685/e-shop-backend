import { PrismaClient } from "@prisma/client";
declare global {
  var prisma: PrismaClient | undefined;
}
const prisma = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
export const configs = {
  JWT_SECRET: process.env.JWT_SECRET,
};
export default prisma;
