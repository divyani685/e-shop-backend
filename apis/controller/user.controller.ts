import { RequestHandler } from "express";
import { userFunction } from "../functions/user.functions";

export const userController: {
  signUpUserController: RequestHandler;
  signInUserController: RequestHandler;
  forgotPasswordController: RequestHandler;
} = {
  async signUpUserController(req, res, next) {
    try {
      const data = req.body;
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
      console.log("req body", data);
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
};
