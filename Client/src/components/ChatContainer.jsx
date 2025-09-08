import { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import ChatContext from "../Context/ChatContext";
import AuthContext from "../Context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = ({ onHeaderClick }) => {
  const {
    messages = [],
    selectedUser,
    setSelectedUser,
    sendMessage,
    getAllMessage,
  } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState("");

  const bottomRef = useRef(null);
  const MY_ID = String(authUser?._id ?? "");

  const text = (input ?? "").trim();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text) return;
    await sendMessage({ text });
    setInput("");
  };

  // Handle Sending image

  const handleImageSend = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getAllMessage(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (bottomRef.current && messages) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="h-full min-h-0 w-full flex flex-col backdrop-blur-lg">
      {/* Header (shrink-0) */}
      <div
        className="shrink-0 flex items-center gap-3 py-3 px-4 border-b border-stone-500 cursor-pointer select-none"
        onClick={onHeaderClick}
        role="button"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedUser(null);
          }}
          aria-label="Back to users"
          className="p-1 rounded hover:bg-white/10 transition"
        >
          <img src={assets.arrow_icon} alt="" className="w-6" />
        </button>

        <img
          src={selectedUser.profilePic}
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <p className="flex text-lg text-white items-center gap-2">
          {selectedUser.fullName}{" "}
          {onlineUsers?.includes?.(selectedUser?._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500" />
          )}
        </p>
        <img src={assets.help_icon} alt="" className="w-5 ml-auto opacity-70" />
      </div>

      {/* Messages (flex-1, min-h-0, scroll) */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3">
        {messages.map((msg, index) => {
          const isSelf = String(msg.senderId) === authUser._id;

          return (
            <div
              key={msg._id ?? index}
              className={`flex items-end gap-2 mb-3 ${
                isSelf ? "justify-end" : "justify-start"
              }`}
            >
              {!isSelf && (
                <div className="text-center text-[11px] leading-4">
                  <img
                    src={
                      isSelf
                        ? authUser?.profilePic || assets.avatar_icon
                        : selectedUser?.profilePic || assets.avatar_icon
                    }
                    alt=""
                    className="w-7 h-7 rounded-full"
                  />
                  <p className="text-gray-500">
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </div>
              )}

              {msg.image ? (
                <img
                  src={msg.image}
                  alt="Image"
                  className={`max-w-[70%] md:max-w-[60%] border border-gray-700 rounded-lg overflow-hidden ${
                    isSelf ? "rounded-br-none" : "rounded-bl-none"
                  }`}
                />
              ) : (
                <p
                  className={`p-2 mb-3 max-w-[75%] md:max-w-[65%] md:text-sm font-light rounded-lg break-words text-white ${
                    isSelf
                      ? "bg-violet-500/30 rounded-br-none"
                      : "bg-white/10 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </p>
              )}

              {isSelf && (
                <div className="text-center text-[11px] leading-4">
                  <img
                    src={
                      isSelf
                        ? authUser?.profilePic || assets.avatar_icon
                        : selectedUser?.profilePic || assets.avatar_icon
                    }
                    alt=""
                    className="w-7 h-7 rounded-full"
                  />
                  <p className="text-gray-500">
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Composer (shrink-0) */}
      <div className="shrink-0 border-t border-stone-600 p-3 bg-black/30 backdrop-blur pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) =>
                e.key === "Enter" ? handleSendMessage(e) : null
              }
              type="text"
              placeholder="Type Your Message"
              className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
            />
            <input
              onChange={handleImageSend}
              type="file"
              id="image"
              accept="image/png,image/jpg,image/jpeg"
              hidden
            />
            <label htmlFor="image">
              <img
                src={assets.gallery_icon}
                alt=""
                className="w-5 mr-2 cursor-pointer"
              />
            </label>
          </div>
          <button className="p-2 rounded-full hover:bg-white/10 transition">
            <img
              onClick={handleSendMessage}
              src={assets.send_button}
              alt=""
              className="w-7"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
