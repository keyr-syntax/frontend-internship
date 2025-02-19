/* eslint-disable @typescript-eslint/no-unused-vars */
import api from "@/lib/api";
import { ChatResponse, ChatsResponse } from "@/lib/types";

export async function sendMessage(
  chatId: string,
  message: string
): Promise<ChatResponse> {
  try {
    const response = await api.post<ChatResponse>("/chat/chat_with_ai", {
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
    const response = await api.get<ChatsResponse>("/chat/previous_chats");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch previous chats");
  }
}

export async function fetchChat(chatId: string): Promise<ChatResponse> {
  try {
    const response = await api.get<ChatResponse>(`/chat/find_chat/${chatId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch chat");
  }
}
