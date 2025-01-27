import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Input } from "../ui/input";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    toast(message);
    if (!message.trim()) return;
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 -py-2">
      <Input
        placeholder="Start talking with AI..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        className="flex-1"
      />
      <Button type="submit" disabled={disabled || !message.trim()}>
        <SendHorizontal className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
