import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import userRouter from "./Routes/userRoutes.js";
import messageRouter from "./Routes/MessageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// initialize socket.io

export const io = new Server(server, {
  cors: { origin: "*" },
});

// Store Online Users

export const userSocketMap = {}; //! {userId,socketId}

// socket.io connection

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId);
  if (userId) userSocketMap[userId] = socket.id;

  // Emit online users for all connected users

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys[userId]);
  });
});

// Middleware

app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Routes Set up
app.use("/api/v1/status", (req, res) => res.send("Server is Running"));
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/messages", messageRouter);

await connectDB();
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV !== "production") {
  server.listen(PORT, () => console.log("Server is Running on PORT " + PORT));
}

export default server;
