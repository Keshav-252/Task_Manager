// src/components/TaskList.jsx
import api from "../api/api";

export default function TaskList({ tasks, refresh }) {
  const del = async (id) => {
    if (!confirm("Delete task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      refresh();
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || "Error deleting task";
      alert(serverMsg);
    }
  };

  const edit = async (id, current) => {
    const newDesc = prompt("Edit task description:", current);
    if (newDesc === null) return; // cancelled
    if (!newDesc.trim()) return alert("Description cannot be empty");
    try {
      await api.put(`/tasks/${id}`, { description: newDesc });
      refresh();
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || "Error updating task";
      alert(serverMsg);
    }
  };

  return (
    <ul>
      {tasks?.map((t) => (
        <li key={t._id || t.id}>
          {t.description}
          <button onClick={() => edit(t._id || t.id, t.description)} style={{ marginLeft: 8 }}>Edit</button>
          <button onClick={() => del(t._id || t.id)} style={{ marginLeft: 8 }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}