import { MessageCircleHeart, MessageSquarePlus } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { useChat } from "../../context/ChatContext";
import { getStoredUser } from "../../lib/auth";
import axios from "axios";
import toast from "react-hot-toast";

export default function ChatSidebar({ selectedId }: { selectedId: string }) {
  const navigate = useNavigate();
  const { chats, setCurrentChat } = useChat();
  const user = getStoredUser();

  const handleSelectMessage = async (chatId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/chat/find_chat/${chatId}`,
        { withCredentials: true }
      );

      const data = response.data;
      if (data.success) {
        setCurrentChat(data.chat.messages);
        navigate(`/chat/${chatId}`);
      } else {
        toast.error("Failed to fetch conversation");
      }
    } catch (error) {
      console.log("Error while fetching chat by ID", error);
    }
  };

  const newChat = () => {
    setCurrentChat(null);
    navigate(`/chat`);
  };

  console.log(chats);

  return (
    <div className="w-80 border-r flex flex-col bg-background">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">AI Chat</h1>
      </div>
      <div className="p-4">
        <Button className="w-full" variant="secondary" onClick={newChat}>
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          New chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant={selectedId === chat.id ? "secondary" : "ghost"}
              className="w-11/12 mx-auto justify-start"
              onClick={() => handleSelectMessage(chat.id)}
            >
              <MessageCircleHeart className="mr-` h-4 w-4" />
              {chat.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t mt-auto">
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="ml-2 text-sm">{user?.username}</span>
        </div>
      </div>
    </div>
  );
}
