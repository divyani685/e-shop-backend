import { RequestHandler } from "express";
import { loginFunction } from "../functions/login.functions";

export const loginUser: { create: RequestHandler } = {
  async create(req, res, next) {
    try {
      const data = req.body;
      const signInUser = await loginFunction.create(data);
      console.log({ signInUser });
      res.json({
        success: true,
        data: signInUser,
        msg: "Login successfully!!",
      });
    } catch (error) {
      throw error;
    }
  },
};
