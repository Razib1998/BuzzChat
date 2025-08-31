import { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ user, setUser }) => {
  const scrollEnd = useRef(null);

  // Use the real logged-in user's id if available, otherwise fall back to your dummy self id
  const MY_ID = String(user?._id ?? "680f50e4f10f3cd28382ecf9");

  useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return user ? (
    <div className="h-full overflow-auto relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500 rounded-2xl px-4">
        <img src={user.profilePic} alt="" className="w-8 rounded-full" />
        <p className="flex text-lg text-white items-center gap-2">
          {user.fullName} <span className="w-2 h-2 rounded-full bg-green-500" />
        </p>
        <img
          onClick={() => setUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7"
        />
        <img
          src={assets.help_icon}
          alt=""
          className="max-md:hidden max-w-7 ml-auto"
        />
      </div>

      {/* Chat Area */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((msg, index) => {
          const isSelf = String(msg.senderId) === MY_ID;

          return (
            <div
              key={msg._id ?? index}
              className={`flex items-end gap-2 mb-4 ${
                isSelf ? "justify-end" : "justify-start"
              }`}
            >
              {/* Left avatar/time (other user) */}
              {!isSelf && (
                <div className="text-center text-xs">
                  <img
                    src={assets.profile_martin}
                    alt=""
                    className="w-7 rounded-full"
                  />
                  <p className="text-gray-500">
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </div>
              )}

              {/* Bubble / Image */}
              {msg.image ? (
                <img
                  src={msg.image}
                  alt="Image"
                  className={`max-w-[230px] border border-gray-700 rounded-lg overflow-hidden ${
                    isSelf ? "rounded-br-none" : "rounded-bl-none"
                  }`}
                />
              ) : (
                <p
                  className={`p-2 max-w-[260px] md:text-sm font-light rounded-lg break-words text-white ${
                    isSelf
                      ? "bg-violet-500/30 rounded-br-none"
                      : "bg-white/10 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </p>
              )}

              {/* Right avatar/time (self) */}
              {isSelf && (
                <div className="text-center text-xs">
                  <img
                    src={assets.avatar_icon}
                    alt=""
                    className="w-7 rounded-full"
                  />
                  <p className="text-gray-500">
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <div ref={scrollEnd} />
      </div>

      {/* Text Area */}

      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            type="text"
            placeholder="Type Your Message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
          />
          <input
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
        <img src={assets.send_button} alt="" className="w-7  cursor-pointer" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} alt="Logo" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat Anytime, Anywhere</p>
    </div>
  );
};

export default ChatContainer;
