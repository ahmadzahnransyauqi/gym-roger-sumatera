import { Star, Calendar, Clock } from "lucide-react";
import { useState } from "react";

const trainers = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Strength & Conditioning",
    experience: "8 years",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop",
    available: ["Mon", "Wed", "Fri"],
  },
  {
    id: 2,
    name: "Mike Chen",
    specialty: "Weight Loss & Cardio",
    experience: "6 years",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
    available: ["Tue", "Thu", "Sat"],
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    specialty: "Yoga & Flexibility",
    experience: "10 years",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop",
    available: ["Mon", "Tue", "Thu"],
  },
  {
    id: 4,
    name: "David Kim",
    specialty: "Bodybuilding & Muscle Gain",
    experience: "7 years",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop",
    available: ["Wed", "Fri", "Sat"],
  },
];

export default function PersonalTraining() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  return (
    <div>
      <div className="mb-6">
        <h2 style={{ color: "#ffffff" }}>Personal Training</h2>
        <p style={{ color: "#9CA3AF" }}>
          Find the perfect trainer to help you achieve your fitness goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="p-6 rounded-lg"
            style={{ backgroundColor: "#252525" }}
          >
            <div className="flex gap-4 mb-4">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 style={{ color: "#ffffff" }}>{trainer.name}</h3>
                <p style={{ color: "#9CA3AF" }}>{trainer.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={16} fill="#ff1f1f" stroke="#ff1f1f" />
                  <span style={{ color: "#ffffff" }}>{trainer.rating}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4" style={{ color: "#9CA3AF" }}>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>Experience: {trainer.experience}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Available: {trainer.available.join(", ")}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedTrainer(trainer.id)}
                className="w-full px-6 py-2 rounded-lg transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "#ff1f1f",
                  color: "#ffffff",
                }}
              >
                {selectedTrainer === trainer.id ? "Selected" : "Book Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
