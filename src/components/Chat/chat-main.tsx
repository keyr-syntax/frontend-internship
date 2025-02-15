import { Message } from "@/lib/types";
import { useRef, useEffect } from "react";
import { ChatMessage } from "./chat-messages";
import { LoadingSpinner } from "../Loader";

interface ChatMainProps {
  messages: Message[];
  loading?: boolean;
}

export function ChatMain({ messages, loading }: ChatMainProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-950">
      <div className="w-11/12 mx-auto">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {loading && (
          <div className="p-4">
            <LoadingSpinner />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
