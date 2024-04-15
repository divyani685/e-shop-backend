import { RequestHandler } from "express";
import { registerFunction } from "../functions/register.functions";

export const registerController: { create: RequestHandler } = {
  async create(req, res, next) {
    try {
      const data = req.body;
      const createUser = await registerFunction.create(data);
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
