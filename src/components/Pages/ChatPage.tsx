import { useParams } from "react-router-dom";
import ChatInput from "../Chat/chat-input";
import ChatMessages from "../Chat/chat-messages";
import ChatSidebar from "../Chat/chat-sidebar";
import { useChat } from "../../context/ChatContext";
import { useEffect } from "react";

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const { chats, setCurrentChat } = useChat();

  useEffect(() => {
    if (id) {
      const chat = chats.find((chat) => chat.id === id);
      if (chat) {
        setCurrentChat(chat);
      }
    } else {
      setCurrentChat(null);
    }
  }, [id, chats, setCurrentChat]);

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar selectedId={id || ""} />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          <ChatMessages />
        </div>
        <div className="p-4 border-t">
          <ChatInput />
        </div>
      </main>
    </div>
  );
}
