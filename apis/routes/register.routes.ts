// const Router=require("express")
import { Router } from "express";
import { registerController } from "../controller/register.controller";

const router = Router();
router.post("/register", registerController.create);
export default router;
