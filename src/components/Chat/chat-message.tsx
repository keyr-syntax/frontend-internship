"use client";

import { useEffect, useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User } from "lucide-react";
import { ChatMessage } from "@/types/chat";

export function ChatMessages({ messages }: { messages: ChatMessage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea ref={scrollRef} className="h-[calc(100vh-180px)]">
      <div className="flex flex-col gap-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === "assistant" ? "bg-accent/50" : ""
            } p-4 rounded-lg`}
          >
            <Avatar className="h-8 w-8">
              {message.role === "assistant" ? (
                <Bot className="h-5 w-5" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </Avatar>
            <div className="flex-1">
              <div className="prose prose-sm dark:prose-invert">{message.content}</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
