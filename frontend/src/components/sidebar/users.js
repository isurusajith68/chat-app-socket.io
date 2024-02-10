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
        clickedUser && clickedUser.clickedUser._id === user._id
          ? "mt-1 flex cursor-pointer items-center gap-2 rounded-lg bg-[#0975f1] shadow-md"
          : "mt-1 flex cursor-pointer items-center gap-2"
      }
      onClick={clickUser}
    >
      <div>
        {/* <img
          src={user.profilePic}
          className={
            onlineUsers.includes(user._id)
              ? "m-2  h-10 w-10 rounded-full border-2 border-green-500"
              : "m-2 h-10 w-10 rounded-full border-2 border-white shadow-md"
          }
          alt="profile"
        /> */}
        <div class="relative m-2">
          <img class="h-10 w-10 rounded-full" src={user.profilePic} alt="" />
          {onlineUsers.includes(user._id) && (
            <span class="absolute left-7 top-0  h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400 dark:border-gray-800"></span>
          )}
        </div>
      </div>
      <div className="font-mono text-sm font-semibold capitalize text-white">
        {user.username.length > 12
          ? user.username.slice(0, 12) + "..."
          : user.username}
      </div>
    </div>
  );
};

export default Users;
