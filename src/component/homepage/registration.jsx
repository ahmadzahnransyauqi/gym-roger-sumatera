import { Link } from "react-router-dom";

export default function Regist() {
  return (
    <div className="text-white flex items-center gap-2 min-w-0">
      <Link
        to="/login"
        className="hover:bg-[#303030] px-3 py-1 rounded text-sm md:px-4 md:py-2 md:text-base whitespace-nowrap"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="bg-[#ff1f1f] hover:bg-[#ff6161] px-3 py-1 rounded text-sm md:px-4 md:py-2 md:text-base whitespace-nowrap"
      >
        Sign Up
      </Link>
    </div>
  );
}