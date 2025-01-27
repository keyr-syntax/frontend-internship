import { useParams } from "react-router-dom";
import ChatInput from "../Chat/chat-input";
import ChatMessages from "../Chat/chat-messages";
import ChatSidebar from "../Chat/chat-sidebar";

export default function ChatPage() {
  const { id = null } = useParams();
  console.log(id);

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar selectedId="21" />
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
