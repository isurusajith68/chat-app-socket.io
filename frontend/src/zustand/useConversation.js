import { create } from "zustand";

export const useConversation = create((set) => ({
  clickedUser: null,
  messages: [],
  users: [],
  setClickedUser: (user) => set({ clickedUser: user }),
  setMessages: (messages) => set({ messages }),
  setUsers: (users) => set({ users }),
  clearClickedUser: () => set({ clickedUser: null }),
}));
