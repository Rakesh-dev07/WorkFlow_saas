import { useEffect, useState } from "react";
import API from "../api/axios";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import Layout from "../components/Layout";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchMyTasks = async () => {
    const { data } = await API.get("/tasks/my-tasks");
    setTasks(data.data);
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  return (
    <Layout>
       <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Tasks</h1>

      {tasks.length === 0 && (
        <p className="text-gray-500">No tasks assigned</p>
      )}

      {tasks.map((task) => (
  <TaskCard
    key={task._id}
    task={task}
    onClick={() => setSelectedTask(task)}
  />
))}
      {selectedTask && (
  <TaskModal
    task={selectedTask}
    onClose={() => setSelectedTask(null)}
    onUpdate={fetchMyTasks}
  />
)}
    </div>
    </Layout>
  );
}