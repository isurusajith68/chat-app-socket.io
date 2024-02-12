import React, { useEffect, useState } from "react";
import SearchBar from "./sidebar/search";
import Users from "./sidebar/users";
import { Spinner } from "@nextui-org/react";
import { IoIosShareAlt } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { useConversation } from "../zustand/useConversation";
import { ClipboardCopyButton } from "../components/shareModel";
import axios from "axios";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useSideBarContext } from "../context/SideBarContext";

const MobileNav = ({ users }) => {
  const [shareModel, setShareModel] = useState(false);

  const clickedUser = useConversation((state) => state.clickedUser);
  const { nav, setNav } = useSideBarContext((state) => state.nav);
  useEffect(() => {
    if (clickedUser) {
      setNav(false);
    }
  }, [clickedUser, setNav]);

  const handleNav = () => {
    setNav(!nav);
  };

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
          ? "rounded-;-lg fixed left-0  z-10 flex h-full flex-col justify-between bg-neutral-200  p-5 shadow-2xl transition-all duration-150 dark:bg-neutral-800  sm:hidden"
          : "fixed -left-[350px]  flex h-full flex-col justify-between rounded-l-lg bg-neutral-200  p-5 shadow-2xl dark:bg-neutral-800 sm:hidden"
      }
    >
      {shareModel && <ClipboardCopyButton shareModel={setShareModel} />}

      <div className="flex  items-center justify-between gap-3">
        <SearchBar />
        <div onClick={handleNav} className="flex items-center justify-center">
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
