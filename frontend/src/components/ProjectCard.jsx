import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProjectCard({ project, onDelete }) {
  const { user } = useContext(AuthContext);

  const role = user?.user?.role;

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{project.name}</h3>
        <p className="text-sm text-gray-500">{project.description}</p>
      </div>

      {role === "admin" && (
        <button
          onClick={() => onDelete(project._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      )}
    </div>
  );
}