import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token & user from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const rememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedToken && savedUser) {
      // Optimistically set state so ProtectedRoute can render
      setToken(savedToken);
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setRole(parsedUser.role);

      // Verify token with server in background
      fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.valid) {
            logout(); // clear invalid token
          }
        })
        .catch(() => logout())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken, newUser, remember = false) => {
    setToken(newToken);
    setUser(newUser);
    setRole(newUser.role);

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("role", newUser.role);
    if (remember) localStorage.setItem("rememberMe", "true");
    else localStorage.removeItem("rememberMe");
  };

  const logout = async () => {
    if (token) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Logout API failed:", err);
      }
    }
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