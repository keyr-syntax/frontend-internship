import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useChatContext } from "../../context/ChatContext";
import { fetchChat } from "../../api/chatApi";
import { toast } from "react-hot-toast";
import { ChatLayout } from "../Chat/chat-layout";

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useChatContext();

  useEffect(() => {
    // Reset active chat for new conversations
    if (location.pathname === "/chat/new") {
      dispatch({ type: "SET_ACTIVE_CHAT", payload: null });
      return;
    }

    // Load existing chat
    if (id && id !== "new") {
      const loadChat = async () => {
        try {
          dispatch({ type: "SET_LOADING", payload: true });
          console.log("ID", id);

          const response = await fetchChat(id);
          if (response.success && response.chat) {
            dispatch({
              type: "SET_ACTIVE_CHAT",
              payload: {
                chat_ID: id,
                chat_title: response.chat.chat_title || "Untitled Chat",
                messages: response.chat.messages.map((msg: any) => ({
                  role: msg.role,
                  content: msg.content,
                  timestamp: new Date(msg.timestamp),
                })),
              },
            });
          } else {
            toast.error("Chat not found");
            navigate("/chat/new");
          }
        } catch (error) {
          toast.error("Failed to load chat");
          navigate("/chat/new");
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      };

      loadChat();
    }
  }, [id, dispatch, navigate, location.pathname]);

  return <ChatLayout />;
}
