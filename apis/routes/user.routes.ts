import { Router } from "express";
import { userController } from "../controller/user.controller";
const router = Router();
router.post("/register", userController.signUpUserController);
router.post("/login", userController.signInUserController);
export default router;
