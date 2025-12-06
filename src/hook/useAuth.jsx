import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const rememberMe = localStorage.getItem("rememberMe") === "true";

    if (rememberMe && savedToken) {
      fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
            setRole(data.user?.role || JSON.parse(savedUser)?.role);
          } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            localStorage.removeItem("rememberMe");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          localStorage.removeItem("rememberMe");
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken, newUser, remember = false) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("role", newUser.role);
    if (remember) localStorage.setItem("rememberMe", "true");
    else localStorage.removeItem("rememberMe");
    setToken(newToken);
    setUser(newUser);
    setRole(newUser.role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("rememberMe");
    setToken(null);
    setUser(null);
    setRole(null);
  };

  return {
    user,
    token,
    role,
    isLoading,
    isAuthenticated: !!token,
    login,
    logout,
  };
}