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
        const res = await axios.get("http://localhost:5000/api/users", {
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
    <div className="flex h-screen items-center justify-center z-50">
      <SideBar users={users} />
      <div className="border bg-white"></div>
      <Inbox />
    </div>
  );
};
export default Home;
