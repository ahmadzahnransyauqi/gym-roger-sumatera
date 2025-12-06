import {
  Users,
  Activity,
  Apple,
  User,
  Settings,
  Home,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import logoimg from "../../assets/logotext.png";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const menuItems = [
    { id: "/user", label: "Dashboard", icon: Home },
    { id: "/user/bodyassessment", label: "Body Assessment", icon: Activity },
    { id: "/user/nutritionguidance", label: "Nutrition Guidance", icon: Apple },
    { id: "/user/groupclasses", label: "Group Classes", icon: Users },
    { id: "/user/profile", label: "Profile", icon: User },
    { id: "/user/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    setShowLogoutPopup(true); // show custom popup
  };

  const confirmLogout = () => {
    logout(); // clear data
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <>
      <aside
        className="w-64 min-h-screen shrink-0 p-6"
        style={{ backgroundColor: "#202020" }}
      >
        <div className="mb-8">
          <img src={logoimg} alt="Logo" />
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.id;

            return (
              <Link
                key={item.id}
                to={item.id}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                style={{
                  backgroundColor: isActive ? "#252525" : "transparent",
                  color: isActive ? "#ff1f1f" : "#9CA3AF",
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:opacity-80 mt-4"
          style={{
            backgroundColor: "#1a1a1a",
            color: "#ff1f1f",
            border: "1px solid #ff1f1f",
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* 🔥 Custom Logout Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-[#1a1a1a83] flex justify-center items-center z-50">
          <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-xl w-80 animate-fadeIn text-center border border-[#333]">
            <h2 className="text-lg font-semibold text-white mb-4">
              Are you sure you want to Logout?
            </h2>

            <div className="flex justify-between mt-6">
              <button
                onClick={cancelLogout}
                className="w-1/2 mr-2 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="w-1/2 ml-2 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
