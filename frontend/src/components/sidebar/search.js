import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../icon/SearchIcon";
import { useConversation } from "../../zustand/useConversation";
import axios from "axios";

const searchBar = () => {
  //search user

  const getAllUsers = async () => {
    try {
      const res = await axios.get("/user");
      useConversation.setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {};

  return (
    <div className="w-full drop-shadow-lg">
      <Input
        radius="lg"
        color="primary"
        size="large"
        classNames="w-full"
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="pointer-events-none mb-0.5 flex-shrink-0 text-primary " />
        }
      />
    </div>
  );
};
export default searchBar;
