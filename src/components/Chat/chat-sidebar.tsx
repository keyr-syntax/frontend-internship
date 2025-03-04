import { useContext, useState } from "react";
import { Chat } from "@/types/chat";
import { Plus, LogOut, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AuthContext } from "@/context/AuthProvider";

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
}

export function ChatSidebar({
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
}: ChatSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const logout = authContext?.logout;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    navigate("/");
  };

  return (
    <>
      {!closeMenu && (
        <span className="md:hidden absolute top-5 right-4 text-white cursor-pointer z-50 p-1">
          <Menu
            size={35}
            onClick={() => {
              setIsSidebarOpen(true);
              setCloseMenu(true);
            }}
          />
        </span>
      )}

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-950 border-r h-full flex flex-col transform transition-transform md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex`}
      >
        <span
          title="close"
          className="md:hidden absolute top-5 right-4 text-white cursor-pointer z-50 p-1"
          onClick={() => {
            setIsSidebarOpen(false);
            setCloseMenu(false);
          }}
        >
          <X size={35} />
        </span>

        <div className="p-4 border-b">
          <Link to="/">
            <h1 className="text-xl font-semibold">Calmify</h1>
          </Link>
        </div>
        <div className="p-4">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
            Start new Chat
          </button>
        </div>
        <div className="overflow-y-scroll overflow-x-hidden flex-1">
          {chats.map((chat) => (
            <button
              key={chat._id}
              onClick={() => onSelectChat(chat)}
              className={`w-full flex items-center gap-2 p-2 hover:bg-gray-700 mx-2 bg-gray-950 ${
                activeChat?.chat_ID === chat._id ? "bg-slate-700" : ""
              }`}
            >
              <span className="text-sm truncate">{chat.chat_title}</span>
            </button>
          ))}
        </div>
        <div className="p-3 border-t mt-auto">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger className="w-full h-full">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm">{user?.username}</span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Logout</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-500">
                  Are you sure you want to log out?
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
