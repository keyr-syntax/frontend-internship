/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchPreviousChats, sendMessage } from "@/api/chatApi";
import { useChatContext } from "@/context/ChatContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatSidebar } from "./chat-sidebar";
import { ChatMain } from "./chat-main";
import { ChatInput } from "./chat-input";

export function ChatLayout({ children }: { children?: React.ReactNode }) {
  const { state, dispatch } = useChatContext();
  const navigate = useNavigate();

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

    if (state.activeChat) {
      dispatch({
        type: "ADD_MESSAGE",
        payload: { chatId: state.activeChat.chat_ID, message: userMessage },
      });
    }

    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await sendMessage(state.activeChat?.chat_ID || "", content);

      const aiMessage = {
        role: "assistant" as const,
        content: response.AI_response,
        timestamp: new Date(),
      };

      if (!state.activeChat) {
        const newChat = {
          chat_ID: response.chat_ID,
          chat_title: response.chat_title,
          messages: [userMessage, aiMessage],
        };
        dispatch({ type: "SET_ACTIVE_CHAT", payload: newChat });
        navigate(`/chat/${response.chat_ID}`);
      } else {
        dispatch({
          type: "ADD_MESSAGE",
          payload: { chatId: state.activeChat.chat_ID, message: aiMessage },
        });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to send message" });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const handleNewChat = () => {
    navigate("/chat");
  };
  console.log("messages", state.activeChat?.chat_title);

  return (
    <div className="h-screen flex  w-full">
      <ChatSidebar
        chats={state.chats}
        activeChat={state.activeChat}
        onSelectChat={(chat) => {
          navigate(`/chat/${chat._id}`);
        }}
        onNewChat={handleNewChat}
      />
      <div className=" flex flex-col w-full">
        <h1 className="w-full text-center sticky left-0 right-5 top-0 z-50 backdrop-blur- p-4 ">
          {state.activeChat?.chat_title}
        </h1>
        {children || (
          <>
            <ChatMain messages={state.activeChat?.messages || []} loading={state.loading} />
            <ChatInput onSendMessage={handleSendMessage} disabled={state.loading} />
          </>
        )}
      </div>
    </div>
  );
}
