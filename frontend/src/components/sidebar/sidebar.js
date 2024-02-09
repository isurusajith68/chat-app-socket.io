import React from "react";
import SearchBar from "./search";
import Users from "./users";
const sidebar = () => {
  return (
    <div className="flex h-[70%] flex-col justify-between rounded-lg bg-black p-5">
      <div className="flex items-start">
        <SearchBar />
      </div>
      <div className="scrollbar mt-3 overflow-y-scroll p-2">
        <Users />
        <Users />
        <Users />
        <Users />
        <Users />
        <Users />
        <Users />
        <Users />
        <Users />
        <Users />
      </div>
      <div className="mt-5 flex items-end justify-between text-white">
        <div>Logout</div>
        <div>Share</div>
      </div>
    </div>
  );
};
export default sidebar;
