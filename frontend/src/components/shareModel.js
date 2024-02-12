import React from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { RiFileCopy2Fill } from "react-icons/ri";
import { IoIosDoneAll } from "react-icons/io";
import { motion } from "framer-motion";

export function ClipboardCopyButton({ shareModel }) {
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = React.useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -100,
      }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 260,
        damping: 50,
      }}
      className="fixed bottom-20 left-5 z-50"
    >
      <div className="flex rounded-lg bg-[#0975f1] px-4 py-2 ">
        <span className="flex items-center justify-center text-xs font-normal text-white">
          https://chat-app-mi6i.onrender.com
        </span>
        <div className="mx-2 flex items-center justify-center">
          <div className="flex h-3 border-r"></div>
        </div>
        <button
          onMouseLeave={() => setCopied(false)}
          onClick={() => {
            copy("https://chat-app-mi6i.onrender.com");
            setCopied(true);
            setTimeout(() => {
              shareModel(false);
            }, 1000);
          }}
          className="ml-2 rounded-md bg-white p-1"
        >
          {copied ? (
            <IoIosDoneAll className="h-4 w-4" color="#0975f1" />
          ) : (
            <RiFileCopy2Fill className="h-4 w-4" color="#0975f1" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
