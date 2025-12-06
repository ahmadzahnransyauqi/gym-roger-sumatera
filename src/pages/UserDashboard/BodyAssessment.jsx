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
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#121212' }}>
      {/* Header */}
      <div className="mb-6">
        <h2 style={{ color: '#ffffff' }}>Body Assessment</h2>
        <p style={{ color: '#9CA3AF' }}>Track your BMI and monitor your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Current BMI Card */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: '#252525' }}>
          <div className="flex items-center gap-2 mb-4">
            <Activity size={24} style={{ color: '#ff1f1f' }} />
            <h3 style={{ color: '#ffffff' }}>Current BMI</h3>
          </div>

          {bmi ? (
            <>
              <h2 style={{ color: '#ffffff', fontSize: '3rem', marginBottom: '8px' }}>
                {bmi.value}
              </h2>

              <div
                className="inline-block px-4 py-2 rounded-lg mb-4"
                style={{ backgroundColor: getBMICategory(bmi.value).color + '20' }}
              >
                <span style={{ color: getBMICategory(bmi.value).color }}>
                  {getBMICategory(bmi.value).category}
                </span>
              </div>

              <div style={{ color: '#9CA3AF' }}>
                <p>
                  Weight: {bmi.weight} {unit === 'imperial' ? 'lbs' : 'kg'}
                </p>
                <p>
                  Height: {bmi.height} {unit === 'imperial' ? 'inches' : 'cm'}
                </p>
              </div>
            </>
          ) : (
            <p style={{ color: '#9CA3AF' }}>No BMI calculated yet. Add your first entry!</p>
          )}
        </div>

        {/* Input Form */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: '#252525' }}>
          <h3 className="mb-4" style={{ color: '#ffffff' }}>Add New Entry</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2" style={{ color: '#9CA3AF' }}>Unit System</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="imperial"
                    checked={unit === 'imperial'}
                    onChange={(e) => setUnit(e.target.value)}
                    style={{ accentColor: '#ff1f1f' }}
                  />
                  <span style={{ color: '#ffffff' }}>Imperial (lbs/inches)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="metric"
                    checked={unit === 'metric'}
                    onChange={(e) => setUnit(e.target.value)}
                    style={{ accentColor: '#ff1f1f' }}
                  />
                  <span style={{ color: '#ffffff' }}>Metric (kg/cm)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block mb-2" style={{ color: '#9CA3AF' }}>
                Weight ({unit === 'imperial' ? 'pounds' : 'kilograms'})
              </label>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  border: '1px solid #252525',
                }}
                placeholder={unit === 'imperial' ? 'e.g., 165' : 'e.g., 75'}
                required
              />
            </div>

            <div>
              <label className="block mb-2" style={{ color: '#9CA3AF' }}>
                Height ({unit === 'imperial' ? 'inches' : 'centimeters'})
              </label>
              <input
                type="number"
                step="0.1"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  border: '1px solid #252525',
                }}
                placeholder={unit === 'imperial' ? 'e.g., 68' : 'e.g., 173'}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#ff1f1f', color: '#ffffff' }}
            >
              Calculate BMI
            </button>
          </form>
        </div>
      </div>

      {/* BMI Categories Reference */}
      <div className="p-6 rounded-lg mb-8" style={{ backgroundColor: '#252525' }}>
        <h3 className="mb-4" style={{ color: '#ffffff' }}>BMI Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#3b82f620' }}>
            <p style={{ color: '#3b82f6' }}>{'<'} 18.5</p>
            <p style={{ color: '#ffffff' }}>Underweight</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#10b98120' }}>
            <p style={{ color: '#10b981' }}>18.5 - 24.9</p>
            <p style={{ color: '#ffffff' }}>Normal</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#f59e0b20' }}>
            <p style={{ color: '#f59e0b' }}>25 - 29.9</p>
            <p style={{ color: '#ffffff' }}>Overweight</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: '#ef444420' }}>
            <p style={{ color: '#ef4444' }}>{'≥'} 30</p>
            <p style={{ color: '#ffffff' }}>Obese</p>
          </div>
        </div>
      </div>
    </div>
  );
}
