/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mails, UserIcon, FishIcon as Whale } from "lucide-react";
import { useChat } from "../../context/ChatContext";
import { useParams } from "react-router-dom";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ChatMessages() {
  const { currentChat } = useChat();
  const { id } = useParams<{ id: string }>();
  // console.log(id);
  const chatTitle = currentChat?.messages?.chat_title;

  console.log("currentChat : ", currentChat?.messages?.chat_title);
  if (!id) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="rounded-full bg-primary/10 p-4 mb-4">
          <Whale className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">
          Hi, I'm your AI assistant.
        </h2>
        <p className="text-muted-foreground">How can I help you today?</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col  relative">
      <h1 className="w-full text-center sticky left-0 right-5 top-0 z-50 backdrop-blur-3xl p-4 bg-white/10 text-white">
        {chatTitle}
      </h1>
      {currentChat?.messages?.messages.map(
        (
          message: {
            role: string;
            content:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
          },
          index: Key | null | undefined
        ) => (
          <div
            key={index}
            className={`flex items-center gap-4  p-4 space-y-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role !== "user" && (
              <Avatar className="h-8 w-8 ">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  <Mails />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[60%] p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.content}
            </div>
            {message.role === "user" && (
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        )
      )}
    </div>
  );
}
