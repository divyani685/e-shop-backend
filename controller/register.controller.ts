import { RequestHandler } from "express";
import { registerFunction } from "../apis/functions/user.functions";

export const registerController: { create: RequestHandler } = {
  async create(req, res, next) {
    try {
      const { data } = req.body;
      const createUser = await registerFunction.create(data);
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
};
