import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const role = user?.user?.role;

  return (
   <div
  className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md p-4 space-y-4 z-50
  transform transition-transform duration-300
  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-600">
          WorkFlow
        </h2>

        <button onClick={() => setIsOpen(false)}>✖</button>
      </div>

      {/* Navigation Buttons */}
      <div className="space-y-2">

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          📊 Dashboard
        </button>

        <button
          onClick={() => navigate("/projects")}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          📁 Projects
        </button>

        <button
          onClick={() => navigate("/tasks")}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          ✅ Tasks
        </button>

        <button
          onClick={() => navigate("/my-tasks")}
          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
        >
          🧾 My Tasks
        </button>

        {/* Admin only */}
        {role === "admin" && (
          <button
            onClick={() => navigate("/users")}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            👥 Users
          </button>
        )}

      </div>

      {/* Logout Button */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}