import { useState } from "react";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const [user, setUser] = useState(false);
  return (
    <div className="border w-full h-screen sm:px-[15%] sm:py-[5%]">
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative ${
          user
            ? " md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
            : "md:grid-cols-2"
        }`}
      >
        <Sidebar user={user} setUser={setUser} />
        <ChatContainer user={user} setUser={setUser} />
        <RightSidebar user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default HomePage;
