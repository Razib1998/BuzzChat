import express from "express";
import { protectedRoutes } from "../Middleware/auth.js";
import {
  getMessages,
  getUsersForSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/MessageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectedRoutes, getUsersForSidebar);
messageRouter.get("/:id", protectedRoutes, getMessages);
messageRouter.put("/mark/:id", protectedRoutes, markMessageAsSeen);
messageRouter.post("/send-message/:receiverId", protectedRoutes, sendMessage);

export default messageRouter;
