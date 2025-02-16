/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChatContext } from "../../context/ChatContext";
import { fetchChat } from "../../api/chatApi";
import { toast } from "react-hot-toast";
import { ChatLayout } from "../Chat/chat-layout";
import { WelcomeScreen } from "../WelcomeScreen";

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useChatContext();

  useEffect(() => {
    if (id) {
      const loadChat = async () => {
        try {
          dispatch({ type: "SET_LOADING", payload: true });
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
            navigate("/chat");
          }
        } catch (error) {
          toast.error("Failed to load chat");
          navigate("/chat");
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      };

      loadChat();
    } else {
      // Reset active chat when on /chat route
      dispatch({ type: "SET_ACTIVE_CHAT", payload: null });
    }
  }, [id, dispatch, navigate]);

  return (
    <div className="h-screen flex">
      <ChatLayout>{!id && !state.activeChat?.messages?.length && <WelcomeScreen />}</ChatLayout>
    </div>
  );
}
