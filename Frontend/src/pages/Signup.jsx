// src/pages/Signup.jsx
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/signup", form);
            setMsg("Signup successful. Please login.");
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || err.message || "Signup failed";
            setMsg(serverMsg);
        }
    };

    return (
        <div style={{ maxWidth: 480, margin: "2rem auto" }}>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <br />
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <br />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <br />
                <button type="submit">Signup</button>
            </form>
            <div>{msg}</div>
        </div>
    );
}