import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import DarkMode from "./components/darkMode";
import { useDarkModeContext } from "./context/DarkModeContext";

function App() {
  const { authUser } = useAuthContext();

  const { darkMode } = useDarkModeContext();

  return (
    <div className={`${darkMode && "dark"} `}>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Register />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <DarkMode  />
      </BrowserRouter>
    </div>
  );
}

export default App;
