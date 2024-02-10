import React, { useState } from "react";
import { useConversation } from "../../zustand/useConversation";

const Users = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);

  const clickUser = () => {
    useConversation.setState({ clickedUser: user });
  };

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
        <img
          src={user.profilePic}
          className="m-2 h-10 w-10 rounded-full border-2 border-white shadow-md"
          alt="profile"
        />
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
