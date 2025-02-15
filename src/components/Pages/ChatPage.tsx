// import { useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useChatContext } from "../../context/ChatContext";
// import { fetchChat } from "../../api/chatApi";
// import { toast } from "react-hot-toast";
// import { ChatLayout } from "../Chatsss/chat-layout";

// export default function ChatPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { dispatch } = useChatContext();

//   useEffect(() => {
//     // Reset active chat for new conversations
//     if (location.pathname === "/chat/new") {
//       dispatch({ type: "SET_ACTIVE_CHAT", payload: null });
//       return;
//     }

//     // Load existing chat
//     if (id && id !== "new") {
//       const loadChat = async () => {
//         try {
//           dispatch({ type: "SET_LOADING", payload: true });
//           console.log("ID", id);

//           const response = await fetchChat(id);
//           if (response.success && response.chat) {
//             dispatch({
//               type: "SET_ACTIVE_CHAT",
//               payload: {
//                 chat_ID: id,
//                 chat_title: response.chat.chat_title || "Untitled Chat",
//                 messages: response.chat.messages.map((msg: any) => ({
//                   role: msg.role,
//                   content: msg.content,
//                   timestamp: new Date(msg.timestamp),
//                 })),
//               },
//             });
//           } else {
//             toast.error("Chat not found");
//             navigate("/chat/new");
//           }
//         } catch (error) {
//           toast.error("Failed to load chat");
//           navigate("/chat/new");
//         } finally {
//           dispatch({ type: "SET_LOADING", payload: false });
//         }
//       };

//       loadChat();
//     }
//   }, [id, dispatch, navigate, location.pathname]);

//   return <ChatLayout />;
// }

"use client";

import { useState } from "react";
import { ChatList } from "@/components/chat/chat-list";
import { ChatMessages } from "@/components/chat/chat-message";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessage } from "@/types/chat";
import api from "@/lib/axios";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentChatId, setCurrentChatId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      setMessages((prev) => [...prev, { role: "user", content: message }]);

      const response = await api.post("/chat/chat_with_ai", {
        chat_ID: currentChatId,
        user_question: message,
      });

      if (response.data.success) {
        setCurrentChatId(response.data.chat_ID);
        setMessages((prev) => [...prev, { role: "assistant", content: response.data.AI_response }]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChat = async (chatId: string) => {
    if (!chatId) {
      setCurrentChatId("");
      setMessages([]);
      return;
    }

    try {
      const response = await api.get(`/chat/find_chat/${chatId}`);
      if (response.data.success) {
        setCurrentChatId(chatId);
        // Transform the chat history into the messages format
        // You'll need to adjust this based on your actual API response structure
        setMessages(response.data.chat.messages || []);
      }
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r">
        <ChatList onSelectChat={handleSelectChat} selectedChatId={currentChatId} />
      </div>
      <div className="flex-1 flex flex-col">
        <ChatMessages messages={messages} />
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
