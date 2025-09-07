import express from "express";
import {
  checkAuth,
  signIn,
  signUp,
  updateProfile,
} from "../controllers/userController.js";
import { protectedRoutes } from "../Middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/signin", signIn);
userRouter.put("/update-profile", protectedRoutes, updateProfile);
userRouter.get("/check", protectedRoutes, checkAuth);

export default userRouter;
