import React from "react";
import { Input } from "@nextui-org/react";
import { LuSend } from "react-icons/lu";
import MessageComponent from "./message";
import { useConversation } from "../../zustand/useConversation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { PiWechatLogoFill } from "react-icons/pi";
import { useSideBarContext } from "../../context/SideBarContext";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

import EmojiPicker from "emoji-picker-react";

const Inbox = () => {
  const [sentMessage, setSentMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isEmoji, setIsEmoji] = React.useState(false);

  const clickedUser = useConversation((state) => state.clickedUser);

  const loggedInUser = JSON.parse(localStorage.getItem("authUser"));

  const { nav, setNav } = useSideBarContext((state) => state.nav);
  const handleNav = () => {
    setNav(!nav);
  };
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
  if (!clickedUser) {
    return (
      <div className="flex h-full w-full min-w-16 flex-col justify-between rounded-lg bg-neutral-100 p-5 dark:bg-neutral-900 max-sm:hidden">
        <div className="flex h-full flex-col items-center justify-center text-center">
          <PiWechatLogoFill
            size={100}
            className="text-[#0975f1] dark:text-white"
          />
          <h1 className=" text-2xl  font-bold tracking-widest text-[#0975f1] dark:text-white">
            Hey {loggedInUser.username} 👋
          </h1>
          <h1 className="mt-2 text-xl font-semibold tracking-widest text-[#0975f1] dark:text-white">
            Welcome to Chat App
          </h1>
          <span
            className="
            mt-2  text-sm  font-semibold tracking-widest text-[#0975f1] dark:text-white"
          >
            Start a conversation with your friends 🚀
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        clickedUser
          ? "flex h-full w-full  flex-col justify-between rounded-lg bg-neutral-100 p-5 dark:bg-neutral-900 max-sm:h-full max-sm:w-full "
          : "flex h-full w-full  flex-col justify-between rounded-lg bg-neutral-100 p-5 dark:bg-neutral-900 max-sm:hidden"
      }
    >
      <div className=" flex justify-between rounded-md p-1 shadow-md">
        <div
          onClick={handleNav}
          className="flex items-center justify-center sm:hidden"
        >
          {nav ? (
            <AiOutlineClose
              className="   text-black  dark:bg-neutral-800 dark:text-white"
              size={25}
            />
          ) : (
            <AiOutlineMenu
              className="   text-black dark:text-white"
              size={25}
            />
          )}
        </div>

        <div className="flex items-center justify-center text-white">
          <img src={clickedUser?.profilePic} alt="avatar" className="h-5 w-5" />
          <span className=" ml-2 font-semibold capitalize tracking-wider text-[#0975f1] dark:text-white">
            {clickedUser?.username}
          </span>
        </div>
      </div>
      <div className="scrollbar mb-3 mt-3 flex h-full flex-col justify-start overflow-y-scroll px-2 text-white ">
        <MessageComponent />
      </div>
      {isEmoji && (
        <div className="absolute bottom-16 z-50 mb-2">
          <EmojiPicker
            onEmojiClick={(event, emojiObject) => {
              console.log(event.emoji);
              setSentMessage(sentMessage + event.emoji);
            }}
          />
        </div>
      )}
      <div className="flex items-center justify-center drop-shadow-lg">
        <div
          className="mr-2 cursor-pointer rounded-full border border-[#0975f1] p-1"
          //click to add emoji open emoji picker
          onClick={() => setIsEmoji(!isEmoji)}
        >
          😀
        </div>

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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <div
          onClick={() => sendMessage()}
          className="ml-2 flex h-full w-[40px] cursor-pointer items-center justify-center rounded-xl bg-[#e7f1fe] hover:bg-[#d4e7f5] dark:bg-[#001833] dark:hover:bg-gray-600"
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
