import axios from "axios";
export const Logout = async () => {

  try {
    const res = await axios.post(
      "https://chat-app-ufu8.onrender.com/api/auth/logout",
      {
        withCredentials: true,
      },
    );
    if (res.status === 200) {
      localStorage.removeItem("authUser");
      window.location.href = "/login";
    }
  } catch (error) {
    if (error.response.status === 401) {
      return error.response.status;
    }
  }
};
