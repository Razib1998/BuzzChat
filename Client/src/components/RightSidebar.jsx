import { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import ChatContext from "../Context/ChatContext";
import AuthContext from "../Context/AuthContext";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { onlineUsers, logout } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  // Get All images from the messages and set them to state

  useEffect(() => {
    setImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="h-full w-full text-white flex flex-col">
      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pt-14 pb-24">
        <div className="flex flex-col items-center gap-3 text-xs font-light mx-auto">
          {/* REAL profile image from your data */}
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <h1 className="text-xl font-medium flex items-center gap-2">
            {onlineUsers?.includes?.(selectedUser?._id) && (
              <span className="w-2 h-2 rounded-full bg-green-500" />
            )}
            {selectedUser.fullName}
          </h1>
          <p className="opacity-80 text-center">{selectedUser.bio}</p>
        </div>

        <hr className="border-[#ffffff30] my-4" />

        <div className="px-1 text-xs">
          <p className="opacity-80">Media</p>
          <div className="mt-2 grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto opacity-90">
            {images.map((url, index) => (
              <button
                key={index}
                onClick={() => window.open(url, "_blank")}
                className="rounded overflow-hidden"
                title="Open image"
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover aspect-video"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky footer with Logout (fixed at the bottom) */}
      <div className="sticky bottom-0 left-0 right-0 border-t border-white/10 bg-[#0f0b1f]/80 backdrop-blur px-4 py-4 pb-[env(safe-area-inset-bottom)]">
        <button
          onClick={() => logout()}
          className="w-full py-3 rounded-xl font-medium
                     bg-gradient-to-r from-rose-500 to-red-600
                     shadow-lg shadow-red-800/20
                     hover:brightness-110 active:scale-[0.99]
                     transition"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
