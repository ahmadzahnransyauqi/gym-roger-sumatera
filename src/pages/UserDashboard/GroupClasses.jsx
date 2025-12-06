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
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/classes`, {
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
          `${import.meta.env.VITE_API_URL}/api/admin/classes/joined-classes`,
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
          `${import.meta.env.VITE_API_URL}/api/admin/classes/${classData.id}/join`,
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
          `${import.meta.env.VITE_API_URL}/api/admin/classes/${classData.id}/leave`,
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
    <div className="min-h-screen bg-[#121212] p-4 md:p-6 lg:p-8">
      <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 md:mb-6">
        Group Classes
      </h2>

      {/* SEARCH + FILTERS */}
      <div className="mb-6 md:mb-8 p-4 md:p-6 rounded-lg bg-[#1e1e1e]">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by class name or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg bg-[#252525] text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#ff1f1f] text-sm md:text-base"
          />
          <Search
            size={18}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#9CA3AF]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-white text-sm md:text-base mb-2 block">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#252525] text-white focus:outline-none focus:ring-2 focus:ring-[#ff1f1f] text-sm md:text-base"
            >
              {categories.map((cat) => (
                <option key={cat} className="bg-[#252525]">{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-white text-sm md:text-base mb-2 block">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#252525] text-white focus:outline-none focus:ring-2 focus:ring-[#ff1f1f] text-sm md:text-base"
            >
              {difficulties.map((d) => (
                <option key={d} className="bg-[#252525]">{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CLASS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredClasses.map((cls) => {
          const joined = joinedClasses.includes(cls.id);
          const color = getCategoryColor(cls.category);

          return (
            <div
              key={cls.id}
              className="rounded-lg p-4 md:p-6 shadow-lg bg-[#252525] hover:scale-105 transition-transform duration-200"
            >
              <h3 className="text-white text-lg md:text-xl font-semibold">{cls.name}</h3>
              <p className="text-[#9CA3AF] text-sm md:text-base">with {cls.instructor}</p>

              <div className="mt-3 text-[#9CA3AF] space-y-2 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {cls.time}
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {cls.day}
                </div>

                <div className="flex items-center gap-2">
                  <Users size={16} />
                  {cls.spots} / {cls.totalSpots}
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: color.background,
                      color: color.text,
                    }}
                  >
                    {cls.category}
                  </span>

                  <span className="px-2 py-1 rounded-full text-xs bg-[#1e1e1e] text-[#9CA3AF] border border-[#333]">
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
                className="w-full mt-4 py-3 rounded-lg font-semibold transition-colors text-sm md:text-base"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#252525] p-4 md:p-6 rounded-lg text-white w-full max-w-md">
            <h3 className="text-lg md:text-xl font-bold mb-4">
              {confirmModal.classAction === "join"
                ? "Join Class?"
                : "Leave Class?"}
            </h3>

            <p className="text-sm md:text-base mb-6">
              Are you sure you want to{" "}
              <strong>{confirmModal.classAction}</strong> this class?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setConfirmModal({
                    isOpen: false,
                    classAction: null,
                    classData: null,
                  })
                }
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-sm md:text-base"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm md:text-base"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ERROR MODAL (for class full and other errors) */}
      {errorModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-[#252525] p-4 md:p-6 rounded-xl text-white w-full max-w-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Error</h3>

            <p className="text-base md:text-lg leading-relaxed mb-6">
              {errorModal.message}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setErrorModal({ isOpen: false, message: "" })}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors text-sm md:text-base"
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