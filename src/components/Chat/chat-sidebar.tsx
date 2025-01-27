import { MessageCircle, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

export default function ChatSidebar({ selectedId }: { selectedId: string }) {
  const conversations = [
    { id: "1", title: "Mental Health Check-in" },
    { id: "2", title: "Stress Management" },
    { id: "3", title: "Anxiety Discussion" },
  ];

  //   const router = useRouter()
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<string>(selectedId);

  const handleSelectMessage = (message: string) => {
    console.log("Sending message:", message);
    setSelectedChat(message);
        toast("Selected chat: " + message);
    navigate(`/chat/${message}`);
  };

  const newChat = () => {
    console.log("New chat");
    toast("New chat");
    setSelectedChat("");
    navigate(`/chat`);
  };

  return (
    <div className="w-80 border-r flex flex-col bg-background">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Therapist</h1>
      </div>
      <div className="p-4">
        <Button className="w-full" variant="secondary" onClick={newChat}>
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          New chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant={selectedChat === conversation.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleSelectMessage(conversation.id)}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {conversation.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t mt-auto">
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>MP</AvatarFallback>
          </Avatar>
          <span className="ml-2 text-sm">My Profile</span>
        </div>
      </div>
    </div>
  );
}
