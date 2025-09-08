import { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import ChatContext from "../Context/ChatContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { logout, onlineUsers } = useContext(AuthContext);
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessage,
    // eslint-disable-next-line no-unused-vars
    setUnseenMessage,
  } = useContext(ChatContext);
  const safeUsers = Array.isArray(users) ? users : [];

  const filteredUsers = input
    ? safeUsers.filter((u) =>
        u?.fullName?.toLowerCase().includes(input.toLowerCase())
      )
    : safeUsers;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div className="h-full min-h-0 bg-[#8185B2]/10 text-white p-5 rounded-xl flex flex-col">
      {/* Header/Search (shrink-0) */}
      <div className="shrink-0 pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="Logo" className="max-w-40" />
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="max-h-5 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={() => logout()} className="cursor-pointer text-sm">
                Logout
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5 ">
          <img src={assets.search_icon} alt="Search" className="w-3" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search User.."
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
          />
        </div>
      </div>

      {/* User list (flex-1, min-h-0, scroll) */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {filteredUsers.map((singleUser, index) => (
          <div
            key={index}
            onClick={() => setSelectedUser(singleUser)}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm hover:bg-[#282142]/40 transition ${
              selectedUser?._id === singleUser._id ? "bg-[#282142]/50" : ""
            }`}
          >
            <img
              src={singleUser?.profilePic || assets.avatar_icon}
              alt="Profile"
              className="w-[35px] aspect-[1/1] rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p>{singleUser.fullName}</p>
              {(unseenMessage?.[singleUser._id] ?? 0) > 0 && (
                <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                  {unseenMessage[singleUser._id]}
                </p>
              )}

              {onlineUsers?.includes(singleUser._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offline</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
