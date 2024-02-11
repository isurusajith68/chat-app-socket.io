import React, { useEffect } from "react";
import { Input } from "@nextui-org/react";
import { LuSend } from "react-icons/lu";
import MessageComponent from "./message";
import { useConversation } from "../../zustand/useConversation";
import chat from "../../assets/chat.png";
import axios from "axios";
import { toast } from "react-hot-toast";

const Inbox = () => {
  const [sentMessage, setSentMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const clickedUser = useConversation((state) => state.clickedUser);

  const loggedInUser = JSON.parse(localStorage.getItem("authUser"));

  if (!clickedUser) {
    return (
      <div className="flex h-full w-full min-w-16 flex-col justify-between rounded-lg bg-black p-5 max-sm:hidden">
        <div className="flex h-full flex-col items-center justify-center">
          <img src={chat} alt="logo" className="h-20 w-20" />
          <h1 className="font-serif text-3xl  text-[#0975f1]">
            Welcome to Chat
          </h1>
          <h1 className="font-serif text-xl font-medium capitalize text-rose-500">
            {loggedInUser.username}
          </h1>
          <span className="mt-1 font-serif text-sm font-thin text-yellow-400">
            Select a user to start chat 😎😎
          </span>
        </div>
      </div>
    );
  }

  const sendMessage = async () => {
    if (sentMessage === "") {
      return toast.error("message is empty");
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `api/messages/send/${clickedUser._id}`,
        {
          message: sentMessage,
        },
        {
          withCredentials: true,
        },
      );
      setIsLoading(false);
      setSentMessage("");

      useConversation.setState({
        messages: [...useConversation.getState().messages, res?.data],
      });
    } catch (error) {
      setIsLoading(false);
      console.log(error?.response?.data?.error, "error");
    }
  };

  const handleBack = () => {
    window.location.reload();
  };

  return (
    <div
      className={
        clickedUser
          ? "flex h-full w-full  flex-col justify-between rounded-lg bg-black p-5 max-sm:h-full max-sm:w-full "
          : "flex h-full w-full  flex-col justify-between rounded-lg bg-black p-5 max-sm:hidden"
      }
    >
      <div className="flex justify-between">
        <div
          className={
            clickedUser
              ? "hidden items-center justify-between text-white max-sm:flex"
              : "hidden"
          }
          onClick={handleBack}
        >
          Back
        </div>
        <div className="text-white">
          To :
          <span className="ml-1 capitalize text-[#0975f1]">
            {clickedUser?.username}
          </span>
        </div>
      </div>
      <div className="mb-3 mt-3 overflow-y-scroll px-2 text-white scrollbar">
        <MessageComponent />
      </div>
      <div className="flex items-center justify-center">
        <Input
          radius="lg"
          color="primary"
          size="large"
          classNames={{
            label: "text-white",
            zIndex: "-z-10",
          }}
          onChange={(e) => setSentMessage(e.target.value)}
          value={sentMessage}
          placeholder="Type a message..."
        />
        <div
          onClick={() => sendMessage()}
          className="ml-2 flex h-full w-[40px] items-center justify-center rounded-xl bg-[#e7f1fe]"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-primary"></div>
          ) : (
            <LuSend
              size={18}
              className="pointer-events-none z-10 mb-0.5 flex-shrink-0 cursor-pointer text-primary hover:text-primary-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Inbox;
