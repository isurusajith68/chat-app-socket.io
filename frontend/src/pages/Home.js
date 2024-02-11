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
    <div className="p-2 z-50 flex h-screen items-center justify-center">
      <SideBar users={users} />
      <div className="border bg-white max-sm:hidden"></div>
      <Inbox />
    </div>
  );
};
export default Home;
