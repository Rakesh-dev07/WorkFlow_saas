import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ setIsOpen }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">

      {/* Left side */}
      <div className="flex items-center gap-4">

        {/* Sidebar toggle button */}
        <button
          onClick={() => setIsOpen(true)}
          className="text-xl"
        >
          ☰
        </button>

        {/* Tenant Name */}
        <h1 className="font-semibold text-lg">
          {user?.tenant?.name || "Company"}
        </h1>

      </div>

      {/* Right side */}
      <span className="text-sm text-gray-600">
        {user?.user?.name}
      </span>

    </div>
  );
}