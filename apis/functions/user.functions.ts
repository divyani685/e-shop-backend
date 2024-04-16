import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NotFound } from "http-errors";
import jwt from "jsonwebtoken";
import prisma from "../../configs";
export const userFunction = {
  async signUpUser(data: Prisma.UserCreateInput) {
    try {
      const hashedPassword = await bcrypt.hash(data.password as string, 10);
      const registerData = await prisma.user.create({
        data: { ...data, password: hashedPassword },
      });
      return registerData;
    } catch (error) {
      throw error;
    }
  },
  async signInUser(data: Prisma.UserCreateInput) {
    try {
      console.log("data------", { data });
      const { email, password } = data;
      const findUser = await prisma?.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!findUser) {
        throw new NotFound("User doesn't exist");
      }
      const isPasswordValid = await bcrypt.compare(
        password,
        findUser?.password as string
      );
      if (!isPasswordValid) throw new Error("Invalid password");
      const token = jwt.sign(
        { userId: findUser?.id, role: findUser?.role },
        process.env.JWT_SECRET as string
      );
      return { token, findUser };
    } catch (error) {
      throw error;
    }
  },
};