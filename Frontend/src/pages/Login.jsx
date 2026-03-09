// src/pages/Login.jsx
import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", form);
            // try common places for token:
            const token = res?.data?.token || res?.data?.data?.token;
            if (!token) {
                setMsg("Login succeeded but no token returned.");
                return;
            }
            localStorage.setItem("token", token);
            setMsg("Login successful.");
            navigate("/dashboard");
        } catch (err) {
            const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || err.message || "Login failed";
            setMsg(serverMsg);
        }
    };

    return (
        <div style={{ maxWidth: 480, margin: "2rem auto" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <br />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <br />
                <button type="submit">Login</button>
            </form>
            <div style={{ marginTop: 12 }}>
                <span>Don't have an account? </span>
                <button onClick={() => navigate('/signup')} style={{ marginLeft: 8 }}>Signup</button>
            </div>
            <div>{msg}</div>
        </div>
    );
}