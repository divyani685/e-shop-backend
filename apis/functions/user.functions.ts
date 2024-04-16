import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NotFound } from "http-errors";
import jwt from "jsonwebtoken";
import prisma from "../../configs";
import emailService from "../../services/EmailService";
import { forgotPassword } from "../../template/template";
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
  async forgotPasswordFunction(data: Prisma.UserCreateInput) {
    try {
      const isUserExist = await prisma.user.findFirst({
        where: {
          email: data.email,
        },
      });
      if (!isUserExist) {
        throw new NotFound("User not found");
      }
      let otp = Math.floor(Math.random() * 999999)
        .toString()
        .padStart(6, "0");

      // let otp = Math.floor(Math.random() * 999999);
      // otp = Number(otp.toString().padEnd(6, "0"));

      const currentDate = new Date();
      const otpExpiry = new Date(
        currentDate.setMinutes(currentDate.getMinutes() + 1)
      );
      const otpValue = await prisma.user.update({
        where: {
          id: isUserExist.id,
        },
        data: {
          otp,
          otpExpiry,
        },
      });
      const subject = "Password Reset";
      const template = forgotPassword(otpValue as any);
      const otpVal = emailService.sendMail(data.email, subject, template);
      return otpVal;
    } catch (error) {
      throw error;
    }
  },
};
