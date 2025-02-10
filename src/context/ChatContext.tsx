import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { type User, getStoredUser } from "../lib/auth";
import toast from "react-hot-toast";

interface Message {
  role: "user" | "ai";
  content: string;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  setCurrentChat: (chat: Chat | null) => void;
  addMessage: (message: Message) => void;
  startNewChat: (question: string) => Promise<void>;
  continueChat: (question: string) => Promise<void>;
  fetchPreviousChats: () => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    if (storedUser) {
      fetchPreviousChats();
    }
  }, []);

  const addMessage = (message: Message) => {
    if (currentChat) {
      setCurrentChat({
        ...currentChat,
        messages: [...currentChat.messages, message],
      });
    }
  };

  const startNewChat = async (question: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/chat/chat_with_ai",
        { chat_ID: "", user_question: question },
        { withCredentials: true }
      );

      const data = response.data;
      const newChat: Chat = {
        id: data.chat_ID,
        title: data.chat_title,
        messages: [
          { role: "user", content: question },
          { role: "ai", content: data.AI_response },
        ],
      };

      setChats([newChat, ...chats]);
      setCurrentChat(newChat);
    } catch (error) {
      console.error("Error starting new chat:", error);
      toast("Error starting new chat");
    }
  };

  const continueChat = async (question: string) => {
    if (!currentChat) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/chat/chat_with_ai",
        { chat_ID: currentChat.id, user_question: question },
        { withCredentials: true }
      );

      const data = response.data;
      addMessage({ role: "user", content: question });
      addMessage({ role: "ai", content: data.AI_response });
    } catch (error) {
      console.error("Error continuing chat:", error);
      toast("Error continuing chat ");
    }
  };

  const fetchPreviousChats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/chat/previous_chats", {
        withCredentials: true,
      });

      const data = response.data;
      console.log("DATA : ", data.chat);

      setChats(
        data.allChats.map((chat: any) => ({
          id: chat._id,
          title: chat.chat_title,
          messages: chat,
        }))
      );
    } catch (error) {
      console.error("Error fetching previous chats:", error);
      toast("Error fetching all chats ");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        setCurrentChat,
        addMessage,
        startNewChat,
        continueChat,
        fetchPreviousChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    toast("useChat must be used within a ChatProvider ");
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
