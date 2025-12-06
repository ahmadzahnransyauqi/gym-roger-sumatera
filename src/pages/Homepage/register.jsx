import Footer from "../../component/homepage/footer";
import Header from "../../component/homepage/header";
import InputField from "../../component/homepage/input-slot";
import { Link, useNavigate } from "react-router-dom";
import BeratCok from "../../assets/Berat_cok.webp";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState(""); // optional, not used by backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    if (!email || !password || !confirm) {
      setError("Please fill all required fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // backend expects `username` + `password`
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          email,
          password,
          role: "member",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }
      setLoading(false);
      // on success redirect to login
      navigate("/login");
    } catch (err) {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div
        className="
          mx-auto
          max-w-7xl
          p-4 md:p-8
          mt-8 mb-10
          flex
          flex-col md:flex-row
          gap-8 md:gap-10
          bg-[#444444]
          rounded-xl
          shadow-2xl
        "
      >
        <div
          className="hidden md:block w-full md:w-1/2 h-96 lg:h-[600px] bg-cover bg-center rounded-lg shadow-xl"
          style={{ backgroundImage: `url(${BeratCok})` }}
          aria-hidden="true"
        ></div>

        <div className="w-full md:w-1/2 text-white">
          <h2 className="text-3xl font-extrabold mb-1">Create Your Account</h2>
          <h3 className="text-sm mb-6 text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#ff1f1f] hover:text-[#ff6161] font-semibold transition-colors"
            >
              Log In
            </Link>
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded bg-[#333] text-white focus:outline-none"
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded bg-[#333] text-white focus:outline-none"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded bg-[#333] text-white focus:outline-none"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Confirm Password</label>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full p-3 rounded bg-[#333] text-white focus:outline-none"
                type="password"
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="pt-2">
              <input
                className="mr-2 h-4 w-4 text-[#ff1f1f] border-gray-300 rounded focus:ring-[#ff1f1f] cursor-pointer"
                type="checkbox"
                id="terms"
                required
              />
              <label className="text-sm text-gray-300" htmlFor="terms">
                I Accept the{" "}
                <Link
                  className="text-[#ff1f1f] hover:text-[#ff6161] hover:underline"
                  to="/termscondition"
                >
                  Terms & Conditions
                </Link>
              </label>
            </div>

            {error && <div className="text-red-400 text-sm">{error}</div>}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full sm:w-auto
                  text-lg
                  font-bold
                  text-white
                  bg-[#ff1f1f]
                  hover:bg-[#d41b1b]
                  px-6 py-3
                  rounded-lg
                  shadow-md
                  transition-colors
                  block
                  mx-auto sm:mx-0
                  disabled:opacity-60
                "
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
