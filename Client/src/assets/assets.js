import avatar_icon from "./avatar_icon.png";
import gallery_icon from "./gallery_icon.svg";
import help_icon from "./help_icon.png";
import logo_icon from "./logo_icon.svg";
import logo_big from "./logo_big.svg";
import logo from "./logoWithName.png";
import logoWithoutName from "./favicon.svg";
import profile_richard from "./profile_richard.png";
import profile_alison from "./profile_alison.png";
import profile_enrique from "./profile_enrique.png";
import profile_marco from "./profile_marco.png";
import profile_martin from "./profile_martin.png";
import search_icon from "./search_icon.png";
import send_button from "./send_button.svg";
import menu_icon from "./menu_icon.png";
import arrow_icon from "./arrow_icon.png";
import code from "./code.svg";
import bgImage from "./bgImage.svg";
import pic1 from "./pic1.png";
import pic2 from "./pic2.png";
import pic3 from "./pic3.png";
import pic4 from "./pic4.png";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";

const assets = {
  avatar_icon,
  gallery_icon,
  help_icon,
  logo_big,
  logo_icon,
  logo,
  search_icon,
  send_button,
  menu_icon,
  arrow_icon,
  code,
  bgImage,
  profile_martin,
  logoWithoutName,
};

export default assets;

export const imagesDummyData = [pic1, pic2, pic3, pic4, pic1, pic2];

export const userDummyData = [
  {
    _id: "680f50aaf10f3cd28382ecf2",
    email: "test1@greatstack.dev",
    fullName: "Alison Martin",
    profilePic: profile_alison,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f50e4f10f3cd28382ecf9",
    email: "test2@greatstack.dev",
    fullName: "Martin Johnson",
    profilePic: profile_martin,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f510af10f3cd28382ed01",
    email: "test3@greatstack.dev",
    fullName: "Enrique Martinez",
    profilePic: profile_enrique,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f5137f10f3cd28382ed10",
    email: "test4@greatstack.dev",
    fullName: "Marco Jones",
    profilePic: profile_marco,
    bio: "Hi Everyone, I am Using QuickChat",
  },
  {
    _id: "680f516cf10f3cd28382ed11",
    email: "test5@greatstack.dev",
    fullName: "Richard Smith",
    profilePic: profile_richard,
    bio: "Hi Everyone, I am Using QuickChat",
  },
];

export const messagesDummyData = [
  {
    _id: "m1",
    senderId: "680f50aaf10f3cd28382ecf2", // Alison -> Martin
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Hey Martin! How’s your day going?",
    seen: true,
    createdAt: "2025-04-28T10:23:27.844Z",
  },
  {
    _id: "m2",
    senderId: "680f50e4f10f3cd28382ecf9", // Martin -> Alison
    receiverId: "680f50aaf10f3cd28382ecf2",
    text: "Pretty good! Just finished the dashboard layout.",
    seen: true,
    createdAt: "2025-04-28T10:23:34.520Z",
  },
  {
    _id: "m3",
    senderId: "680f50aaf10f3cd28382ecf2", // Alison -> Martin
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Nice! Can you share a screenshot?",
    seen: true,
    createdAt: "2025-04-28T10:23:37.301Z",
  },
  {
    _id: "m4",
    senderId: "680f50e4f10f3cd28382ecf9", // Martin -> Alison (image)
    receiverId: "680f50aaf10f3cd28382ecf2",
    image: img1,
    seen: true,
    createdAt: "2025-04-28T10:23:40.334Z",
  },
  {
    _id: "m5",
    senderId: "680f50aaf10f3cd28382ecf2", // Alison -> Martin (image)
    receiverId: "680f50e4f10f3cd28382ecf9",
    image: img2,
    seen: true,
    createdAt: "2025-04-28T10:23:56.265Z",
  },
  {
    _id: "m6",
    senderId: "680f50e4f10f3cd28382ecf9", // Martin -> Alison
    receiverId: "680f50aaf10f3cd28382ecf2",
    text: "Looks great! Let’s ship it 🚀",
    seen: true,
    createdAt: "2025-04-28T10:24:05.164Z",
  },
  {
    _id: "m7",
    senderId: "680f50aaf10f3cd28382ecf2", // Alison -> Martin
    receiverId: "680f50e4f10f3cd28382ecf9",
    text: "Awesome. I’ll prep the release notes.",
    seen: true,
    createdAt: "2025-04-28T10:24:08.523Z",
  },
  {
    _id: "m8",
    senderId: "680f50e4f10f3cd28382ecf9", // Martin -> Alison
    receiverId: "680f50aaf10f3cd28382ecf2",
    text: "Ping me if you need the changelog.",
    seen: true,
    createdAt: "2025-04-28T10:24:20.000Z",
  },
];
