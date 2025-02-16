export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Chat {
  [x: string]: any;
  chat_ID: string;
  chat_title: string;
  messages: Message[];
}

export interface ChatResponse {
  success: boolean;
  message: string;
  chat_ID: string;
  chat_title: string;
  AI_response: string;
}

export interface ChatsResponse {
  success: boolean;
  allChats: Chat[];
}
