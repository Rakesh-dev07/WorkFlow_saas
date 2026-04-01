import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function TaskCard({ task, onDelete, onClick }) {
  const { user } = useContext(AuthContext);
  const role = user?.user?.role;

  const canDelete = role === "admin" || role === "manager";

  return (
    <div onClick={onClick}
  className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition flex justify-between items-center cursor-pointer"
>
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.projectId?.name}</p>
        <p className="text-xs text-gray-400">
          Assigned to: {task.assignedTo?.name || "Unassigned"}
        </p>
        <p className="text-xs text-gray-400">
          {task.status} | {task.priority}
        </p>
      </div>

      {canDelete && (
        <button
  onClick={(e) => {
    e.stopPropagation(); // 🔥 prevents modal opening
    onDelete(task._id);
  }}
  className="bg-red-500 text-white px-2 py-1 rounded"
>
  Delete
</button>
      )}
    </div>
  );
}
