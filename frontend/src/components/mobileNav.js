import React, { useEffect, useState } from "react";
import SearchBar from "./sidebar/search";
import Users from "./sidebar/users";
import { Spinner } from "@nextui-org/react";
import { IoIosShareAlt } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { useConversation } from "../zustand/useConversation";
import { ClipboardCopyButton } from "../components/shareModel";
import axios from "axios";
import { PiWechatLogoFill } from "react-icons/pi";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";

const MobileNav = ({ users }) => {
  const [shareModel, setShareModel] = useState(false);
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const clickedUser = useConversation((state) => state.clickedUser);

  useEffect(() => {
    if (clickedUser) {
      setNav(false);
    }
  }, [clickedUser]);

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

  const openShareModal = () => {
    setShareModel(true);

    setTimeout(() => {
      setShareModel(false);
    }, 3000);
  };
  return (
    <div
      className={
        nav
          ? "fixed z-10 left-0  flex h-full flex-col justify-between rounded-lg bg-neutral-200  p-5 shadow-2xl transition-all duration-150 dark:bg-neutral-800  sm:hidden"
          : "fixed -left-[243px]  flex h-full flex-col justify-between rounded-lg bg-neutral-200  p-5 shadow-2xl dark:bg-neutral-800 sm:hidden"
      }
    >
      {shareModel && <ClipboardCopyButton shareModel={setShareModel} />}
      <div
        onClick={handleNav}
        className="absolute ml-[220px] flex  h-full justify-center"
      >
        {nav ? (
          <div className="h-8 rounded-lg  bg-neutral-200 p-1 dark:bg-neutral-800">
            <AiOutlineClose
              className="   text-black  dark:bg-neutral-800 dark:text-white"
              size={25}
            />
          </div>
        ) : (
          <div className="h-8 rounded-lg bg-neutral-200 p-1 dark:bg-neutral-800">
            <AiOutlineMenu
              className="   text-black dark:text-white"
              size={25}
            />
          </div>
        )}
      </div>
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

      <div className="flex items-end justify-between text-white ">
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
  );
};
export default MobileNav;
