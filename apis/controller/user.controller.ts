import { RequestHandler } from "express";
import { userFunction } from "../functions/user.functions";

export const userController: {
  signUpUserController: RequestHandler;
  signInUserController: RequestHandler;
  forgotPasswordController: RequestHandler;
  otpVerificationController: RequestHandler;
  resetPasswordController: RequestHandler;
} = {
  async signUpUserController(req, res, next) {
    try {
      const data = req.body;
      console.log(data);
      const createUser = await userFunction.signUpUser(data);
      res.json({
        success: true,
        data: createUser,
        msg: "User created successfully!!",
      });
    } catch (error) {
      next(error);
    }
  },
  async signInUserController(req, res, next) {
    try {
      const data = req.body;

      const { token, findUser } = await userFunction.signInUser(data);
      console.log({ findUser });
      res.json({
        success: true,
        data: findUser,
        token: token,
        msg: "Login successfully!!",
      });
    } catch (error) {
      next(error);
    }
  },
  async forgotPasswordController(req, res, next) {
    try {
      const data = req.body;

      const otp = await userFunction.forgotPasswordFunction(data);
      res.json({
        success: true,
        data: otp,
        msg: "OTP sent successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  async otpVerificationController(req, res, next) {
    try {
      const data = req.body;
      console.log("body data---", data);
      await userFunction.otpVerificationFunction(data.data.otp, data.email);
      res.json({
        success: true,
        msg: "OTP is verified",
      });
    } catch (error) {
      next(error);
    }
  },
  async resetPasswordController(req, res, next) {
    try {
      const data = req.body;
      await userFunction.resetPasswordFunction(
        data.data.newpassword,
        data.email,
        data.data.password
      );
      res.json({
        success: true,
        msg: "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
