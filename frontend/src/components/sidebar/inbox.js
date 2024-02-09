import React from "react";
import { Input } from "@nextui-org/react";
import { LuSend } from "react-icons/lu";
const inbox = () => {
  return (
    <div className="flex h-[70%] w-[600px] min-w-16 flex-col justify-between rounded-lg bg-black p-5">
      <div className="text-white">To : Isuru Perera</div>
      <div className="scrollbar mb-3 mt-3 overflow-y-scroll px-2 text-white">
        Can you please provi
        provide me
      </div>
      <div>
        <Input
          radius="lg"
          color="primary"
          size="large"
          classNames={{
            label: "text-white",
          }}
          placeholder="Type to search..."
          endContent={
            <LuSend className="pointer-events-none mb-0.5 flex-shrink-0 text-primary" />
          }
        />
      </div>
    </div>
  );
};
export default inbox;
