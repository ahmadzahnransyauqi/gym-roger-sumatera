import Footer from "../../component/homepage/footer";
import Header from "../../component/homepage/header";
import DanceIcon from "../../assets/Group.svg";
import CardioIcon from "../../assets/XMLID_8_.svg";
import StrengthIcon from "../../assets/dumbbell-svgrepo-com1.svg";
import MindBodyIcon from "../../assets/brain-8-svgrepo-com 1.svg";
import DanceClass from "../../assets/DanceClass.webp";
import CardioClass from "../../assets/CardioClass.webp";
import StrengthClass from "../../assets/StrengthClass.webp";
import MindBodyClass from "../../assets/MindBodyClass.webp";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../component/homepage/loading";

export default function Class() {
  const [classList, setClassList] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch classes from backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("/api/admin/classes");
        const mapped = res.data.map((cls) => ({
          name: cls.class_name,
          type: cls.categories,
          intensity: cls.difficulty,
        }));
        setClassList(mapped);
        setFilteredClasses(mapped);
      } catch (err) {
        console.error("Failed to fetch classes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const categoryData = [
    { name: "Dance", icon: DanceIcon, image: DanceClass, color: "#FF6666" },
    { name: "Cardio", icon: CardioIcon, image: CardioClass, color: "#7D6EFF" },
    { name: "Strength", icon: StrengthIcon, image: StrengthClass, color: "#4EFF69" },
    { name: "Mind & Body", icon: MindBodyIcon, image: MindBodyClass, color: "#FFF04E" },
  ];

  // Filter classes by search & category
  useEffect(() => {
    let filtered = [...classList];

    if (selectedCategory) {
      filtered = filtered.filter((cls) => cls.type === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((cls) =>
        cls.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredClasses(filtered);
  }, [searchQuery, selectedCategory, classList]);

  if (loading) return <Loading />;

  return (
    <>
      <Header />

      {/* Hero */}
      <div
        className="max-w-7xl mx-auto w-full rounded-lg overflow-hidden mt-3"
        style={{
          backgroundColor: "#1a1a1a",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="text-3xl md:text-5xl lg:text-5xl text-white font-bold">Class</h1>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <h2 className="font-bold text-white text-2xl md:text-3xl text-center mb-6">
          Enjoy Your Favorite Class
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryData.map((cat) => (
            <div
              key={cat.name}
              className={`relative rounded-lg overflow-hidden h-40 md:h-56 flex items-end p-3 cursor-pointer transition-transform duration-200 ${
                selectedCategory === cat.name ? "scale-105 border-2 border-white" : ""
              }`}
              style={{
                backgroundImage: `url(${cat.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)
              }
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <p
                className="relative font-bold text-xl md:text-2xl z-10"
                style={{ color: cat.color }}
              >
                {cat.name}
              </p>
              <img
                src={cat.icon}
                alt={`${cat.name} icon`}
                className="w-10 md:w-14 h-auto ml-auto z-10"
              />
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mt-6 fle justify-center">
          <input
            type="text"
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-lg focus:outline-none flex justify-self-center bg-white text-black"
          />
        </div>
      </div>

      {/* Explore All Classes */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        <h2 className="font-bold text-white text-2xl md:text-3xl text-center mt-8 mb-6">
          Explore All Classes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredClasses.map((cls, index) => {
            const categoryInfo = categoryData.find((c) => c.name === cls.type) || {};
            return (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden h-64 sm:h-72 lg:h-80 flex flex-col justify-end p-4 shadow-2xl transform transition duration-300 hover:scale-[1.02] cursor-pointer"
                style={{ backgroundColor: "#252525" }}
              >
                {/* Category Icon */}
                <div className="absolute top-4 left-4 z-20">
                  {categoryInfo.icon && <img src={categoryInfo.icon} alt={cls.type} className="w-8 md:w-10 h-auto" />}
                </div>

                {/* Intensity Tag */}
                <div className="absolute top-4 right-4 z-20">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider shadow-md"
                    style={{ backgroundColor: categoryInfo.color || "#FFF" }}
                  >
                    {cls.intensity}
                  </span>
                </div>

                {/* Class Name & Type */}
                <div className="relative z-10 w-full flex flex-col gap-1">
                  <p className="text-xl md:text-2xl font-extrabold leading-tight" style={{ color: categoryInfo.color || "#FFF" }}>
                    {cls.name}
                  </p>
                  <p className="text-sm md:text-base text-gray-300 uppercase tracking-wide">{cls.type}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}