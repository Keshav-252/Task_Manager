// src/components/TaskForm.jsx
import { useState } from "react";
import api from "../api/api";

export default function TaskForm({ onCreated }) {
  const [description, setDescription] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", { description });
      setDescription("");
      onCreated();
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || "Error creating task";
      alert(serverMsg);
    }
  };
  return (
    <form onSubmit={submit}>
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="New task description" required />
      <button type="submit">Add</button>
    </form>
  );
}