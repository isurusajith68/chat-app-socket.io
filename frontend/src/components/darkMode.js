import { useDarkModeContext } from "../context/DarkModeContext";
import { FaMoon } from "react-icons/fa6";
import { IoMdSunny } from "react-icons/io";
const DarkMode = () => {
  const { darkMode, setDarkMode } = useDarkModeContext();

  return (
    <div className="fixed bottom-[105px]  left-[95%] z-[999] h-[20px]  w-full max-md:left-[82%]">
      <div
        className="borderRotation_dark_mode"
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        <div className="flex h-12 w-12  items-center justify-center rounded-full">
          {darkMode ? (
            <IoMdSunny
              className="test"
              style={{ color: "yellow", fontSize: "25px" }}
            />
          ) : (
            <FaMoon
              className="test drop-shadow-xl"
              style={{ color: "darkorange", fontSize: "25px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default DarkMode;
