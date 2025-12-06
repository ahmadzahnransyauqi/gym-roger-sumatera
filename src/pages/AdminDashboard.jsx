import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaIdCard, FaDumbbell, FaChartLine, FaSignOutAlt, FaTrash, FaPlus, FaTags, FaEdit, FaHistory, FaTimes, FaUserSlash, FaChalkboardTeacher, FaMoneyBillWave, FaListAlt } from 'react-icons/fa';
import logoImg from '../assets/logotext.png';

const API_URL = 'http://localhost:3000/api/admin';

// --- COLORS ---
const C = {
  bg: '#1a1a1a',      // Main Background
  sidebar: '#202020', // Sidebar (Darker Matte)
  card: '#252525',    // Cards
  accent: '#ff1f1f',  // Roger Red
  text: '#ffffff',
  textMuted: '#9CA3AF'
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen font-sans text-gray-100" style={{ backgroundColor: C.bg }}>
      {/* SIDEBAR */}
      <aside className="w-64 fixed h-full z-20 flex flex-col shadow-2xl border-r border-[#333]" style={{ backgroundColor: C.sidebar }}>
        {/* REVISI LOGO*/}
        <div className="h-28 flex items-center justify-center border-b border-[#333]">
          <img src={logoImg} alt="Roger Sumatera" className="w-44 h-auto object-contain hover:scale-105 transition-transform" />
        </div>

        <nav className="flex-1 py-8 space-y-2 overflow-y-auto px-3">
          <NavBtn icon={<FaTachometerAlt />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavBtn icon={<FaUsers />} label="Manage Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
          <NavBtn icon={<FaTags />} label="Manage Promo" active={activeTab === 'promos'} onClick={() => setActiveTab('promos')} />
          <NavBtn icon={<FaIdCard />} label="Membership Plans" active={activeTab === 'membership'} onClick={() => setActiveTab('membership')} />
          <NavBtn icon={<FaDumbbell />} label="Classes & Schedule" active={activeTab === 'classes'} onClick={() => setActiveTab('classes')} />
        </nav>

        <div className="p-5 border-t border-[#333]">
          <button 
            onClick={() => confirm("Are you sure you want to logout?") && navigate('/')} 
            className="w-full py-3 rounded font-bold text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-red-900/50 hover:-translate-y-0.5 transition-all" 
            style={{ backgroundColor: C.accent }}
          >
            <FaSignOutAlt /> LOGOUT
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 flex items-center justify-between border-b border-[#333] pb-6">
          <h1 className="text-3xl font-extrabold uppercase tracking-widest flex items-center gap-4">
             <div className="w-1.5 h-8 rounded-full shadow-[0_0_10px_#ff1f1f]" style={{ backgroundColor: C.accent }}></div>
             {activeTab.replace('-', ' ')}
          </h1>
          <div className="text-xs text-gray-500 font-mono tracking-widest bg-[#252525] px-3 py-1 rounded border border-[#333]">
            ADMIN DASHBOARD - ROGER SUMATERA
          </div>
        </header>

        <div className="animate-fade-in">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'users' && <ManageUsers />}
          {activeTab === 'promos' && <ManagePromos />}
          {activeTab === 'membership' && <ManagePlans />}
          {activeTab === 'classes' && <ManageClasses />}
        </div>
      </main>
    </div>
  );
};

// --- REUSABLE UI ---
const NavBtn = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center px-4 py-3.5 rounded-lg transition-all duration-200 group ${active ? 'text-white shadow-lg bg-[#333]' : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'}`}>
    <span className={`mr-4 text-lg transition-colors ${active ? 'text-[#ff1f1f]' : 'group-hover:text-[#ff1f1f]'}`}>{icon}</span>
    <span className="font-semibold text-sm tracking-wide">{label}</span>
  </button>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1E1E1E] w-full max-w-lg rounded-xl shadow-2xl border border-[#333] animate-scale-in">
        <div className="flex justify-between items-center p-6 border-b border-[#333]">
          <h3 className="text-xl font-bold text-white tracking-wide border-l-4 border-[#ff1f1f] pl-3">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition"><FaTimes size={20}/></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const Table = ({ headers, children }) => (
  <div className="rounded-lg overflow-hidden border border-[#333] shadow-xl bg-[#1E1E1E]">
    <table className="w-full text-left">
      <thead className="bg-[#252525] text-gray-400 text-xs uppercase font-bold tracking-wider">
        <tr>{headers.map((h, i) => <th key={i} className="p-4 border-b border-[#333]">{h}</th>)}</tr>
      </thead>
      <tbody className="divide-y divide-[#333] text-sm text-gray-200">{children}</tbody>
    </table>
  </div>
);

// --- 1. DASHBOARD VIEW (8 STATS) ---
const DashboardView = () => {
  const [data, setData] = useState(null);
  useEffect(() => { axios.get(`${API_URL}/stats`).then(res => setData(res.data)); }, []);

  if (!data) return <div className="text-center p-10 text-gray-500">Loading Dashboard Data...</div>;

  return (
    <div className="space-y-10">
      {/* 8 GRID STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatBox title="Total Members" val={data.totalMembers} icon={<FaUsers />} />
        <StatBox title="Active Members" val={data.activeMembers} icon={<FaIdCard />} highlight />
        <StatBox title="Inactive Members" val={data.inactiveMembers} icon={<FaUserSlash />} />
        <StatBox title="Total Trainers" val={data.totalTrainers} icon={<FaChalkboardTeacher />} />
        
        <StatBox title="Total Classes" val={data.totalClasses} icon={<FaDumbbell />} />
        <StatBox title="Active Promos" val={data.activePromos} icon={<FaTags />} />
        <StatBox title="Membership Plans" val={data.totalPlans} icon={<FaListAlt />} />
        <StatBox title="Est. Monthly Revenue" val={`Rp ${data.estRevenue.toLocaleString()}`} icon={<FaMoneyBillWave />} color="text-green-500" />
      </div>

      {/* ACTIVITY LOGS */}
      <div className="bg-[#1E1E1E] p-8 rounded-lg border border-[#333] shadow-lg">
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white border-b border-[#333] pb-4">
          <FaHistory className="text-[#ff1f1f]" /> Recent System Activities
        </h3>
        <ul className="space-y-4">
          {data.recentLogs?.map((log, i) => (
            <li key={i} className="flex justify-between items-center bg-[#252525] p-4 rounded border border-[#333] hover:border-[#ff1f1f] transition">
              <span className="text-gray-300 font-medium text-sm">{log.activity}</span>
              <span className="text-xs text-gray-500 font-mono">{new Date(log.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const StatBox = ({ title, val, icon, highlight, color }) => (
  <div className={`bg-[#202020] p-6 rounded-lg border border-[#333] hover:border-[#ff1f1f] transition-all duration-300 shadow-lg group relative overflow-hidden`}>
    {highlight && <div className="absolute top-0 right-0 w-2 h-2 bg-[#ff1f1f] rounded-bl-lg animate-pulse"></div>}
    <div className="flex justify-between items-start z-10 relative">
      <div>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{title}</p>
        <h2 className={`text-2xl font-extrabold ${color || 'text-white'}`}>{val}</h2>
      </div>
      <div className={`text-3xl ${highlight ? 'text-[#ff1f1f]' : 'text-[#333] group-hover:text-white'} transition-colors`}>{icon}</div>
    </div>
  </div>
);

// --- 2. MANAGE USERS ---
const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({});

  const fetch = () => axios.get(`${API_URL}/users`).then(res => setUsers(res.data));
  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditData(null); setForm({ username:'', full_name:'', email:'', password:'' }); setModal(true); };
  const openEdit = (u) => { setEditData(u); setForm({ ...u, password: '' }); setModal(true); };

  const submit = async (e) => {
    e.preventDefault();
    if (!editData && form.password.length < 6) return alert("Password must be at least 6 characters!");
    try {
      if (editData) await axios.put(`${API_URL}/users/${editData.id}`, form);
      else await axios.post(`${API_URL}/users`, form);
      setModal(false); fetch(); alert("Success!");
    } catch { alert('Operation Failed'); }
  };
  const del = async (id) => { if(confirm('Permanently delete this user?')) { await axios.delete(`${API_URL}/users/${id}`); fetch(); } };

  return (
    <div>
      <div className="flex justify-end mb-6"><AddBtn onClick={openAdd} label="ADD NEW USER" /></div>
      <Table headers={['Username', 'Full Name', 'Email', 'Status', 'Actions']}>
        {users.map(u => (
          <tr key={u.id} className="hover:bg-[#2A2A2A] transition">
            <td className="p-4 font-bold text-white">{u.username}</td>
            <td className="p-4">{u.full_name}</td>
            <td className="p-4 text-gray-500">{u.email}</td>
            <td className="p-4"><StatusBadge status={u.status} /></td>
            <td className="p-4 flex gap-2"><EditBtn onClick={() => openEdit(u)} /><DelBtn onClick={() => del(u.id)} /></td>
          </tr>
        ))}
      </Table>
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editData ? "Edit User Details" : "Create New User"}>
        <form onSubmit={submit} className="space-y-5">
          <Input label="Username" val={form.username} onChange={e => setForm({...form, username: e.target.value})} disabled={!!editData} />
          <Input label="Full Name" val={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})} />
          <Input label="Email Address" type="email" val={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          {editData ? (
             <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 uppercase font-bold">Membership Status</label>
                <select className="bg-[#2A2A2A] text-white p-3 rounded border border-[#444] focus:border-[#ff1f1f] outline-none" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
             </div>
          ) : (
            <Input label="Password (Min 6 chars)" type="password" val={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          )}
          <SubmitBtn label={editData ? "SAVE CHANGES" : "CREATE USER"} />
        </form>
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

  const fetch = () => axios.get(`${API_URL}/promos`).then(res => setPromos(res.data));
  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditData(null); setForm({ title:'', desc:'', discount:'', valid:'' }); setModal(true); };
  const openEdit = (p) => { setEditData(p); setForm({ ...p, discount: p.discount_percentage, valid: p.valid_until ? p.valid_until.split('T')[0] : '' }); setModal(true); };
  const submit = async (e) => { e.preventDefault(); editData ? await axios.put(`${API_URL}/promos/${editData.id}`, form) : await axios.post(`${API_URL}/promos`, form); setModal(false); fetch(); };
  const del = async (id) => { if(confirm('Delete promo?')) { await axios.delete(`${API_URL}/promos/${id}`); fetch(); } };

  return (
    <div>
      <div className="flex justify-end mb-6"><AddBtn onClick={openAdd} label="ADD PROMOTION" /></div>
      <div className="grid md:grid-cols-2 gap-6">
        {promos.map(p => (
          <div key={p.id} className="bg-[#202020] p-6 rounded border border-[#333] hover:border-[#ff1f1f] transition shadow-lg group relative">
             <div className="flex justify-between items-start">
               <div>
                 <h4 className="font-bold text-lg text-white mb-1">{p.title}</h4>
                 <p className="text-gray-400 text-sm mb-4">{p.description}</p>
                 <div className="flex gap-2">
                   <span className="bg-[#ff1f1f] text-white px-2 py-1 rounded text-xs font-bold">{p.discount_percentage}% OFF</span>
                   <span className="bg-[#333] text-gray-300 px-2 py-1 rounded text-xs">Exp: {p.valid_until ? p.valid_until.split('T')[0] : 'N/A'}</span>
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
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editData ? "Edit Promotion" : "Add Promotion"}>
        <form onSubmit={submit} className="space-y-4">
          <Input label="Promotion Title" val={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          <Input label="Description" val={form.desc} onChange={e => setForm({...form, desc: e.target.value})} />
          <Input label="Discount Percentage" type="number" val={form.discount} onChange={e => setForm({...form, discount: e.target.value})} />
          <Input label="Valid Until" type="date" val={form.valid} onChange={e => setForm({...form, valid: e.target.value})} />
          <SubmitBtn label="SAVE PROMOTION" />
        </form>
      </Modal>
    </div>
  );
};

// --- 4. MANAGE PLANS ---
const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState({});

  const fetch = () => axios.get(`${API_URL}/plans`).then(res => setPlans(res.data));
  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditData(null); setForm({ name:'', price:'', duration:30, benefits:'' }); setModal(true); };
  const openEdit = (p) => { setEditData(p); setForm({...p, duration: p.duration_days}); setModal(true); };
  const submit = async (e) => { e.preventDefault(); editData ? await axios.put(`${API_URL}/plans/${editData.id}`, form) : await axios.post(`${API_URL}/plans`, form); setModal(false); fetch(); };
  const del = async (id) => { if(confirm('Delete plan?')) { await axios.delete(`${API_URL}/plans/${id}`); fetch(); } };

  return (
    <div>
      <div className="flex justify-end mb-6"><AddBtn onClick={openAdd} label="ADD MEMBERSHIP PLAN" /></div>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(p => (
          <div key={p.id} className="bg-[#202020] p-6 rounded border-t-4 border-[#ff1f1f] hover:scale-105 transition shadow-xl group relative">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button onClick={() => openEdit(p)} className="text-blue-500"><FaEdit /></button>
              <button onClick={() => del(p.id)} className="text-red-500"><FaTrash /></button>
            </div>
            <h3 className="text-xl font-bold text-white">{p.name}</h3>
            <p className="text-3xl font-extrabold text-[#ff1f1f] my-3">Rp {parseInt(p.price).toLocaleString()}</p>
            <p className="text-xs text-gray-500 font-bold uppercase mb-4 tracking-widest">{p.duration_days} DAYS ACCESS</p>
            <p className="text-sm text-gray-400 border-t border-[#333] pt-4 leading-relaxed">{p.benefits}</p>
          </div>
        ))}
      </div>
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editData ? "Edit Plan" : "New Plan"}>
        <form onSubmit={submit} className="space-y-4">
          <Input label="Plan Name" val={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <Input label="Price (Rp)" type="number" val={form.price} onChange={e => setForm({...form, price: e.target.value})} />
          <Input label="Duration (Days)" type="number" val={form.duration} onChange={e => setForm({...form, duration: e.target.value})} />
          <Input label="Benefits Description" val={form.benefits} onChange={e => setForm({...form, benefits: e.target.value})} />
          <SubmitBtn label="SAVE PLAN" />
        </form>
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

  const fetch = () => axios.get(`${API_URL}/classes`).then(res => setClasses(res.data));
  useEffect(() => { fetch(); }, []);

  const openAdd = () => { setEditData(null); setForm({ name:'', trainer:'', day:'', start:'', end:'' }); setModal(true); };
  const openEdit = (c) => { setEditData(c); setForm({ name: c.class_name, trainer: c.trainer_name, day: c.day_of_week, start: c.start_time, end: c.end_time }); setModal(true); };
  const submit = async (e) => { e.preventDefault(); editData ? await axios.put(`${API_URL}/classes/${editData.id}`, form) : await axios.post(`${API_URL}/classes`, form); setModal(false); fetch(); };
  const del = async (id) => { if(confirm('Delete class?')) { await axios.delete(`${API_URL}/classes/${id}`); fetch(); } };

  return (
    <div>
      <div className="flex justify-end mb-6"><AddBtn onClick={openAdd} label="ADD CLASS" /></div>
      <Table headers={['Class Name', 'Trainer', 'Days', 'Time', 'Actions']}>
        {classes.map(c => (
          <tr key={c.id} className="hover:bg-[#2A2A2A]">
            <td className="p-4 font-bold text-[#ff1f1f]">{c.class_name}</td>
            <td className="p-4 text-white">{c.trainer_name}</td>
            <td className="p-4 text-gray-400">{c.day_of_week}</td>
            <td className="p-4 font-mono text-xs text-gray-500">{c.start_time?.slice(0,5)} - {c.end_time?.slice(0,5)}</td>
            <td className="p-4 flex gap-2"><EditBtn onClick={() => openEdit(c)} /><DelBtn onClick={() => del(c.id)} /></td>
          </tr>
        ))}
      </Table>
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editData ? "Edit Schedule" : "Add Schedule"}>
        <form onSubmit={submit} className="space-y-4">
          <Input label="Class Name" val={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <Input label="Trainer" val={form.trainer} onChange={e => setForm({...form, trainer: e.target.value})} />
          <Input label="Days (e.g. Mon, Wed, Fri)" val={form.day} onChange={e => setForm({...form, day: e.target.value})} />
          <div className="flex gap-4">
            <Input label="Start Time" type="time" val={form.start} onChange={e => setForm({...form, start: e.target.value})} />
            <Input label="End Time" type="time" val={form.end} onChange={e => setForm({...form, end: e.target.value})} />
          </div>
          <SubmitBtn label="SAVE SCHEDULE" />
        </form>
      </Modal>
    </div>
  );
};

// --- COMPONENTS UTILS ---
const AddBtn = ({ onClick, label }) => (
  <button onClick={onClick} className="bg-[#ff1f1f] hover:bg-[#ff6161] text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-red-900/20 flex items-center gap-2 transition-transform hover:-translate-y-0.5">
    <FaPlus /> {label}
  </button>
);
const EditBtn = ({ onClick }) => <button onClick={onClick} className="bg-[#333] text-blue-400 p-2.5 rounded hover:bg-blue-600 hover:text-white transition"><FaEdit /></button>;
const DelBtn = ({ onClick }) => <button onClick={onClick} className="bg-[#333] text-red-400 p-2.5 rounded hover:bg-red-600 hover:text-white transition"><FaTrash /></button>;
const SubmitBtn = ({ label }) => <button className="w-full bg-[#ff1f1f] hover:bg-[#ff6161] text-white py-3.5 rounded-lg font-bold shadow-lg transition tracking-wide">{label}</button>;
const Input = ({ label, val, onChange, type = "text", disabled = false }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs text-gray-500 uppercase font-bold tracking-wider">{label}</label>
    <input type={type} value={val || ''} onChange={onChange} disabled={disabled} className="bg-[#2A2A2A] text-white p-3.5 rounded border border-[#444] focus:border-[#ff1f1f] focus:ring-1 focus:ring-[#ff1f1f] focus:outline-none transition-all disabled:opacity-50" />
  </div>
);
const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded text-[10px] font-extrabold uppercase tracking-widest ${status === 'active' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-red-900/30 text-red-400 border border-red-800'}`}>{status}</span>
);

export default AdminDashboard;