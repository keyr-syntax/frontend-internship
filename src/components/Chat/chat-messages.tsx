/* eslint-disable @typescript-eslint/no-unused-vars */
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";
import { Message } from "@/lib/types";
import { motion } from "framer-motion";
import rehypeHighlight from "rehype-highlight";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.role === "assistant";
  const content = typeof message.content === "string" ? message.content : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 p-4 w-full ${isAI ? "justify-start" : "justify-end"}`}
    >
      <div className={`flex gap-3 items-start max-w-2xl ${isAI ? "flex-row" : "flex-row-reverse"}`}>
        {/* Profile Icon */}
        <div
          className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center ${
            isAI ? "bg-gradient-to-br from-blue-600 to-indigo-500 shadow-lg" : "bg-gray-700"
          }`}
        >
          {isAI ? (
            <Bot className="h-5 w-5 text-white" />
          ) : (
            <User className="h-5 w-5 text-gray-300" />
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`relative flex-1 p-3 rounded-xl shadow-lg ${
            isAI
              ? "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700"
              : "bg-gray-800 border border-gray-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-200">{isAI ? "AI Therapy" : "You"}</span>
            <span className="text-xs text-gray-500">
              {format(new Date(message.timestamp), "HH:mm")}
            </span>
          </div>

          {/* Message Content */}
          <div className="mt-2 text-gray-300 text-sm leading-relaxed prose prose-sm max-w-none prose-invert">
            <ReactMarkdown
              // @ts-expect-error Server Component
              rehypePlugins={[rehypeHighlight]}
              components={{
                p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                em: ({ node, ...props }) => <em className="italic" {...props} />,
                a: ({ node, ...props }) => (
                  <a
                    className="text-blue-400 hover:text-blue-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                code: ({ node, ...props }) => (
                  <code className="bg-gray-800 px-2 py-1 rounded-md text-sm font-mono" {...props} />
                ),
                pre: ({ node, ...props }) => (
                  <pre
                    className="bg-gray-800 p-4 rounded-md overflow-x-auto text-sm font-mono my-4"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-gray-600 pl-4 italic text-gray-400"
                    {...props}
                  />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* Animated Typing Effect (Optional) */}
          {isAI && !content && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-1 text-gray-500"
            >
              Typing...
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
