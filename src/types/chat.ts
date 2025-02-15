export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Chat {
  chat_ID: string;
  chat_title: string;
  messages: ChatMessage[];
}

export interface AIResponse {
  success: boolean;
  message: string;
  chat_ID: string;
  chat_title: string;
  AI_response: string;
}
