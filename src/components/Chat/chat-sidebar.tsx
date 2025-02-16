import { Chat } from "@/types/chat";
import { MessageSquare, Plus } from "lucide-react";

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
}

export function ChatSidebar({ chats, activeChat, onSelectChat, onNewChat }: ChatSidebarProps) {
  console.log(chats[0]?.id);

  return (
    <div className="w-64 bg-gray-950 border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">AI Chat</h1>
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
            className={`w-full flex items-center gap-2 p-2 hover:bg-gray-700 mx-2  bg-gray-950 ${
              activeChat?.chat_ID === chat.chat_ID ? "bg-gray-100" : ""
            }`}
          >
            <span className="text-sm truncate">{chat.chat_title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
