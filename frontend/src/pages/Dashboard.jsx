import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Layout from "../components/Layout";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const role = user?.user?.role;
  const canViewUsers = role === "admin" || role === "manager";

  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get("/tasks/stats");
      setStats(data);
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchMyTasks = async () => {
      const { data } = await API.get("/tasks/my-tasks");
      setMyTasks(data.data.slice(0, 5));
    };
    fetchMyTasks();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user?.user?.name}
          </h1>
          <p className="text-gray-500 mt-1">
            {role === "admin" && "Admin Dashboard"}
            {role === "manager" && "Manager Dashboard"}
            {role === "member" && "Member Dashboard"}
          </p>
        </div>

        {/* ACTION CARDS (instead of buttons) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div
            onClick={() => navigate("/projects")}
            className="cursor-pointer bg-white p-4 rounded-2xl shadow-sm border hover:shadow-md transition"
          >
            <h3 className="font-semibold">📁 Projects</h3>
            <p className="text-sm text-gray-500">Manage your projects</p>
          </div>

          <div
            onClick={() => navigate("/tasks")}
            className="cursor-pointer bg-white p-4 rounded-2xl shadow-sm border hover:shadow-md transition"
          >
            <h3 className="font-semibold">✅ Tasks</h3>
            <p className="text-sm text-gray-500">View all tasks</p>
          </div>

          <div
            onClick={() => navigate("/my-tasks")}
            className="cursor-pointer bg-white p-4 rounded-2xl shadow-sm border hover:shadow-md transition"
          >
            <h3 className="font-semibold">🧾 My Tasks</h3>
            <p className="text-sm text-gray-500">Your assigned work</p>
          </div>

          {canViewUsers && (
            <div
              onClick={() => navigate("/users")}
              className="cursor-pointer bg-white p-4 rounded-2xl shadow-sm border hover:shadow-md transition"
            >
              <h3 className="font-semibold">👥 Users</h3>
              <p className="text-sm text-gray-500">Manage team</p>
            </div>
          )}
        </div>

        {/* STATS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((s) => (
              <div
                key={s._id}
                className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition"
              >
                <p className="text-gray-500 capitalize">{s._id}</p>
                <h2 className="text-3xl font-bold mt-2">{s.count}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT TASKS */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">Recent Tasks</h2>

            <button
              onClick={() => navigate("/my-tasks")}
              className="text-sm text-blue-600 hover:underline"
            >
              View all →
            </button>
          </div>

          <div className="space-y-3">
            {myTasks.length === 0 && (
              <p className="text-gray-500">No tasks assigned</p>
            )}

            {myTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 rounded-2xl shadow-sm border hover:shadow-md transition flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs text-gray-500">
                    {task.projectId?.name}
                  </p>
                </div>

                <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
}