import { fetchPreviousChats, sendMessage } from "@/api/chatApi";
import { useChatContext } from "@/context/ChatContext";
import { useEffect } from "react";
import { ChatSidebar } from "./chat-sidebar";
import { ChatMain } from "./chat-main";
import { ChatInput } from "./chat-input";

export function ChatLayout() {
  const { state, dispatch } = useChatContext();

  useEffect(() => {
    const loadChats = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await fetchPreviousChats();
        if (response.success) {
          dispatch({ type: "SET_CHATS", payload: response.allChats });
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to load chats" });
        console.log("error : ", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadChats();
  }, [dispatch]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage = {
      role: "user" as const,
      content,
      timestamp: new Date(),
    };

    const chatId = state.activeChat?.chat_ID || "";

    if (state.activeChat) {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { chatId: state.activeChat.chat_ID, message: userMessage },
      });
    }

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await sendMessage(chatId, content);

      if (response.success) {
        const aiMessage = {
          role: "assistant" as const,
          content: response.AI_response,
          timestamp: new Date(),
        };

        if (!state.activeChat) {
          dispatch({
            type: "SET_ACTIVE_CHAT",
            payload: {
              chat_ID: response.chat_ID,
              chat_title: response.chat_title,
              messages: [userMessage, aiMessage],
            },
          });
        } else {
          dispatch({
            type: "ADD_MESSAGE",
            payload: { chatId: state.activeChat.chat_ID, message: aiMessage },
          });
        }
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to send message" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const handleNewChat = () => {
    dispatch({ type: "SET_ACTIVE_CHAT", payload: null });
  };

  return (
    <div className="h-screen flex bg-gray-950">
      <ChatSidebar
        chats={state.chats}
        activeChat={state.activeChat}
        onSelectChat={(chat) => dispatch({ type: "SET_ACTIVE_CHAT", payload: chat })}
        onNewChat={handleNewChat}
      />
      <div className="flex-1 flex flex-col">
        <ChatMain messages={state.activeChat?.messages || []} loading={state.loading} />
        <ChatInput onSendMessage={handleSendMessage} disabled={state.loading} />
      </div>
    </div>
  );
}
