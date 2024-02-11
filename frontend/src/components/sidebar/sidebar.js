import React from "react";
import SearchBar from "./search";
import Users from "./users";
import { Spinner } from "@nextui-org/react";
import { IoIosShareAlt } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import { Logout } from "../../api/logout";
import { useConversation } from "../../zustand/useConversation";

const Sidebar = ({ users }) => {
  const logoutUser = () => {
    Logout();
    localStorage.removeItem("authUser");
    window.location.reload();
  };

  const clickedUser = useConversation((state) => state.clickedUser);
  console.log(clickedUser, "clickedUser");

  return (
    <div
      className={
        clickedUser
          ? "flex h-[70%] flex-col justify-between rounded-lg bg-black p-5 max-md:hidden max-md:h-full max-md:w-full"
          : "flex h-[70%] flex-col justify-between rounded-lg bg-black p-5 max-md:h-full max-md:w-full"
      }
    >
      <div className="flex  items-start">
        <SearchBar />
      </div>
      <div className="mt-3 h-full overflow-y-scroll p-2 scrollbar">
        {users.length > 0 ? (
          users.map((i, k) => {
            return <Users key={k} user={i} />;
          })
        ) : (
          <div className="flex h-full items-center justify-center">
            <Spinner size="sm" color="primary" />
          </div>
        )}
      </div>
      <div className="mt-5 flex items-end justify-between text-white">
        <div>
          <CgLogOut
            color="#0975f1"
            onClick={logoutUser}
            className="cursor-pointer hover:scale-110"
          />
        </div>
        <div>
          <IoIosShareAlt
            color="#0975f1"
            className="cursor-pointer hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
