import { createContext, useState } from "react";
import { api } from "../api";
import { useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/auth/profile")
        .then((res) => setUser(res.data.user))
        .catch(() => {
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });

    const loginRes = await api.post("/auth/login", { email, password });
    setToken(loginRes.data.token);
    localStorage.setItem("token", loginRes.data.token);
    setUser(loginRes.data.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  api.interceptors.request.use((config) => {
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
