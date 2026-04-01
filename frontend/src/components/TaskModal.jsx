import { useState, useEffect } from "react";
import API from "../api/axios";

export default function TaskModal({ task, onClose, onUpdate }) {
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
  // Disable scroll
  document.body.style.overflow = "hidden";

  return () => {
    // Enable scroll when modal closes
    document.body.style.overflow = "auto";
  };
}, []);

  const handleUpdate = async () => {
    try {
      await API.put(`/tasks/${task._id}`, { status });
      onUpdate(); // refresh list
      onClose();
    } catch (err) {
      alert("Error updating task");
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-lg space-y-4"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Task Details</h2>
          <button onClick={onClose}>✖</button>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <p>
            <strong>Title:</strong> {task.title}
          </p>
          <p>
            <strong>Description:</strong> {task.description || "—"}
          </p>
          <p>
            <strong>Project:</strong> {task.projectId?.name}
          </p>
          <p>
            <strong>Assigned To:</strong> {task.assignedTo?.name || "—"}
          </p>
          <p>
            <strong>Assigned By:</strong> {task.assignedBy?.name || "System"}
          </p>
          <p>
            <strong>Status:</strong>
          </p>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <p>
            <strong>Priority:</strong> {task.priority}
          </p>

          <p className="text-gray-500 text-xs">
            Created: {new Date(task.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Actions */}
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Update Status
        </button>
      </div>
    </div>
  );
}
