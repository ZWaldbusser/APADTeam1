import { API_BASE_URL } from "./config";

const BASE_URL = API_BASE_URL;

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (res.status === 401 && window.location.pathname !== "/login") {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return res;
}

export async function getCurrentUser() {
  const res = await apiFetch("/api/me");
  if (!res.ok) return null;
  return res.json();
}