import { useDarkModeContext } from "../context/DarkModeContext";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";
const DarkMode = () => {
  const { darkMode, setDarkMode } = useDarkModeContext();

  return (
    <div className="fixed bottom-[100px] left-[94%] z-[999] h-[20px]  w-full max-md:left-[85%]">
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
            <BsFillMoonStarsFill
              className="test"
              style={{ color: "darkorange", fontSize: "20px" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default DarkMode;
