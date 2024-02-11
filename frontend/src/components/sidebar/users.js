import React, { useState } from "react";
import { useConversation } from "../../zustand/useConversation";
import { useSocketContext } from "../../context/Socket";
const Users = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);

  const clickUser = () => {
    useConversation.setState({ clickedUser: user });
  };

  const { onlineUsers } = useSocketContext();

  useConversation.subscribe(
    (clickedUser) => {
      setClickedUser(clickedUser);
    },
    (state) => state.clickedUser,
  );

  return (
    <div
      className={
        clickedUser && clickedUser.clickedUser?._id === user._id
          ? "mt-1 flex cursor-pointer items-center gap-2 rounded-lg bg-[#0975f1] shadow-md "
          : "mt-1 flex cursor-pointer items-center gap-2 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-neutral-900 "
      }
      onClick={clickUser}
    >
      <div>
        <div class="relative m-2">
          <img
            className={
              clickedUser && clickedUser.clickedUser?._id === user._id
                ? "h-10 w-10 rounded-full border-2 border-white dark:border-white"
                : "h-10 w-10 rounded-full border-2  dark:border-white"
            }
            src={user.profilePic}
            alt=""
          />
          {onlineUsers.includes(user._id) && (
            <span className="absolute left-7 top-0  h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800"></span>
          )}
        </div>
      </div>
      <div
        className={
          clickedUser && clickedUser.clickedUser?._id === user._id
            ? "font-mono text-sm font-semibold capitalize tracking-wider text-white  dark:text-white"
            : "font-mono text-sm font-semibold capitalize tracking-wider text-gray-800 dark:text-white"
        }
      >
        {user.username.length > 12
          ? user.username.slice(0, 12) + "..."
          : user.username}
      </div>
    </div>
  );
};

export default Users;
