import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/sidebar/sidebar";
import Inbox from "../components/inbox/inbox";
import { Logout } from "../api/logout";
const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("api/users", {
          withCredentials: true,
        });

        setUsers(res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          Logout();
        }
      }
    };
    getUser();
  }, []);

  return (
    <div className="-100 fixed z-50 flex h-full w-full items-center justify-center bg-neutral-100  dark:bg-neutral-900">
      <SideBar users={users} />
      
      <div className="dark:border-bg-neutral-100 border-neutral-200 h-full max-sm:hidden border"></div>
      <Inbox />
    </div>
  );
};
export default Home;
