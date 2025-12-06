import { useState } from "react";
import Footer from "../../component/homepage/footer";
import Header from "../../component/homepage/header";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Please fill all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId: username, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid JSON response from server");
      }

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // persist via hook (sets rememberMe flag if checked)
      login(data.token, data.user, rememberMe);

      setLoading(false);

      if (data.user?.role === "admin") navigate("/admin");
      else if (data.user?.role === "member") navigate("/user");
      else navigate("/");
    } catch (err) {
      setError(err.message === "Failed to fetch" ? "Network error" : err.message || "Login error");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="mx-auto mt-16 md:mt-24 max-w-xs sm:max-w-md w-full p-6 md:p-10 bg-[#444444] text-white rounded-xl shadow-2xl mb-20">
        <h2 className="text-3xl font-extrabold text-center mb-1">Login</h2>
        <h3 className="text-sm text-center mb-6 text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#ff1f1f] hover:text-[#ff6161] font-semibold transition-colors">
            Sign Up
          </Link>
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-2">Email / Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 rounded bg-[#333] text-white focus:outline-none" type="text" placeholder="email or username" />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded bg-[#333] text-white focus:outline-none" type="password" placeholder="Enter your Password" />
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <input
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 h-4 w-4 text-[#ff1f1f] border-gray-300 rounded focus:ring-[#ff1f1f] cursor-pointer"
                type="checkbox"
                id="dontforget"
              />
              <label htmlFor="dontforget">Remember Me</label>
            </div>

            <Link to="/forgotpassword" className="hover:text-[#ff6161] text-[#ff1f1f] transition-colors font-medium text-xs sm:text-sm">
              Forgot Password?
            </Link>
          </div>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full text-lg font-bold text-white bg-[#ff1f1f] hover:bg-[#d41b1b] py-3 rounded-lg shadow-md transition-colors disabled:opacity-60">
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}