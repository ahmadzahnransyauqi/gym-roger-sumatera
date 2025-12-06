import { useState, useEffect } from "react";
import logoText from "../../assets/logotext.png";
import Regist from "./registration.jsx";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="w-full bg-[#1a1a1a] px-3 md:px-6 py-2 font-sans flex items-center justify-between relative min-w-0">
      {/* Left: burger (mobile only) + logo */}
      <div className="flex items-center gap-2 min-w-0">
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="p-1 md:p-2 rounded-md text-white hover:bg-[#303030] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6161] md:hidden"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <img src={logoText} alt="Logo" className="w-16 md:w-28 lg:w-32 object-contain" />
      </div>

      {/* Desktop nav: visible on md+ */}
      <nav className="hidden md:flex items-center gap-3 ml-4">
        <Link to="/" className="text-white px-3 py-2 rounded hover:bg-[#303030]">Home</Link>
        <Link to="/class" className="text-white px-3 py-2 rounded hover:bg-[#303030]">Class</Link>
        <Link to="/membership" className="text-white px-3 py-2 rounded hover:bg-[#303030]">Membership</Link>
        <Link to="/aboutus" className="text-white px-3 py-2 rounded hover:bg-[#303030]">About Us</Link>
      </nav>

      {/* Registration on the right (always visible) */}
      <div className="ml-auto flex items-center min-w-0">
        <Regist />
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar menu */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#1a1a1a] z-40 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } shadow-lg md:hidden`}
        aria-hidden={!open}
      >
        <div className="p-4 flex items-center justify-between border-b border-b-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="text-white font-bold">Menu</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-md text-white hover:bg-[#303030] focus:outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          <Link to="/" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-[#303030] text-white">Home</Link>
          <Link to="/class" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-[#303030] text-white">Class</Link>
          <Link to="/membership" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-[#303030] text-white">Membership</Link>
          <Link to="/aboutus" onClick={() => setOpen(false)} className="px-3 py-2 rounded hover:bg-[#303030] text-white">About Us</Link>
        </nav>

        <div className="px-4 mt-auto mb-6">
          <p className="text-sm text-gray-300">Quick access</p>
          <div className="flex gap-2 mt-3">
            <Link to="/login" onClick={() => setOpen(false)} className="hover:bg-[#303030] px-3 py-1 rounded text-white">Login</Link>
            <Link to="/register" onClick={() => setOpen(false)} className="bg-[#ff1f1f] hover:bg-[#ff6161] px-3 py-1 rounded text-white">Sign Up</Link>
          </div>
        </div>
      </aside>
    </header>
  );
}