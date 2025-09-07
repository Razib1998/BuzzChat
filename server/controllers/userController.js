import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.json({ success: false, message: "Something went wrong" });
    }
    const isUserExists = await User.findOne({ email: email });
    if (isUserExists) {
      return res.json({ success: false, message: "User Already Exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    res.json({
      success: true,
      userData: user,
      token,
      message: "Account Created Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ email });
    const isPasswordMatched = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatched) {
      res.json({
        success: false,
        message: "Email or Password did not Matched",
      });
    }

    const token = generateToken(userData._id);
    res.json({
      success: true,
      userData,
      token,
      message: "Login Successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// controller to check is user is authenticated

export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

// Update profile function

export const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, profilePic } = req.body;

    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          bio,
          fullName,
        },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: upload.secure_url, bio, fullName },
        { new: true }
      );
    }
    res.json({
      success: true,
      user: updatedUser,
      message: "Update profile successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
