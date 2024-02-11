import { useDarkModeContext } from "../context/DarkModeContext";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";
const DarkMode = () => {
  const { darkMode, setDarkMode } = useDarkModeContext();

  return (
    <div className="fixed bottom-[80px] left-[94%] z-[999] h-[20px]  w-full max-md:left-[85%]">
      <div
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white  shadow-md dark:bg-gray-800 dark:text-white"
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        {darkMode ? (
          <IoMdSunny style={{ color: "yellow", fontSize: "30px" }} />
        ) : (
          <BsMoonStarsFill style={{ color: "black", fontSize: "30px" }} />
        )}
      </div>
    </div>
  );
};
export default DarkMode;
