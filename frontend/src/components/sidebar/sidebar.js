import React, { useState } from "react";
import SearchBar from "./search";
import Users from "./users";
import { Spinner } from "@nextui-org/react";
import { IoIosShareAlt } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { useConversation } from "../../zustand/useConversation";
import { ClipboardCopyButton } from "../shareModel";
import axios from "axios";
import { PiWechatLogoFill } from "react-icons/pi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import MobileNav from "../mobileNav";
import { useSideBarContext } from "../../context/SideBarContext";

const Sidebar = ({ users }) => {
  const [shareModel, setShareModel] = useState(false);

  const logoutUser = async () => {
    try {
      const res = await axios.post("api/auth/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        localStorage.removeItem("authUser");
        window.location.href = "/login";
      }
    } catch (error) {
      if (error.response.status === 401) {
        return error.response.status;
      }
    }
    localStorage.removeItem("authUser");
    window.location.reload();
  };

  const clickedUser = useConversation((state) => state.clickedUser);
  const loggedInUser = JSON.parse(localStorage.getItem("authUser"));
  const { nav, setNav } = useSideBarContext((state) => state.nav);

  const handleNav = () => {
    setNav(!nav);
  };
  const openShareModal = () => {
    setShareModel(true);

    setTimeout(() => {
      setShareModel(false);
    }, 3000);
  };

  return (
    <>
      {<MobileNav users={users} />}
      <div
        className={
          clickedUser
            ? "flex h-full  flex-col justify-between rounded-lg bg-neutral-100 p-5 dark:bg-neutral-900 max-sm:hidden max-sm:h-full  max-sm:w-full sm:hidden"
            : "flex h-full flex-col  justify-between rounded-lg bg-neutral-100 p-5  dark:bg-neutral-900 max-sm:h-full max-sm:w-full   sm:hidden"
        }
      >
          <div onClick={handleNav} className="">
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

      <div
        // onClick={() => setShareModel(false)}
        className={
          clickedUser
            ? "flex h-full flex-col justify-between rounded-lg bg-neutral-100 p-5 dark:bg-neutral-900  max-sm:hidden max-sm:h-full max-sm:w-full "
            : "flex  h-full flex-col justify-between rounded-lg bg-neutral-100 p-5 dark:bg-neutral-900  max-sm:hidden max-sm:h-full max-sm:w-full"
        }
      >
        {shareModel && <ClipboardCopyButton shareModel={setShareModel} />}

        <div className="flex  items-start">
          <SearchBar />
        </div>

        <div className="scrollbar mt-3 h-full overflow-y-scroll p-2">
          {users?.length > 0 ? (
            users.map((i, k) => {
              return <Users key={k} user={i} />;
            })
          ) : (
            <div className="flex h-full items-center justify-center">
              <Spinner size="sm" color="primary" />
            </div>
          )}
        </div>
        <div className="mt-5 flex items-end justify-between text-white ">
          <div className="rounded-full border border-[#0975f1] p-1">
            <CgLogOut
              color="#0975f1"
              onClick={logoutUser}
              className="cursor-pointer hover:scale-110 "
            />
          </div>
          <div className="rounded-full border border-[#0975f1] p-1">
            <IoIosShareAlt
              onClick={openShareModal}
              color="#0975f1"
              className="share-icon"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
