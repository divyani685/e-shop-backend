import { Prisma } from "@prisma/client";
import prisma from "../../configs";
export const registerFunction = {
  async create(data: Prisma.UserCreateInput) {
    try {
      const registerData = await prisma.user.create({ data });
      return registerData;
    } catch (error) {
      throw error;
    }
  },
};
