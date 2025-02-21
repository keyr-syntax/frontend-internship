export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Chat {
  chat_ID: string;
  chat_title: string;
  messages: Message[];
}

export interface ChatResponse {
  [x: string]: boolean;
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

export interface User {
  username: string;
  email: string;
  password: string;
}
