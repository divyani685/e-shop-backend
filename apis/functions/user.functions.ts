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
      if (!isPasswordValid) throw new Error("Incorrect email id/password");
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
      const template = forgotPassword(otpValue.otp as any);
      const otpVal = emailService.sendMail(data.email, subject, template);
      return otpVal;
    } catch (error) {
      throw error;
    }
  },
  async otpVerificationFunction(otp: string, email: string) {
    try {
      const isOtpCorrect = await prisma.user.findFirst({
        where: {
          email: email,
          otp: otp,
        },
      });
      if (!isOtpCorrect) {
        throw new NotFound("otp is Incorrect");
      }
    } catch (error) {
      console.log("object");
      throw error;
    }
  },
  async resetPasswordFunction(
    newPassword: string,
    email: string,
    password: string
  ) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword as string, 10);
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new NotFound("User doesn't exist");
      }
      const isOldPassword = await bcrypt.compare(newPassword, user?.password);

      if (isOldPassword) {
        throw new NotFound("New password should not be equal to old password");
      }
      if (newPassword !== password) {
        throw new NotFound("Confirm password should be equal to new password");
      }
      const registerData = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          password: hashedPassword,
        },
      });
      return registerData;
    } catch (error) {
      throw error;
    }
  },
  async getCurrentUserFunction(id: any) {
    try {
      const findUser = await prisma?.user.findUnique({
        where: {
          id,
        },
      });
      if (!findUser) {
        throw new NotFound("User doesn't exist");
      }
      return findUser;
    } catch (error) {
      throw error;
    }
  },
};
