import { create } from "zustand";

export const useConversation = create((set) => ({
    clickedUser: null,
  setClickedUser: (user) => set({ clickedUser: user }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  clearClickedUser: () => set({ clickedUser: null }),

}));