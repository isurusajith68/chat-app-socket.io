import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-3 text-center text-xs dark:text-white">
      Copyright © 2024{" "}
      <Link className="font-bold" to="http://isurusajith.me">
        Isuru sajith
      </Link>
    </div>
  );
};
export default Footer;
