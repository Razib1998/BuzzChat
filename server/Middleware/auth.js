import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protectedRoutes = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) return res.json({ success: false, message: "User Not Found" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
