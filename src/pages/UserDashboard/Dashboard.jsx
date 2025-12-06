import { useState, useEffect } from "react";
import { Calendar, Users, CheckCircle2 } from "lucide-react";
import axios from "axios";

export default function Dashboard() {
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);

  const [membership, setMembership] = useState(null);
  const [loadingMembership, setLoadingMembership] = useState(true);

  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [loadingAttendance, setLoadingAttendance] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username || "User";

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // --- Fetch joined classes ---
  const fetchJoinedClasses = async () => {
    if (!token) return;
    setLoadingClasses(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/classes/joined-classes`,
        { headers }
      );
      setJoinedClasses(res.data || []);
    } catch (err) {
      console.error("Failed to fetch classes:", err.response?.data || err);
      setJoinedClasses([]);
    } finally {
      setLoadingClasses(false);
    }
  };

  // --- Fetch user membership ---
  const fetchMembership = async () => {
    if (!token) return;
    setLoadingMembership(true);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/memberships/me`, {
        headers,
      });
      setMembership(res.data?.membership || null);
    } catch (err) {
      console.log("Membership fetch failed:", err.response?.data || err);
      setMembership(null);
    } finally {
      setLoadingMembership(false);
    }
  };

  // --- Fetch attendance from the view ---
  const fetchAttendance = async () => {
    if (!token || !user?.id) return;
    setLoadingAttendance(true);

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendance/success?user_id=${user.id}`,
        { headers }
      );
      // Expect the backend to return JSON array like: [{ id, scanned_at, notes }]
      setAttendanceHistory(res.data || []);
    } catch (err) {
      console.error("Failed to fetch attendance:", err.response?.data || err);
      setAttendanceHistory([]);
    } finally {
      setLoadingAttendance(false);
    }
  };

  useEffect(() => {
    fetchJoinedClasses();
    fetchMembership();
    fetchAttendance();
  }, [token]);

  if (!token) return <p className="text-white">You are not logged in.</p>;

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <h2 className="text-white font-bold text-2xl md:text-3xl mb-5">
        Welcome back, {username}! 👋
      </h2>

      {/* ROW: MEMBERSHIP + CLASSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* MEMBERSHIP CARD */}
        <div className="p-4 md:p-6 rounded-lg bg-[#252525]">
          <div className="flex items-center gap-2 mb-4">
            <Users size={24} className="text-[#ff1f1f]" />
            <h3 className="text-white text-lg md:text-xl">Membership Details</h3>
          </div>
          {loadingMembership ? (
            <p className="text-[#9CA3AF]">Loading membership...</p>
          ) : !membership ? (
            <p className="text-[#9CA3AF]">
              You have not selected a membership yet.
            </p>
          ) : (
            <div className="p-4 md:p-5 rounded-lg bg-[#1a1a1a]">
              <h3 className="text-white text-lg md:text-xl">
                {membership.name || "No Plan"}
              </h3>
              <p className="text-[#9CA3AF] mt-1">
                Duration: {membership.duration_days || 0} days
              </p>
              <p className="text-[#ff1f1f] font-bold mt-1">
                Rp {Number(membership.price || 0).toLocaleString("id-ID")}
              </p>
              <p className="text-[#9CA3AF] mt-1">
                Start:{" "}
                {membership.start_date
                  ? new Date(membership.start_date).toLocaleDateString("id-ID")
                  : "-"}
              </p>
              <p className="text-[#9CA3AF]">
                End:{" "}
                {membership.end_date
                  ? new Date(membership.end_date).toLocaleDateString("id-ID")
                  : "-"}
              </p>
              <p
                className={`font-bold mt-1 ${
                  membership.status === "active" ? "text-green-400" : "text-red-400"
                }`}
              >
                Status: {membership.status || "-"}
              </p>
              <h4 className="mt-4 mb-2 text-white">Benefits:</h4>
              <ul className="list-disc pl-6 space-y-1">
                {(membership.benefits || []).map((b, i) => (
                  <li key={i} className="text-[#9CA3AF]">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* MY CLASSES */}
        <div className="p-4 md:p-6 rounded-lg bg-[#252525]">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Users size={24} className="text-[#ff1f1f]" />
            <h3 className="text-white text-lg md:text-xl">My Classes</h3>
          </div>
          {loadingClasses ? (
            <p className="text-[#9CA3AF]">Loading classes...</p>
          ) : joinedClasses.length === 0 ? (
            <p className="text-[#9CA3AF]">
              You haven't joined any classes yet.
            </p>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {joinedClasses.map((cls) => {
                const categoriesSafe = Array.isArray(cls.categories)
                  ? cls.categories
                  : cls.categories
                  ? [cls.categories]
                  : [];
                return (
                  <div
                    key={cls.class_schedule_id}
                    className="p-4 md:p-6 rounded-lg bg-[#1a1a1a]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white text-lg md:text-xl">
                        {cls.class_name || "Unnamed Class"}
                      </h3>
                      <CheckCircle2 size={20} className="text-green-400" />
                    </div>
                    <p className="text-[#9CA3AF]">
                      Trainer: {cls.trainer_name || "-"} | Difficulty:{" "}
                      {cls.difficulty || "-"}
                    </p>
                    <p className="text-[#9CA3AF]">
                      Days: {cls.day_of_week || "-"} | Time:{" "}
                      {cls.start_time || "-"} - {cls.end_time || "-"}
                    </p>
                    <div className="flex flex-wrap gap-2 my-2">
                      {categoriesSafe.map((cat, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs rounded-full bg-[#ff1f1f] text-white"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ATTENDANCE */}
      <div className="p-4 md:p-6 rounded-lg bg-[#252525] mt-6 md:mt-8">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <Calendar size={24} className="text-[#ff1f1f]" />
          <h3 className="text-white text-lg md:text-xl">Attendance History</h3>
        </div>

        {loadingAttendance ? (
          <p className="text-[#9CA3AF]">Loading attendance...</p>
        ) : attendanceHistory.length === 0 ? (
          <p className="text-[#9CA3AF]">No attendance records found.</p>
        ) : (
          <div className="space-y-3">
            {attendanceHistory.map((record) => (
              <div
                key={record.id}
                className="p-3 md:p-4 rounded-lg flex flex-col md:flex-row justify-between bg-[#1a1a1a]"
              >
                <div className="flex-1 mb-2 md:mb-0">
                  <span className="px-3 py-1 text-xs rounded bg-[#252525] text-[#ff1f1f]">
                    Check-in
                  </span>
                  <p className="text-white mt-1">
                    {record.notes || "Attendance recorded"}
                  </p>
                  <p className="text-[#9CA3AF]">
                    {new Date(record.scanned_at).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <p className="text-[#9CA3AF] text-sm md:text-base">
                  {new Date(record.scanned_at).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
