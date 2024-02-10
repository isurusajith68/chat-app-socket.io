import { useEffect } from "react";

import notificationSound from "../assets/sounds/notification.mp3";
import { useSocketContext } from "../context/Socket";
import { useConversation } from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
   console.log(socket)
    socket?.on("newMessage", (newMessage) => {
   
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);

    });


    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
