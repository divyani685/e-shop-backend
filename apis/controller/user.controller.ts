import { RequestHandler } from "express";
import { userFunction } from "../functions/user.functions";

export const userController: {
  signUpUserController: RequestHandler;
  signInUserController: RequestHandler;
  forgotPasswordController: RequestHandler;
  otpVerificationController: RequestHandler;
  resetPasswordController: RequestHandler;
  getCurrentUserController: RequestHandler;
} = {
  async signUpUserController(req, res, next) {
    try {
      const data = req.body;
      console.log(data);
      const createUser = await userFunction.signUpUser(data);
      console.log({ createUser });
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
  async getCurrentUserController(req, res, next) {
    try {
      const id = req.user?.id;
      const currentUser = await userFunction.getCurrentUserFunction(id);
      console.log({ currentUser });
      res.json({
        success: true,
        data: currentUser,
        msg: "Current User get successfully!!",
      });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  },
};
