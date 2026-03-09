// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import api from "../api/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    const load = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data.tasks || res.data || []);
        } catch (err) {
            // if unauthorized, redirect to login
            if (err?.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                console.error(err);
            }
        }
    };

    useEffect(() => { load(); }, []);

    return (
        <div style={{ maxWidth: 800, margin: "1rem auto" }}>
            <h2>Dashboard</h2>
            <div style={{ marginBottom: 8 }}>
                <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
                {getUserRole() === 'admin' && (
                    <button style={{ marginLeft: 8 }} onClick={() => navigate('/admin')}>Admin</button>
                )}
            </div>
            <TaskForm onCreated={load} />
            <TaskList tasks={tasks} refresh={load} />
        </div>
    );
}