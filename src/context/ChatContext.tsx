import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Chat, Message } from "../types/chat";

interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  loading: boolean;
  error: string | null;
}

type ChatAction =
  | { type: "SET_CHATS"; payload: Chat[] }
  | { type: "SET_ACTIVE_CHAT"; payload: Chat }
  | { type: "ADD_MESSAGE"; payload: { chatId: string; message: Message } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
} | null>(null);

const initialState: ChatState = {
  chats: [],
  activeChat: null,
  loading: false,
  error: null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "SET_CHATS":
      return { ...state, chats: action.payload };
    case "SET_ACTIVE_CHAT":
      return { ...state, activeChat: action.payload };
    case "ADD_MESSAGE":
      return {
        ...state,
        chats: state.chats.map((chat) =>
          chat.chat_ID === action.payload.chatId
            ? {
                ...chat,
                messages: [...chat.messages, action.payload.message],
              }
            : chat
        ),
        activeChat:
          state.activeChat?.chat_ID === action.payload.chatId
            ? {
                ...state.activeChat,
                messages: [
                  ...state.activeChat.messages,
                  action.payload.message,
                ],
              }
            : state.activeChat,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
}
