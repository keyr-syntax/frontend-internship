import { ChatResponse, ChatsResponse } from "@/lib/types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/chat",
  withCredentials: true,
});

export async function sendMessage(chatId: string, message: string): Promise<ChatResponse> {
  try {
    const response = await api.post<ChatResponse>("/chat_with_ai", {
      chat_ID: chatId,
      user_question: message,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to send message");
  }
}

export async function fetchPreviousChats(): Promise<ChatsResponse> {
  try {
    const response = await api.get<ChatsResponse>("/previous_chats");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch previous chats");
  }
}

export async function fetchChat(chatId: string): Promise<ChatResponse> {
  try {
    console.log(chatId);
    const response = await api.get<ChatResponse>(`/find_chat/${chatId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch chat");
  }
}
