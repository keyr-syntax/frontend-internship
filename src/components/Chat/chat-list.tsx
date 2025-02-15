"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/axios";
import { Chat } from "@/types/chat";

export function ChatList({
  onSelectChat,
  selectedChatId,
}: {
  onSelectChat: (chatId: string) => void;
  selectedChatId?: string;
}) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await api.get("/chat/previous_chats");
        if (response.data.success) {
          setChats(response.data.allChats);
        }
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <ScrollArea className="h-screen w-full">
      <div className="flex flex-col gap-2 p-4">
        <button
          onClick={() => onSelectChat("")}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
            !selectedChatId && "bg-accent"
          )}
        >
          <MessageCircle className="h-4 w-4" />
          <span>New Chat</span>
        </button>
        {chats.map((chat) => (
          <button
            key={chat.chat_ID}
            onClick={() => onSelectChat(chat.chat_ID)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
              selectedChatId === chat.chat_ID && "bg-accent"
            )}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="line-clamp-1">{chat.chat_title}</span>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
