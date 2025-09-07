import { useState } from "react";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div
        className="
          w-full max-w-[900px] md:max-w-[1000px]
          h-[85vh]
          backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden relative
        "
      >
        {!selectedUser && (
          <Sidebar
            user={selectedUser}
            setUser={(u) => {
              setSelectedUser(u);
              setShowProfile(false);
            }}
          />
        )}

        {selectedUser && (
          <>
            <ChatContainer
              user={selectedUser}
              setUser={(u) => {
                setSelectedUser(u);
                setShowProfile(false);
              }}
              onHeaderClick={() => setShowProfile(true)}
            />

            {/* Right Sidebar Slide-over */}
            <div
              className={`
                absolute inset-0 z-40
                ${showProfile ? "pointer-events-auto" : "pointer-events-none"}
              `}
              aria-hidden={!showProfile}
            >
              {/* Backdrop */}
              <div
                className={`
                  absolute inset-0 bg-black/40 transition-opacity
                  ${showProfile ? "opacity-100" : "opacity-0"}
                `}
                onClick={() => setShowProfile(false)}
              />

              {/* Panel */}
              <div
                className={`
                  absolute right-0 top-0 h-full
                  w-[85%] max-w-[340px]
                  bg-[#1b1630]/95 backdrop-blur
                  border-l border-gray-600
                  transition-transform duration-300
                  ${showProfile ? "translate-x-0" : "translate-x-full"}
                `}
              >
                <RightSidebar user={selectedUser} />
                <button
                  onClick={() => setShowProfile(false)}
                  className="absolute top-3 right-3 text-md bg-green-600 hover:bg-white/20 px-3 py-1 rounded-md"
                >
                  X
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
