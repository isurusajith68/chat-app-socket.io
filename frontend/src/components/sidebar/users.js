import React, { useState } from "react";

const Users = ({ user }) => {
  const [clickedUser, setClickedUser] = useState(null);

  const clickUser = () => {
    setClickedUser(user);
  };

  return (
    <div
      className={
        clickedUser && clickedUser._id === user._id
          ? "mt-4 flex cursor-pointer items-center gap-5 bg-red-400"
          : "mt-4 flex cursor-pointer items-center gap-5"
      }
      onClick={clickUser}
    >
      <div>
        <img
          src={user.profilePic}
          className="h-10 w-10 rounded-full border-2 border-white shadow-md"
          alt="profile"
        />
      </div>
      <div className="font-mono text-sm font-semibold text-white">
        {user.username.length > 12
          ? user.username.slice(0, 12) + "..."
          : user.username}
      </div>
    </div>
  );
};

export default Users;
