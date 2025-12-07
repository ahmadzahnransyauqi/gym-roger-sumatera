import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaIdCard,
  FaDumbbell,
  FaChartLine,
  FaSignOutAlt,
  FaTrash,
  FaPlus,
  FaTags,
  FaEdit,
  FaHistory,
  FaTimes,
  FaUserSlash,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaListAlt,
  FaQrcode,
  FaBars, // Added for hamburger menu
  FaTimes as FaClose, // Added for close icon
} from "react-icons/fa";
import { useZxing } from "react-zxing"; // Added for QR scanning
import logoImg from "../../assets/logotext.png";
import { useAuth } from "../../hook/useAuth";

// --- COLORS ---
const C = {
  bg: "#1a1a1a", // Main Background
  sidebar: "#202020", // Sidebar (Darker Matte)
  card: "#252525", // Cards
  accent: "#ff1f1f", // Roger Red
  text: "#ffffff",
  textMuted: "#9CA3AF",
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on small screens
  const { logout } = useAuth(); // make sure you have access to the hook

  // Handle window resize to auto-open sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // Open on md+ screens
      } else {
        setSidebarOpen(false); // Close on small screens
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="flex min-h-screen font-sans text-gray-100"
      style={{ backgroundColor: C.bg }}
    >
      {/* SIDEBAR */}
      <aside
        className={`fixed h-full w-64 z-20 flex flex-col shadow-2xl border-r border-[#333] transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`} // Always visible on md+, slide on small
        style={{ backgroundColor: C.sidebar }}
      >
        {/* LOGO */}
        <div className="h-28 flex items-center justify-center border-b border-[#333]">
          <img
            src={logoImg}
            alt="Roger Sumatera"
            className="w-44 h-auto object-contain hover:scale-105 transition-transform"
          />
        </div>

        <nav className="flex-1 py-8 space-y-2 overflow-y-auto px-3">
          <NavBtn
            icon={<FaTachometerAlt />}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <NavBtn
            icon={<FaUsers />}
            label="Manage Users"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          />
          <NavBtn
            icon={<FaTags />}
            label="Manage Promo"
            active={activeTab === "promos"}
            onClick={() => setActiveTab("promos")}
          />
          <NavBtn
            icon={<FaIdCard />}
            label="Membership Plans"
            active={activeTab === "membership"}
            onClick={() => setActiveTab("membership")}
          />
          <NavBtn
            icon={<FaDumbbell />}
            label="Classes & Schedule"
            active={activeTab === "classes"}
            onClick={() => setActiveTab("classes")}
          />
          <NavBtn
            icon={<FaQrcode />}
            label="Scan QR Code"
            active={activeTab === "scan-qr"}
            onClick={() => setActiveTab("scan-qr")}
          />
        </nav>

        <div className="p-5 border-t border-[#333]">
          <button
            onClick={() => setLogoutModal(true)}
            className="w-full py-3 rounded font-bold text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-red-900/50 hover:-translate-y-0.5 transition-all"
            style={{ backgroundColor: C.accent }}
          >
            <FaSignOutAlt /> LOGOUT
          </button>
        </div>
      </aside>

      {/* BACKDROP for small screens when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-0 md:ml-64 p-4 md:p-10"> {/* No margin on small, margin on md+ */}
        <header className="mb-6 md:mb-10 flex items-center justify-between border-b border-[#333] pb-4 md:pb-6">
          <div className="flex items-center gap-4">
            {/* Hamburger button for small screens */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-white p-2 rounded hover:bg-[#333] transition"
            >
              {sidebarOpen ? <FaClose size={20} /> : <FaBars size={20} />}
            </button>
            <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest flex items-center gap-4">
              <div
                className="w-1.5 h-6 md:h-8 rounded-full shadow-[0_0_10px_#ff1f1f]"
                style={{ backgroundColor: C.accent }}
              ></div>
              {activeTab.replace("-", " ")}
            </h1>
          </div>
          <div className="text-xs text-gray-500 font-mono tracking-widest bg-[#252525] px-2 md:px-3 py-1 rounded border border-[#333]">
            ADMIN DASHBOARD - ROGER SUMATERA
          </div>
        </header>

        <div className="animate-fade-in">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "users" && <ManageUsers />}
          {activeTab === "promos" && <ManagePromos />}
          {activeTab === "membership" && <ManagePlans />}
          {activeTab === "classes" && <ManageClasses />}
          {activeTab === "scan-qr" && <ScanQR />}
        </div>
      </main>

      {/* Custom Logout Modal */}
      <Modal
        isOpen={logoutModal}
        onClose={() => setLogoutModal(false)}
        title="Confirm Logout"
      >
        <p className="text-gray-300 mb-6">Are you sure you want to logout?</p>
        <div className="flex gap-4">
          <button
            onClick={async () => {
              await logout(); // revoke token + clear local storage
              setLogoutModal(false); // close modal
              navigate("/"); // redirect to homepage or login
            }}
            className="flex-1 bg-[#ff1f1f] hover:bg-[#ff6161] text-white py-3 rounded-lg font-bold transition"
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
};

// --- REUSABLE UI ---
const NavBtn = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-4 py-3.5 rounded-lg transition-all duration-200 group ${
      active
        ? "text-white shadow-lg bg-[#333]"
        : "text-gray-400 hover:bg-[#2A2A2A] hover:text-white"
    }`}
  >
    <span
      className={`mr-4 text-lg transition-colors ${
        active ? "text-[#ff1f1f]" : "group-hover:text-[#ff1f1f]"
      }`}
    >
      {icon}
    </span>
    <span className="font-semibold text-sm tracking-wide">{label}</span>
  </button>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1E1E1E] w-full max-w-lg rounded-xl shadow-2xl border border-[#333] animate-scale-in">
        <div className="flex justify-between items-center p-6 border-b border-[#333]">
          <h3 className="text-xl font-bold text-white tracking-wide border-l-4 border-[#ff1f1f] pl-3">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const Table = ({ headers, children }) => (
  <div className="rounded-lg overflow-hidden border border-[#333] shadow-xl bg-[#1E1E1E] overflow-x-auto">
    <table className="w-full text-left min-w-full">
      <thead className="bg-[#252525] text-gray-400 text-xs uppercase font-bold tracking-wider">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-4 border-b border-[#333]">
              {h}
            </th>
          ))}
        </tr>
      </thead><tbody className="divide-y divide-[#333] text-sm text-gray-200">
        {children}
      </tbody>
    </table>
  </div>
);

// --- 1. DASHBOARD VIEW (8 STATS) ---
const DashboardView = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/admin/stats`).then((res) => setData(res.data));
  }, []);

  if (!data)
    return (
      <div className="text-center p-10 text-gray-500">
        Loading Dashboard Data...
      </div>
    );

  return (
    <div className="space-y-6 md:space-y-10">
      {/* 8 GRID STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"> {/* Adjusted for better small screen grid */}
        <StatBox
          title="Total Members"
          val={data.totalMembers}
          icon={<FaUsers />}
        />
        <StatBox
          title="Active Members"
          val={data.activeMembers}
          icon={<FaIdCard />}
          highlight
        />
        <StatBox
          title="Inactive Members"
          val={data.inactiveMembers}
          icon={<FaUserSlash />}
        />
        <StatBox
          title="Total Trainers"
          val={data.totalTrainers}
          icon={<FaChalkboardTeacher />}
        />

        <StatBox
          title="Total Classes"
          val={data.totalClasses}
          icon={<FaDumbbell />}
        />
        <StatBox
          title="Active Promos"
          val={data.activePromos}
          icon={<FaTags />}
        />
        <StatBox
          title="Membership Plans"
          val={data.totalPlans}
          icon={<FaListAlt />}
        />
        <StatBox
          title="Est. Monthly Revenue"
          val={`Rp ${data.estRevenue.toLocaleString()}`}
          icon={<FaMoneyBillWave />}
          color="text-green-500"
        />
      </div>

      {/* ACTIVITY LOGS */}
      <div className="bg-[#1E1E1E] p-6 md:p-8 rounded-lg border border-[#333] shadow-lg">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white border-b border-[#333] pb-4">
          <FaHistory className="text-[#ff1f1f]" /> Recent System Activities
        </h3>
        <ul className="space-y-4">
          {data.recentLogs?.map((log, i) => (
            <li
              key={i}
              className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#252525] p-4 rounded border border-[#333] hover:border-[#ff1f1f] transition"
            >
              <span className="text-gray-300 font-medium text-sm mb-2 md:mb-0">
                {log.activity}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const StatBox = ({ title, val, icon, highlight, color }) => (
  <div
    className={`bg-[#202020] p-4 md:p-6 rounded-lg border border-[#333] hover:border-[#ff1f1f] transition-all duration-300 shadow-lg group relative overflow-hidden`}
  >
    {highlight && (
      <div className="absolute top-0 right-0 w-2 h-2 bg-[#ff1f1f] rounded-bl-lg animate-pulse"></div>
    )}
    <div className="flex justify-between items-start z-10 relative">
      <div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
          {title}
        </p>
        <h2 className={`text-xl md:text-2xl font-extrabold ${color || "text-white"}`}>
          {val}
        </h2>
      </div>
      <div
        className={`text-2xl md:text-3xl ${
          highlight ? "text-[#ff1f1f]" : "text-[#333] group-hover:text-white"
        } transition-colors`}
      >
        {icon}
      </div>
    </div>
  </div>
);

// --- 2. MANAGE USERS ---
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [operationFailedAlert, setOperationFailedAlert] = useState(false);
  const [deleteFailedAlert, setDeleteFailedAlert] = useState(false);

  const fetchUsers = () =>
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/users`)
      .then((res) => setUsers(res.data));

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("USER IDS:", users.map((u) => u.id));
  }, [users]);

  const openAdd = () => {
    setEditData(null);
    setForm({ username: "", full_name: "", email: "", password: "", status: "active" });
    setModal(true);
  };

  const openEdit = (u) => {
    setEditData(u);
    setForm({ ...u, password: "" });
    setModal(true);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!editData && form.password.length < 6) {
      setPasswordAlert(true);
      return;
    }

    try {
      if (editData) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/admin/users/${editData.id}`,
          form
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/admin/users`,
          form
        );
      }

      setModal(false);
      fetchUsers();
      setSuccessAlert(true);

    } catch (err) {
      setOperationFailedAlert(true);
    }
  };

  const del = (id) => {
    setDeleteModal({ open: true, id });
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <AddBtn onClick={openAdd} label="ADD NEW USER" />
      </div>

      <Table headers={["Username", "Full Name", "Email", "Status", "Actions"]}>
        {users.map((u) => (
          <tr key={`${u.id}-${Math.random()}`} className="hover:bg-[#2A2A2A] transition">
            <td className="p-4 font-bold text-white">{u.username}</td>
            <td className="p-4">{u.full_name}</td>
            <td className="p-4 text-gray-500">{u.email}</td>
            <td className="p-4">
              <StatusBadge status={u.status} />
            </td>
            <td className="p-4 flex gap-2">
              <EditBtn onClick={() => openEdit(u)} />
              <DelBtn onClick={() => del(u.id)} />
            </td>
          </tr>
        ))}
      </Table>

      {/* CREATE / EDIT MODAL */}
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={editData ? "Edit User Details" : "Create New User"}
      >
        <form onSubmit={submit} className="space-y-5">
          <Input
            label="Username"
            val={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            disabled={!!editData}
          />
          <Input
            label="Full Name"
            val={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          />
          <Input
            label="Email Address"
            type="email"
            val={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {editData ? (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 uppercase font-bold">
                Membership Status
              </label>

              <select
                className="bg-[#2A2A2A] text-white p-3 rounded border border-[#444] focus:border-[#ff1f1f] outline-none"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          ) : (
            <Input
              label="Password (Min 6 chars)"
              type="password"
              val={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          )}

          <SubmitBtn label={editData ? "SAVE CHANGES" : "CREATE USER"} />
        </form>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null })}
        title="Confirm Delete"
      >
        <p className="text-gray-300 mb-6">Permanently delete this user?</p>
        <div className="flex gap-4">
          <button
            onClick={async () => {
              try {
                await axios.delete(
                  `${import.meta.env.VITE_API_URL}/api/admin/users/${deleteModal.id}`
                );
                fetchUsers();
                setDeleteModal({ open: false, id: null });
              } catch (err) {
                setDeleteFailedAlert(true);
              }
            }}
            className="flex-1 bg-[#ff1f1f] hover:bg-[#ff6161] text-white py-3 rounded-lg font-bold transition"
          >
            Yes
          </button>

          <button
            onClick={() => setDeleteModal({ open: false, id: null })}
            className="flex-1 bg-[#333] hover:bg-[#444] text-white py-3 rounded-lg font-bold transition"
          >
            No
          </button>
        </div>
      </Modal>

      {/* ALERT MODALS */}
      <Modal
        isOpen={passwordAlert}
        onClose={() => setPasswordAlert(false)}
        title="Alert"
      >
        <p className="text-gray-300 mb-6">
          Password must be at least 6 characters!
        </p>
        <button
          onClick={() => setPasswordAlert(false)}
          className="w-full bg-[#ff1f1f] hover:bg-[#ff6161] text-white py-3 rounded-lg font-bold transition"
        >
          OK
        </button>
      </Modal>

      <Modal
        isOpen={successAlert}
        onClose={() => setSuccessAlert(false)}
        title="Success"
      >
        <p className="text-gray-300 mb-6">Success!</p>
        <button
          onClick={() => setSuccessAlert(false)}
          className="w-full bg-[#ff1f1f] hover:bg-[#ff6161] text-white py-3 rounded-lg font-bold transition"
        >
          OK
        </button>
      </Modal>

      <Modal
        isOpen={operationFailedAlert}
        onClose={() => setOperationFailedAlert(false)}
        title="Error"
      >
        <p className="text-gray-300 mb-6">Operation Failed</p>
        <button
          onClick={() => setOperationFailedAlert(false)}
          className="w-full bg-[#ff1f1f] hover:bg-[#ff6161] text-white py-3 rounded-lg font-bold transition"
        >
          OK
        </button>
      </Modal>

      <Modal
        isOpen={deleteFailedAlert}
        onClose={() => setDeleteFailedAlert(false)}
        title="Error"
      >
        <p className="text-gray-300 mb-6">Delete Failed</p>
        <button
          onClick={() => setDeleteFailedAlert(false)}
          className="w-full bg-[#ff1f1f] hover:bg-[#ff6161] text-white py-3 rounded-lg font-bold transition"
        >
          OK
        </button>
      </Modal>
    </div>
  );
};

// --- 3. MANAGE PROMOS ---
const ManagePromos = () => {
  const [promos, setPromos] = useState([]);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  const fetch = () =>
    axios.get(`${import.meta.env.VITE_API_URL}/api/admin/promos`).then((res) => setPromos(res.data));
  useEffect(() => {
    fetch();
  }, []);

  const openAdd = () => {
    setEditData(null);
    setForm({ title: "", desc: "", discount: "", valid: "" });
    setModal(true);
  };
  const openEdit = (p) => {
    setEditData(p);
    setForm({
      ...p,
      discount: p.discount_percentage,
      valid: p.valid_until ? p.valid_until.split("T")[0] : "",
    });
    setModal(true);
  };
  const submit = async (e) => {
    e.preventDefault();
    editData
      ? await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/promos/${editData.id}`, form)
      : await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/promos`, form);
    setModal(false);
    fetch();
  };
  const del = (id) => setDeleteModal({ open: true, id });

  return (
    <div>
      <div className="flex justify-end mb-6">
        <AddBtn onClick={openAdd} label="ADD PROMOTION" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {promos.map((p) => (
          <div
            key={p.id}
            className="bg-[#202020] p-6 rounded border border-[#333] hover:border-[#ff1f1f] transition shadow-lg group relative"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg text-white mb-1">{p.title}</h4>
                <p className="text-gray-400 text-sm mb-4">{p.description}</p>
                <div className="flex gap-2">
                  <span className="bg-[#ff1f1f] text-white px-2 py-1 rounded text-xs font-bold">
                    {p.discount_percentage}% OFF
                  </span>
                  <span className="bg-[#333] text-gray-300 px-2 py-1 rounded text-xs">
                    Exp: {p.valid_until ? p.valid_until.split("T")[0] : "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                <EditBtn onClick={() => openEdit(p)} />
                <DelBtn onClick={() => del(p.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={editData ? "Edit Promotion" : "Add Promotion"}
      >
        <form onSubmit={submit} className="space-y-4">
          <Input
            label="Promotion Title"
            val={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            label="Description"
            val={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
          <Input
            label="Discount Percentage"
            type="number"
            val={form.discount}
            onChange={(e) => setForm({ ...form, discount: e.target.value })}
          />
          <Input
            label="Valid Until"
            type="date"
            val={form.valid}
            onChange={(e) => setForm({ ...form, valid: e.target.value })}
          />
          <SubmitBtn label="SAVE PROMOTION" />
        </form>
      </Modal>

      {/* Custom Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null })}
        title="Confirm Delete"
      >
        <p className="text-gray-300 mb-6">Delete promo?</p>
        <div className="flex gap-4">
          <button
            onClick={async () => {
              try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/promos/${deleteModal.id}`);
                fetch();
                setDeleteModal({ open: false, id: null });
              } catch {
                alert("Delete Failed");
              }
            }}
            className="flex-1 bg-[#ff1f1f] hover:bg-[#ff6161] text-white py-3 rounded-lg font-bold transition"
          >
            Yes
          </button>
          <button
            onClick={() => setDeleteModal({ open: false, id: null })}
            className="flex-1 bg-[#333] hover:bg-[#444] text-white py-3 rounded-lg font-bold transition"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  const fetch = () =>
    axios.get(`${import.meta.env.VITE_API_URL}/api/admin/plans`).then((res) => setPlans(res.data));

  useEffect(() => {
    fetch();
  }, []);

  const openAdd = () => {
    setEditData(null);
    setForm({
      name: "",
      price: "",
      duration: 30, // temp variable for form
      benefits: "",
    });
    setModal(true);
  };

  const openEdit = (p) => {
    setEditData(p);

    setForm({
      name: p.name,
      price: p.price,
      duration: p.duration_days, // convert DB -> form
      benefits: Array.isArray(p.benefits)
        ? p.benefits.join(", ")
        : p.benefits || "",
    });

    setModal(true);
  };

  const submit = async (e) => {
    e.preventDefault();

    // create payload for backend
    const payload = {
      name: form.name,
      price: form.price,
      duration_days: Number(form.duration), // convert form -> DB
      benefits: form.benefits, // comma separated string
    };

    if (editData) {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/plans/${editData.id}`, payload);
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/plans`, payload);
    }

    setModal(false);
    fetch();
  };

  const del = (id) => setDeleteModal({ open: true, id });

  return (
    <div>
      <div className="flex justify-end mb-6">
        <AddBtn onClick={openAdd} label="ADD MEMBERSHIP PLAN" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const benefitList = Array.isArray(p.benefits)
            ? p.benefits
            : typeof p.benefits === "string"
            ? p.benefits.split(",").map((b) => b.trim())
            : [];

          return (
            <div
              key={p.id}
              className="bg-[#202020] p-6 rounded border-t-4 border-[#ff1f1f] hover:scale-105 transition shadow-xl group relative"
            >
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button onClick={() => openEdit(p)} className="text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => del(p.id)} className="text-red-500">
                  <FaTrash />
                </button>
              </div>

              <h3 className="text-xl font-bold text-white">{p.name}</h3>

              <p className="text-3xl font-extrabold text-[#ff1f1f] my-3">
                Rp {parseInt(p.price).toLocaleString()}
              </p>

              <p className="text-xs text-gray-500 font-bold uppercase mb-4 tracking-widest">
                {p.duration_days} DAYS ACCESS
              </p>

              <ul className="text-sm text-gray-400 border-t border-[#333] pt-4 leading-relaxed list-disc pl-4">
                {benefitList.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={editData ? "Edit Plan" : "New Plan"}
      >
        <form onSubmit={submit} className="space-y-4">
          <Input
            label="Plan Name"
            val={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Price (Rp)"
            type="number"
            val={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <Input
            label="Duration (Days)"
            type="number"
            val={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
          <Input
            label="Benefits (comma separated)"
            val={form.benefits}
            onChange={(e) => setForm({ ...form, benefits: e.target.value })}
          />

          <SubmitBtn label="SAVE PLAN" />
        </form>
      </Modal>

      {/* Custom Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null })}
        title="Confirm Delete"
      >
        <p className="text-gray-300 mb-6">Delete plan?</p>
        <div className="flex gap-4">
          <button
            onClick={async () => {
              try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/plans/${deleteModal.id}`);
                fetch();
                setDeleteModal({ open: false, id: null });
              } catch {
                alert("Delete Failed");
              }
            }}
            className="flex-1 bg-[#ff1f1f] hover:bg-[#ff6161] text-white py-3 rounded-lg font-bold transition"
          >
            Yes
          </button>
          <button
            onClick={() => setDeleteModal({ open: false, id: null })}
            className="flex-1 bg-[#333] hover:bg-[#444] text-white py-3 rounded-lg font-bold transition"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

// --- 5. MANAGE CLASSES ---
const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });

  const fetch = () =>
    axios.get(`${import.meta.env.VITE_API_URL}/api/admin/classes`).then((res) => setClasses(res.data));

  useEffect(() => {
    fetch();
  }, []);

  const openAdd = () => {
    setEditData(null);
    setForm({
      name: "",
      trainer: "",
      day: "",
      start: "",
      end: "",
      difficulty: "Beginner",
      categories: "Dance",
      spots: 0,
      totalSpots: 0,
    });
    setModal(true);
  };

  const openEdit = (c) => {
    setEditData(c);
    setForm({
      name: c.class_name,
      trainer: c.trainer_name,
      day: c.day_of_week,
      start: c.start_time,
      end: c.end_time,
      difficulty: c.difficulty || "Beginner",
      categories: c.categories || "Dance",
      spots: c.spots || 0,
      totalSpots: c.total_spots || 0,
    });
    setModal(true);
  };

  const submit = async (e) => {
    e.preventDefault();

    // Map form fields to match backend column names
    const payload = {
      class_name: form.name, // maps to backend class_name
      trainer_name: form.trainer, // maps to backend trainer_name
      day_of_week: form.day, // maps to backend day_of_week
      start_time: form.start, // maps to backend start_time
      end_time: form.end, // maps to backend end_time
      difficulty: form.difficulty,
      categories: form.categories,
      spots: parseInt(form.spots) || 0,
      total_spots: parseInt(form.totalSpots) || 0,
    };

    console.log("PUT payload:", payload);

    if (editData) {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/classes/${editData.id}`, payload);
    } else {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/classes`, payload);
    }

    setModal(false);
    fetch();
  };

  const del = (id) => setDeleteModal({ open: true, id });

  return (
    <div>
      <div className="flex justify-end mb-6">
        <AddBtn onClick={openAdd} label="ADD CLASS" />
      </div>

      <Table
        headers={[
          "Class Name",
          "Trainer",
          "Days",
          "Time",
          "Difficulty",
          "Categories",
          "Spots",
          "Actions",
        ]}
      >
        {classes.map((c) => (
          <tr key={c.id} className="hover:bg-[#2A2A2A]">
            <td className="p-4 font-bold text-[#ff1f1f]">{c.class_name}</td>
            <td className="p-4 text-white">{c.trainer_name}</td>
            <td className="p-4 text-gray-400">{c.day_of_week}</td>
            <td className="p-4 font-mono text-xs text-gray-500">
              {c.start_time?.slice(0, 5)} - {c.end_time?.slice(0, 5)}
            </td>
            <td className="p-4 text-white">{c.difficulty || "-"}</td>
                       <td className="p-4 text-gray-300">{c.categories || "-"}</td>
            <td className="p-4 text-gray-300">
              {c.spots}/{c.total_spots}
            </td>
            <td className="p-4 flex gap-2">
              <EditBtn onClick={() => openEdit(c)} />
              <DelBtn onClick={() => del(c.id)} />
            </td>
          </tr>
        ))}
      </Table>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={editData ? "Edit Schedule" : "Add Schedule"}
      >
        <div className="max-h-[70vh] hide-scrollbar overflow-y-auto pr-2">
          <form onSubmit={submit} className="space-y-4">
            <Input
              label="Class Name"
              val={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <Input
              label="Trainer"
              val={form.trainer}
              onChange={(e) => setForm({ ...form, trainer: e.target.value })}
            />

            <Input
              label="Days (e.g., Mon-Wed or Mon, Wed)"
              val={form.day}
              onChange={(e) => setForm({ ...form, day: e.target.value })}
            />

            <div className="flex gap-4">
              <Input
                label="Start Time"
                type="time"
                val={form.start}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
              />
              <Input
                label="End Time"
                type="time"
                val={form.end}
                onChange={(e) => setForm({ ...form, end: e.target.value })}
              />
            </div>

            {/* SELECT: Difficulty */}
            <div className="space-y-1">
              <label className="text-gray-300 text-sm">Difficulty</label>
              <select
                value={form.difficulty}
                onChange={(e) =>
                  setForm({ ...form, difficulty: e.target.value })
                }
                className="w-full p-2 rounded bg-[#1d1d1d] text-white border border-gray-600"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* SELECT: Categories */}
            <div className="space-y-1">
              <label className="text-gray-300 text-sm">Categories</label>
              <select
                value={form.categories}
                onChange={(e) =>
                  setForm({ ...form, categories: e.target.value })
                }
                className="w-full p-2 rounded bg-[#1d1d1d] text-white border border-gray-600"
              >
                <option value="Dance">Dance</option>
                <option value="Cardio">Cardio</option>
                <option value="Strength">Strength</option>
                <option value="Mind & Body">Mind & Body</option>
              </select>
            </div>

            {/* INPUT: Spots */}
            <div className="flex gap-4">
              <Input
                label="Spots"
                type="number"
                val={form.spots}
                onChange={(e) =>
                  setForm({
                    ...form,
                    spots:
                      e.target.value === "" ? "" : parseInt(e.target.value),
                  })
                }
              />
              <Input
                label="Total Spots"
                type="number"
                val={form.totalSpots}
                onChange={(e) =>
                  setForm({
                    ...form,
                    totalSpots: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>

            <SubmitBtn label="SAVE SCHEDULE" />
          </form>
        </div>
      </Modal>

      {/* Custom Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null })}
        title="Confirm Delete"
      >
        <p className="text-gray-300 mb-6">Delete class?</p>
        <div className="flex gap-4">
          <button
            onClick={async () => {
              try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/classes/${deleteModal.id}`);
                fetch();
                setDeleteModal({ open: false, id: null });
              } catch {
                alert("Delete Failed");
              }
            }}
            className="flex-1 bg-[#ff1f1f] hover:bg-[#ff6161] text-white py-3 rounded-lg font-bold transition"
          >
            Yes
          </button>
          <button
            onClick={() => setDeleteModal({ open: false, id: null })}
            className="flex-1 bg-[#333] hover:bg-[#444] text-white py-3 rounded-lg font-bold transition"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

const ScanQR = () => {
  const [result, setResult] = useState("");
  const [serverResponse, setServerResponse] = useState(null);
  const [error, setError] = useState(null);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [cameraId, setCameraId] = useState(null);

  // Check available cameras on mount
  useEffect(() => {
    const checkCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setAvailableCameras(videoDevices);
        if (videoDevices.length > 0) setCameraId(videoDevices[0].deviceId);
        console.log("Available cameras:", videoDevices);
      } catch (err) {
        console.error("Error enumerating devices:", err);
        setError("Cannot access camera devices.");
      }
    };
    checkCameras();
  }, []);

  // Setup ZXing scanner
  const { ref } = useZxing({
    constraints: cameraId
      ? { video: { deviceId: { exact: cameraId } } }
      : { video: true },
    onDecodeResult(result) {
      const scannedToken = result.getText();
      console.log("QR Scanned:", scannedToken);
      setResult(scannedToken);
      sendToBackend(scannedToken);
    },
    onError(err) {
      console.error("Scanner Error:", err);
      if (availableCameras.length > 1) {
        // Try the next camera if available
        const nextIndex =
          (availableCameras.findIndex((cam) => cam.deviceId === cameraId) + 1) %
          availableCameras.length;
        setCameraId(availableCameras[nextIndex].deviceId);
      } else {
        setError("Camera access failed. Check permissions or device.");
      }
    },
  });

  // Send scanned token to backend
  const sendToBackend = async (token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/qr/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qr_token: token }),
      });

      const data = await res.json();
      setServerResponse(data);
    } catch (err) {
      console.error("Backend Error:", err);
      setServerResponse({
        status: "error",
        message: "Failed to connect to server",
      });
    }
  };

  return (
    <div className="text-center p-4 md:p-10 bg-[#1E1E1E] rounded-lg border border-[#333] shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">
        🔍 Scan QR Gym System
      </h2>

      {/* Debug info */}
      <p className="text-xs text-gray-500 mb-2">
        Available Cameras:{" "}
        {availableCameras.length > 0
          ? availableCameras.map((cam) => cam.label || "Unnamed").join(", ")
          : "None detected"}
      </p>

      {/* Error display */}
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {/* Video feed */}
      <div className="flex justify-center">
        <video
          ref={ref}
          style={{
            width: "300px",
            height: "200px",
            borderRadius: "10px",
            border: "2px solid #ff1f1f",
          }}
          autoPlay
          muted
          playsInline
        />
      </div>

      {/* Scanned QR token */}
      <h3 className="text-lg font-semibold text-gray-300 mt-4">
        QR Token Terbaca:{" "}
        <span className="text-[#ff1f1f]">{result || "Belum ada"}</span>
      </h3>

      {/* Server response */}
      {serverResponse && (
        <div
          className={`mt-6 p-4 rounded-lg border ${
            serverResponse.status === "success"
              ? "bg-green-900/20 border-green-500 text-green-300"
              : "bg-red-900/20 border-red-500 text-red-300"
          }`}
        >
          <h3 className="font-bold">{serverResponse.message}</h3>
          {serverResponse.user && (
            <p className="mt-2">👤 Nama: {serverResponse.user.full_name}</p>
          )}
        </div>
      )}
    </div>
  );
};

// --- COMPONENTS UTILS ---
const AddBtn = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="bg-[#ff1f1f] hover:bg-[#ff6161] text-white px-4 md:px-6 py-3 rounded-lg font-bold shadow-lg shadow-red-900/20 flex items-center gap-2 transition-transform hover:-translate-y-0.5"
  >
    <FaPlus /> {label}
  </button>
);
const EditBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#333] text-blue-400 p-2.5 rounded hover:bg-blue-600 hover:text-white transition"
  >
    <FaEdit />
  </button>
);
const DelBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#333] text-red-400 p-2.5 rounded hover:bg-red-600 hover:text-white transition"
  >
    <FaTrash />
  </button>
);
const SubmitBtn = ({ label }) => (
  <button className="w-full bg-[#ff1f1f] hover:bg-[#ff6161] text-white py-3.5 rounded-lg font-bold shadow-lg transition tracking-wide">
    {label}
  </button>
);
const Input = ({ label, val, onChange, type = "text", disabled = false }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs text-gray-500 uppercase font-bold tracking-wider">
      {label}
    </label>
    <input
      type={type}
      value={val || ""}
      onChange={onChange}
      disabled={disabled}
      className="bg-[#2A2A2A] text-white p-3.5 rounded border border-[#444] focus:border-[#ff1f1f] focus:ring-1 focus:ring-[#ff1f1f] focus:outline-none transition-all disabled:opacity-50"
    />
  </div>
);
const StatusBadge = ({ status }) => (
  <span
    className={`px-3 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest ${
      status === "active"
        ? "bg-green-900/30 text-green-400 border border-green-800"
        : "bg-red-900/30 text-red-400 border border-red-800"
    }`}
  >
    {status}
  </span>
);

export default AdminDashboard;