import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";

export default function Billing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [buying, setBuying] = useState(false);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // --- Fetch & Normalize Plans ---
  const fetchMembershipPlans = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/admin/plans", {
        headers,
      });

      // FIX: Normalize benefits (string → array)
      const normalized = res.data.map((plan) => ({
        ...plan,
        benefits: Array.isArray(plan.benefits)
          ? plan.benefits
          : typeof plan.benefits === "string"
          ? plan.benefits.split(",").map((b) => b.trim())
          : [],
      }));

      setPlans(normalized);
    } catch (err) {
      console.error("Failed to load plans:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  // --- Buy Membership ---
  const handleBuy = async () => {
    if (!selectedPlan) return;

    setBuying(true);
    try {
      await axios.post(
        "http://localhost:3000/api/memberships/buy",
        { plan_id: selectedPlan.id },
        { headers }
      );

      alert("Membership purchased successfully!");
    } catch (err) {
      console.error("Purchase failed:", err.response?.data || err);
      alert("Failed to purchase membership.");
    } finally {
      setBuying(false);
    }
  };

  useEffect(() => {
    fetchMembershipPlans();
  }, []);

  if (!token) return <p className="text-white">You are not logged in.</p>;

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-6 lg:p-8">
      <h2 className="text-white font-bold text-2xl md:text-3xl mb-4 md:mb-6">
        Billing
      </h2>

      <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
        Choose from the available membership plans below.
      </p>

      {loading ? (
        <p className="text-[#9CA3AF]">Loading membership plans...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="p-4 md:p-6 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => setSelectedPlan(plan)}
              style={{
                backgroundColor:
                  selectedPlan?.id === plan.id ? "#1f262a" : "#1a1a1a",
                border:
                  selectedPlan?.id === plan.id
                    ? "2px solid #ff1f1f"
                    : "2px solid transparent",
              }}
            >
              <h3 className="text-white text-lg md:text-xl font-semibold">
                {plan.name}
              </h3>

              <p className="text-[#ff1f1f] mt-2 font-bold text-lg md:text-xl">
                Rp {parseInt(plan.price).toLocaleString("id-ID")}
              </p>

              <p className="text-[#9CA3AF] mt-2 text-sm md:text-base">
                Duration: {plan.duration_days} days
              </p>

              <h4 className="mt-4 mb-2 text-white text-base md:text-lg">
                Benefits:
              </h4>

              <ul className="list-disc pl-5 space-y-1">
                {plan.benefits.map((b, i) => (
                  <li key={i} className="text-[#9CA3AF] text-sm md:text-base">
                    {b}
                  </li>
                ))}
              </ul>

              {selectedPlan?.id === plan.id && (
                <div className="flex items-center gap-2 mt-3">
                  <CheckCircle2 size={18} className="text-green-400" />
                  <span className="text-green-400 text-sm">Selected</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* BUY BUTTON */}
      <div className="mt-8 md:mt-10 flex justify-center">
        <button
          disabled={!selectedPlan || buying}
          onClick={handleBuy}
          className={`px-6 py-3 rounded-lg font-bold text-white text-sm md:text-base transition-colors ${
            !selectedPlan || buying
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-[#ff1f1f] hover:bg-red-600"
          }`}
        >
          {buying
            ? "Processing..."
            : selectedPlan
            ? "Buy Membership"
            : "Select a Plan"}
        </button>
      </div>
    </div>
  );
}