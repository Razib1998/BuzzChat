import { createContext, useContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import AuthContext from "./AuthContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessage, setUnseenMessage] = useState({});

  const { socket, axios } = useContext(AuthContext);

  // Function to get all users for sidebar

  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/messages/users");
      console.log(data);
      if (data.success) {
        setUsers(data.users);
        setUnseenMessage(data.unseenMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function for get all messages

  const getAllMessage = async (userId) => {
    try {
      const { data } = await axios.get(`/api/v1/messages/${userId}`);
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to send message to selected Users

  const sendMessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/v1/messages/send-message/${selectedUser._id}`,
        messageData
      );
      if (data.success) {
        setMessages((prevMessages) => [...prevMessages, data.newMessage]);
      } else {
        toast.error(data.message || "Failed to send Message");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function Subscribe to message for the selected users

  // eslint-disable-next-line no-unused-vars
  const subscribeToMessage = async (newMessage) => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      if (selectedUser && newMessage.senderId === selectedUser._id) {
        newMessage.seen = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        axios.put(`/api/v1/messages/mark/${newMessage._id}`);
      } else {
        setUnseenMessage((prevUnseenMessage) => ({
          ...prevUnseenMessage,
          [newMessage.senderId]: prevUnseenMessage[newMessage.senderId]
            ? prevUnseenMessage[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };

  // Function to unsubscribe from Message

  const unsubscribeFromMessage = async () => {
    if (socket) socket.off("newMessage");
  };

  useEffect(() => {
    subscribeToMessage();
    return () => unsubscribeFromMessage();
  }, [socket, selectedUser]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getAllMessage,
    setMessages,
    sendMessage,
    setSelectedUser,
    unseenMessage,
    setUnseenMessage,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
