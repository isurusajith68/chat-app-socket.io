import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../icon/SearchIcon";

const searchBar = () => {
  return (
    <div className="w-full">
      <Input
        radius="lg"
        color="primary"
        size="large"
        classNames={{
          label: "text-white",
        }}
        placeholder="Type to search..."
        startContent={
          <SearchIcon className="pointer-events-none mb-0.5 flex-shrink-0 text-primary " />
        }
      />
    </div>
  );
};
export default searchBar;
