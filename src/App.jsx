import Dashboard from "./pages/UserDashboard/Dashboard.jsx";
import Home from "./pages/Homepage/Homepage.jsx";
import "./App.css";
import Login from "./pages/Homepage/login.jsx";
import Register from "./pages/Homepage/register.jsx";
import TermsCondition from "./pages/Homepage/Term&Condition.jsx";
import AboutUs from "./pages/Homepage/Aboutus.jsx";
import { Route, Routes, Outlet } from "react-router-dom";
import Membership from "./pages/Homepage/membership.jsx";
import Class from "./pages/Homepage/class.jsx";
import ForgotPassword from "./pages/Homepage/forgotPassword.jsx";
import AdminDashboard from "./pages/AdminDashboard/Dashboard.jsx";
import BodyAssessment from "./pages/UserDashboard/BodyAssessment.jsx";
import Profile from "./pages/UserDashboard/Profile.jsx";
import Sidebar from "./pages/UserDashboard/Sidebar.jsx";
import NutritionGuidance from "./pages/UserDashboard/NutritionGuidance.jsx";
import GroupClasses from "./pages/UserDashboard/GroupClasses.jsx";
import Settings from "./pages/UserDashboard/Setting.jsx";
import PersonalTraining from "./pages/UserDashboard/PersonalTraining.jsx";

function UserLayout() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/termscondition" element={<TermsCondition />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/class" element={<Class />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/user" element={<UserLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="bodyassessment" element={<BodyAssessment />} />
        <Route path="nutritionguidance" element={<NutritionGuidance />} />
        <Route path="groupclasses" element={<GroupClasses />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
