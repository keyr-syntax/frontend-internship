import { useState } from "react";
import { Heart, Smile, BookOpen, Send, Moon } from "lucide-react";
import { useChatContext } from "../context/ChatContext";
import { sendMessage } from "../api/chatApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const examples = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Feeling anxious?",
    prompt:
      "I've been feeling really anxious lately. Can you help me calm down?",
  },
  {
    icon: <Smile className="w-6 h-6" />,
    title: "Boost my mood",
    prompt: "I'm feeling down today. Can you suggest something to cheer me up?",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Mindfulness tips",
    prompt: "Can you guide me through a quick mindfulness exercise?",
  },
  {
    icon: <Moon className="w-6 h-6" />,
    title: "Trouble sleeping",
    prompt: "I've been having trouble sleeping. Do you have any advice?",
  },
];

export function WelcomeScreen() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useChatContext();
  const navigate = useNavigate();

  const startNewChat = async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const userMessage = {
        role: "user" as const,
        content: prompt,
        timestamp: new Date(),
      };

      const response = await sendMessage("", prompt);

      const aiMessage = {
        role: "assistant" as const,
        content: response.AI_response,
        timestamp: new Date(),
      };

      const newChat = {
        chat_ID: response.chat_ID,
        chat_title: response.chat_title,
        messages: [userMessage, aiMessage],
      };

      dispatch({ type: "SET_ACTIVE_CHAT", payload: newChat });
      navigate(`/chat/${response.chat_ID}`);
    } catch (error) {
      toast.error("Failed to start chat. Please try again.");
      console.error("Failed to start chat:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="max-w-4xl w-full space-y-8 mb-[180px] ">
        <div className="text-center space-y-4 mt-[180px]">
          <h1 className="text-4xl font-bold text-gray-300">
            Welcome to Calmify. Your AI Therapy Companion
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your personal AI companion for mental health and emotional support.
            How are you feeling today?
          </p>
        </div>

        <div className="w-full  mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              startNewChat(message);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me how you're feeling or what's on your mind..."
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Or try one of these examples to get started:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => startNewChat(example.prompt)}
              disabled={isLoading}
              className="flex items-start p-4 bg-slate-900 rounded-lg border border-slate-800 hover:border-blue-500 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex-shrink-0 mr-4 text-blue-500">
                {example.icon}
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-300">{example.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{example.prompt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
