// src/utils/auth.js
export function getTokenPayload() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch (err) {
        return null;
    }
}

export function getUserRole() {
    const p = getTokenPayload();
    return p?.role || null;
}
