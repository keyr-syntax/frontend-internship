"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useChat } from "../../context/ChatContext";
import toast from "react-hot-toast";
import Loader from "../Loader";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentChat, startNewChat, continueChat } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      if (currentChat) {
        await continueChat(message);
      } else {
        await startNewChat(message);
      }
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast(" Error sending message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 -py-2">
      <Input
        placeholder="Start talking with AI..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !message.trim()}>
        {isLoading ? <Loader /> : <SendHorizontal className="h-4 w-4" />}

        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
