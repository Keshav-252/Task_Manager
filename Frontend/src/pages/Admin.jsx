// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Admin() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const load = async () => {
        try {
            const res = await api.get("/admin/users");
            setUsers(res.data.users || []);
        } catch (err) {
            const status = err?.response?.status;
            const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || err?.message || "Failed to load users";
            if (status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            alert(serverMsg);
        }
    };

    useEffect(() => { load(); }, []);

    const removeUser = async (id, role) => {
        if (role === "admin") return alert("Cannot delete admin users");
        if (!confirm("Delete this user and their tasks?")) return;
        try {
            await api.delete(`/admin/users/${id}`);
            load();
        } catch (err) {
            const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || err?.message || "Delete failed";
            alert(serverMsg);
        }
    };

    const promoteUser = async (id, role) => {
        if (role === 'admin') return alert('User is already an admin');
        if (!confirm('Promote this user to admin?')) return;
        try {
            await api.patch(`/admin/users/${id}/role`, { role: 'admin' });
            load();
        } catch (err) {
            const serverMsg = err?.response?.data?.message || err?.response?.data?.msg || err?.message || 'Promote failed';
            alert(serverMsg);
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: "1rem auto" }}>
            <h2>Admin — Users</h2>
            <button onClick={() => navigate('/dashboard')}>Back</button>
            <table style={{ width: '100%', marginTop: 12, borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
                        <th style={{ textAlign: 'left', padding: 8 }}>Email</th>
                        <th style={{ textAlign: 'left', padding: 8 }}>Role</th>
                        <th style={{ textAlign: 'left', padding: 8 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id} style={{ borderTop: '1px solid #eee' }}>
                            <td style={{ padding: 8 }}>{u.name}</td>
                            <td style={{ padding: 8 }}>{u.email}</td>
                            <td style={{ padding: 8 }}>{u.role}</td>
                            <td style={{ padding: 8 }}>
                                {u.role !== 'admin' ? (
                                    <>
                                        <button onClick={() => promoteUser(u._id, u.role)} style={{ marginRight: 8 }}>Promote</button>
                                        <button onClick={() => removeUser(u._id, u.role)}>Delete</button>
                                    </>
                                ) : (
                                    <span style={{ color: '#888' }}>—</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
