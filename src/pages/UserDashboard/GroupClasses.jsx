import { Users, Clock, Calendar, Search } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const categories = ["All", "Cardio", "Strength", "Dance", "Mind & Body"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function GroupClasses() {
  const [classes, setClasses] = useState([]);
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Confirm modal for join/leave
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    classAction: null,
    classData: null,
  });

  // Error modal
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    message: "",
  });

  const token = localStorage.getItem("token");

  // FETCH ALL CLASSES
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/classes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const mapped = res.data.map((cls) => ({
          id: cls.id,
          name: cls.class_name,
          instructor: cls.trainer_name,
          time: `${cls.start_time} - ${cls.end_time}`,
          day: cls.day_of_week,
          spots: cls.spots,
          totalSpots: cls.total_spots,
          difficulty: cls.difficulty,
          category: cls.categories,
        }));

        setClasses(mapped);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchClasses();
  }, [token]);

  // FETCH JOINED CLASSES
  useEffect(() => {
    const fetchJoined = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/classes/joined-classes",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const joinedIds = res.data.map((c) => c.class_id);
        setJoinedClasses(joinedIds);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchJoined();
  }, [token]);

  // CONFIRM ACTION HANDLER
  const handleConfirmAction = async () => {
    const { classAction, classData } = confirmModal;
    if (!classAction || !classData) return;

    try {
      if (classAction === "join") {
        const res = await axios.patch(
          `http://localhost:3000/api/admin/classes/${classData.id}/join`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setJoinedClasses((prev) => [...prev, classData.id]);
        setClasses((prev) =>
          prev.map((c) =>
            c.id === classData.id ? { ...c, spots: c.spots + 1 } : c
          )
        );
      } else {
        await axios.patch(
          `http://localhost:3000/api/admin/classes/${classData.id}/leave`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setJoinedClasses((prev) => prev.filter((id) => id !== classData.id));
        setClasses((prev) =>
          prev.map((c) =>
            c.id === classData.id ? { ...c, spots: c.spots - 1 } : c
          )
        );
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Something went wrong.";

      setErrorModal({
        isOpen: true,
        message: errorMessage,
      });
    }

    setConfirmModal({ isOpen: false, classAction: null, classData: null });
  };

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || cls.category === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === "All" || cls.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "Cardio":
        return { background: "#ff1f1f20", text: "#ff1f1f" };
      case "Strength":
        return { background: "#1f9dff20", text: "#1f9dff" };
      case "Dance":
        return { background: "#ff9d1f20", text: "#ff9d1f" };
      case "Mind & Body":
        return { background: "#1fff9d20", text: "#1fff9d" };
      default:
        return { background: "#1a1a1a", text: "#9CA3AF" };
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ color: "white", fontSize: "2rem", marginBottom: 10 }}>
        Group Classes
      </h2>

      {/* SEARCH + FILTERS */}
      <div
        className="mb-8 p-4 rounded-lg"
        style={{ backgroundColor: "#1e1e1e" }}
      >
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by class name or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg"
            style={{
              backgroundColor: "#252525",
              color: "white",
            }}
          />
          <Search
            size={18}
            style={{
              position: "absolute",
              top: "50%",
              left: 10,
              transform: "translateY(-50%)",
              color: "#9CA3AF",
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label style={{ color: "white" }}>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 rounded-lg"
              style={{ backgroundColor: "#252525", color: "white" }}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ color: "white" }}>Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-3 rounded-lg"
              style={{ backgroundColor: "#252525", color: "white" }}
            >
              {difficulties.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CLASS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => {
          const joined = joinedClasses.includes(cls.id);
          const color = getCategoryColor(cls.category);

          return (
            <div
              key={cls.id}
              className="rounded-lg p-4 shadow-lg"
              style={{ backgroundColor: "#252525" }}
            >
              <h3 style={{ color: "white", fontSize: "1.4rem" }}>{cls.name}</h3>
              <p style={{ color: "#9CA3AF" }}>with {cls.instructor}</p>

              <div
                style={{ marginTop: 12, color: "#9CA3AF" }}
                className="space-y-2"
              >
                <div className="flex gap-2">
                  <Clock size={16} />
                  {cls.time}
                </div>

                <div className="flex gap-2">
                  <Calendar size={16} />
                  {cls.day}
                </div>

                <div className="flex gap-2">
                  <Users size={16} />
                  {cls.spots} / {cls.totalSpots}
                </div>

                <div className="flex gap-2 mt-3">
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "8px",
                      backgroundColor: color.background,
                      color: color.text,
                      fontSize: "0.8rem",
                    }}
                  >
                    {cls.category}
                  </span>

                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "8px",
                      backgroundColor: "#1e1e1e",
                      color: "#9CA3AF",
                      fontSize: "0.8rem",
                      border: "1px solid #333",
                    }}
                  >
                    {cls.difficulty}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  setConfirmModal({
                    isOpen: true,
                    classAction: joined ? "leave" : "join",
                    classData: cls,
                  })
                }
                className="w-full mt-4 py-3 rounded-lg"
                style={{
                  backgroundColor: joined ? "#1a1a1a" : "#ff1f1f",
                  color: "white",
                  border: joined ? "1px solid #ff1f1f" : "none",
                }}
              >
                {joined ? "Leave Class" : "Join Class"}
              </button>
            </div>
          );
        })}
      </div>

      {/* CONFIRMATION MODAL */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#252525] p-6 rounded-lg text-white">
            <h3 className="text-xl font-bold mb-4">
              {confirmModal.classAction === "join"
                ? "Join Class?"
                : "Leave Class?"}
            </h3>

            <p>
              Are you sure you want to{" "}
              <strong>{confirmModal.classAction}</strong> this class?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() =>
                  setConfirmModal({
                    isOpen: false,
                    classAction: null,
                    classData: null,
                  })
                }
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-red-600 rounded-lg"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ERROR MODAL (for class full and other errors) */}
      {errorModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            className="p-6 rounded-xl text-white"
            style={{
              backgroundColor: "#252525",
              width: "420px", // ← MUCH WIDER POPUP
              maxWidth: "90%",
            }}
          >
            <h3 className="text-2xl font-bold mb-3 text-white">Error</h3>

            <p className="text-white text-lg leading-relaxed">
              {errorModal.message}
            </p>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setErrorModal({ isOpen: false, message: "" })}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
