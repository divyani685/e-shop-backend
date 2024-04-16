import { Router } from "express";
import { userController } from "../controller/user.controller";
const router = Router();
router.post("/register", userController.signUpUserController);
router.post("/login", userController.signInUserController);
router.post("/forgot-password", userController.forgotPasswordController);
export default router;
