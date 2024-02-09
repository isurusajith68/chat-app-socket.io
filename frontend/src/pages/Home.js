import { useEffect } from "react";
import axios from "axios";
import SideBar from "../components/sidebar/sidebar";
import Inbox from "../components/sidebar/inbox";
const Home = () => {
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          withCredentials: true,
        });
        console.log(res.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center ">
      <SideBar />
      <div className="border bg-white"></div>
      <Inbox />
    </div>
  );
};
export default Home;
