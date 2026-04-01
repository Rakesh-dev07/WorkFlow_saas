import { useEffect, useState } from "react";
import API from "../api/axios";
import TaskCard from "../components/TaskCard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Pagination from "../components/Pagination";
import Layout from "../components/Layout";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    priority: "medium",
  });

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });

  const { user } = useContext(AuthContext);
  const role = user?.user?.role;

  const canCreateTask = role === "admin" || role === "manager";

  // 🔹 Fetch tasks
  const fetchTasks = async () => {
  try {
    const query = new URLSearchParams({
      ...filters,
      page,
    }).toString();

    const { data } = await API.get(`/tasks?${query}`);

    setTasks(data.data);
    setTotalPages(data.totalPages);

  } catch (err) {
    console.error(err);
  }
};

  // 🔹 Fetch projects (for dropdown)
  const fetchProjects = async () => {
    const { data } = await API.get("/projects");
    setProjects(data);
  };

  // 🔹 Fetch users (for dropdown)
  const fetchUsers = async () => {
    const { data } = await API.get("/tenant/users");
    setUsers(data);
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
    fetchUsers();
    window.scrollTo(0, 0);
  }, [filters, page]);

  // 🔹 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Create task
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", form);
      setForm({
        title: "",
        description: "",
        projectId: "",
        priority: "medium",
      });
      fetchTasks();
    } catch (err) {
      alert("Error creating task");
    }
  };

  // 🔹 Delete task
  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <Layout>
    <div className="p-6 space-y-6">
      {/* Create Task */}
      {canCreateTask && (
        <form
          className="bg-white p-4 rounded shadow space-y-3"
          onSubmit={handleCreate}
        >
          <h2 className="text-xl font-bold">Create Task</h2>

          <input
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Project Dropdown */}
          <select
            name="projectId"
            value={form.projectId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* User Dropdown */}
          <select
            name="assignedTo"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Assign User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* Priority */}
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg">
            Create Task
          </button>
        </form>
      )}

      {/* Filters */}
      <div className="flex gap-4">
        <select
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={handleDelete} />
        ))}
      </div>

      {/* Pagination buttons */}
      <Pagination
  page={page}
  totalPages={totalPages}
  setPage={setPage}
/>
    </div>
    </Layout>
  );
}
