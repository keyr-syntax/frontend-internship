import { Chat } from "@/lib/types";
import { MessageSquare, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
}

// TODO : CREATE A HERO SECTION THAT SAYS SOMETHING LIKE WELCOME TO YOUR AI THERAPY SESSION AND HAVE DEMO QUESTIONS USERS CAN ASK TO GET STARTED

export function ChatSidebar({ chats, activeChat, onSelectChat, onNewChat }: ChatSidebarProps) {
  return (
    <div className="w-64 bg-gray-900 border-r h-full flex flex-col">
      <div className="p-4 border-b-2">
        <h1>AI THERAPY</h1>
      </div>
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="h-5 w-5" />
          New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.chat_ID}
            onClick={() => onSelectChat(chat)}
            className={`w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-900 ${
              activeChat?.chat_ID === chat.chat_ID ? "bg-gray-900" : ""
            }`}
          >
            <MessageSquare className="h-5 w-5 text-gray-500" />
            <span className="text-sm truncate">{chat.chat_title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
