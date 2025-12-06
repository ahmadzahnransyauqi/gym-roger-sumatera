// components/Popup.jsx
export default function Popup({ visible, message, type = "info", onClose }) {
  if (!visible) return null;

  const colors = {
    info: "#3B82F6",
    success: "#10B981",
    error: "#EF4444",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div
        className="p-6 rounded-lg max-w-sm w-full text-center"
        style={{ backgroundColor: "#1a1a1a"}}
      >
        <p className="mb-4" style={{ color: "#ffffff" }}>{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: "#ff1f1f", color: "#ffffff" }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
