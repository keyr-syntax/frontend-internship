import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import { Message } from "@/lib/types";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.role === "assistant";
  const content = typeof message.content === "string" ? message.content : "";

  return (
    <div className={`flex gap-3 p-4 w-full ${isAI ? "justify-start" : "justify-end"}`}>
      <div className={`flex gap-3 items-center ${isAI ? "flex-row" : "flex-row-reverse"}`}>
        <div
          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
            isAI ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          {isAI ? (
            <Bot className="h-5 w-5 text-white" />
          ) : (
            <User className="h-5 w-5 text-gray-300" />
          )}
        </div>
        <div className={`flex-1 ${isAI ? "bg-gray-900" : "bg-gray-800"} p-3 rounded-lg`}>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-200">{isAI ? "AI Assistant" : "You"}</span>
            <span className="text-xs text-gray-500">
              {format(new Date(message.timestamp), "HH:mm")}
            </span>
          </div>
          <div className="mt-1 prose prose-sm max-w-none prose-invert">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
