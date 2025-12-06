import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { useState } from 'react';

export default function BodyAssessment() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('imperial');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = (weight, height, unit) => {
    if (unit === 'imperial') {
      return (weight * 703) / (height * height);
    } else {
      return weight / ((height / 100) * (height / 100));
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#3b82f6' };
    if (bmi < 25) return { category: 'Normal', color: '#10b981' };
    if (bmi < 30) return { category: 'Overweight', color: '#f59e0b' };
    return { category: 'Obese', color: '#ef4444' };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (weightNum && heightNum) {
      const bmiValue = parseFloat(calculateBMI(weightNum, heightNum, unit).toFixed(1));
      setBmi({ value: bmiValue, weight: weightNum, height: heightNum });
      setWeight('');
      setHeight('');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h2 className="text-white text-2xl md:text-3xl font-bold">Body Assessment</h2>
        <p className="text-[#9CA3AF] text-sm md:text-base">Track your BMI and monitor your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Current BMI Card */}
        <div className="p-4 md:p-6 rounded-lg bg-[#252525]">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={24} className="text-[#ff1f1f]" />
            <h3 className="text-white text-lg md:text-xl">Current BMI</h3>
          </div>

          {bmi ? (
            <>
              <h2 className="text-white text-4xl md:text-5xl font-bold mb-2">
                {bmi.value}
              </h2>

              <div
                className="inline-block px-3 md:px-4 py-2 rounded-lg mb-4"
                style={{ backgroundColor: getBMICategory(bmi.value).color + '20' }}
              >
                <span style={{ color: getBMICategory(bmi.value).color }}>
                  {getBMICategory(bmi.value).category}
                </span>
              </div>

              <div className="text-[#9CA3AF] text-sm md:text-base">
                <p>
                  Weight: {bmi.weight} {unit === 'imperial' ? 'lbs' : 'kg'}
                </p>
                <p>
                  Height: {bmi.height} {unit === 'imperial' ? 'inches' : 'cm'}
                </p>
              </div>
            </>
          ) : (
            <p className="text-[#9CA3AF] text-sm md:text-base">No BMI calculated yet. Add your first entry!</p>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 md:p-6 rounded-lg bg-[#252525]">
          <h3 className="mb-4 text-white text-lg md:text-xl">Add New Entry</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-[#9CA3AF] text-sm md:text-base">Unit System</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="imperial"
                    checked={unit === 'imperial'}
                    onChange={(e) => setUnit(e.target.value)}
                    className="accent-[#ff1f1f]"
                  />
                  <span className="text-white text-sm md:text-base">Imperial (lbs/inches)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="metric"
                    checked={unit === 'metric'}
                    onChange={(e) => setUnit(e.target.value)}
                    className="accent-[#ff1f1f]"
                  />
                  <span className="text-white text-sm md:text-base">Metric (kg/cm)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[#9CA3AF] text-sm md:text-base">
                Weight ({unit === 'imperial' ? 'pounds' : 'kilograms'})
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-white border border-[#252525] focus:border-[#ff1f1f] focus:outline-none text-sm md:text-base"
                placeholder={unit === 'imperial' ? 'e.g., 165' : 'e.g., 75'}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-[#9CA3AF] text-sm md:text-base">
                Height ({unit === 'imperial' ? 'inches' : 'centimeters'})
              </label>
              <input
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#1a1a1a] text-white border border-[#252525] focus:border-[#ff1f1f] focus:outline-none text-sm md:text-base"
                placeholder={unit === 'imperial' ? 'e.g., 68' : 'e.g., 173'}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#ff1f1f] text-white hover:opacity-90 transition-opacity text-sm md:text-base font-semibold"
            >
              Calculate BMI
            </button>
          </form>
        </div>
      </div>

      {/* BMI Categories Reference */}
      <div className="p-4 md:p-6 rounded-lg bg-[#252525] mb-6 md:mb-8">
        <h3 className="mb-4 text-white text-lg md:text-xl">BMI Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 md:p-4 rounded-lg bg-blue-500/20">
            <p className="text-blue-400 text-sm md:text-base">&lt; 18.5</p>
            <p className="text-white text-sm md:text-base">Underweight</p>
          </div>
          <div className="p-3 md:p-4 rounded-lg bg-green-500/20">
            <p className="text-green-400 text-sm md:text-base">18.5 - 24.9</p>
            <p className="text-white text-sm md:text-base">Normal</p>
          </div>
          <div className="p-3 md:p-4 rounded-lg bg-yellow-500/20">
            <p className="text-yellow-400 text-sm md:text-base">25 - 29.9</p>
            <p className="text-white text-sm md:text-base">Overweight</p>
          </div>
          <div className="p-3 md:p-4 rounded-lg bg-red-500/20">
            <p className="text-red-400 text-sm md:text-base">&ge; 30</p>
            <p className="text-white text-sm md:text-base">Obese</p>
          </div>
        </div>
      </div>
    </div>
  );
}