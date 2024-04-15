import { Router } from "express";
import { loginUser } from "../controller/login.controller";
const router = Router();
router.post("/login", loginUser.create);
export default router;
