import { useEffect, useState } from "react";
import API from "../api/axios";
import ProjectCard from "../components/ProjectCard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

const { user } = useContext(AuthContext);
const role = user?.user?.role;
const canCreateProject = role === "admin" || role === "manager";

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create project
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", form);
      setForm({ name: "", description: "" });
      fetchProjects();
    } catch (err) {
      alert("Error creating project");
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    } catch (err) {
      alert("Error deleting project");
    }
  };

  return (
    <Layout>
    <div className="p-6 space-y-6">

      {/* Create Project */}
      {canCreateProject && (
      <form
        onSubmit={handleCreate}
        className="bg-white p-4 rounded shadow space-y-3"
      >
        <h2 className="text-xl font-bold">Create Project</h2>

        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg">
          Create
        </button>
      </form>
      )}

      {/* Project List */}
      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onDelete={handleDelete}
          />
        ))}
      </div>

    </div>
    </Layout>
  );
}