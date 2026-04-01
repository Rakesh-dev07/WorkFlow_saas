import { useEffect, useState } from "react";
import API from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

const { user } = useContext(AuthContext);
const role = user?.user?.role;
const canInviteUser = role === "admin"; // Only admins can invite

  const fetchUsers = async () => {
    const { data } = await API.get("/tenant/users");
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInvite = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tenant/invite", form);
      setForm({ name: "", email: "", password: "", role: "member" });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <Layout>
    <div className="p-6 space-y-6">

      {/* Invite Form */}
      {canInviteUser && (
      <form
        onSubmit={handleInvite}
        className="bg-white p-4 rounded shadow space-y-3"
      >
        <h2 className="text-xl font-bold">Invite User</h2>

        <input name="name" placeholder="Name" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="role" onChange={handleChange} className="w-full p-2 border rounded">
          <option value="member">Member</option>
          <option value="manager">Manager</option>
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Invite
        </button>
      </form>
      )}

      {/* User List */}
      <div className="space-y-2">
        {users.map((u) => (
          <div key={u._id} className="bg-white p-3 rounded shadow">
            {u.name} ({u.role?.toUpperCase()})
          </div>
        ))}
      </div>

    </div>
    </Layout>
  );
}