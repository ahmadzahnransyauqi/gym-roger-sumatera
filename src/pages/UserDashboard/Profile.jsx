import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import { QrCode, UserCircle } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState({
    id: "",
    full_name: "",
    username: "",
    qr_token: "",
  });
  const [showQRCode, setShowQRCode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 1. Ambil data user yang tersimpan saat Login
        // Asumsi: Saat login kamu simpan: localStorage.setItem("user", JSON.stringify(userData));
        const storedUser = localStorage.getItem("user");
        
        if (!storedUser) {
          console.warn("User belum login!");
          setLoading(false);
          return; // Stop di sini, jangan panggil API
        }

        const userData = JSON.parse(storedUser);
        const userId = userData.id; // Pastikan key-nya 'id' atau 'user_id'

        // Set data profil awal dari local storage agar tidak perlu hardcode "Ahmad"
        setProfile((prev) => ({
          ...prev,
          id: userId,
          full_name: userData.full_name || userData.username || "User",
          username: userData.username,
        }));

        // 2. Generate/Ambil QR token dari backend menggunakan ID asli
        const res = await axios.post("http://localhost:3000/api/qr/generate", {
          user_id: userId,
        });

        if (res.data && res.data.data) {
          setProfile((prev) => ({ 
            ...prev, 
            qr_token: res.data.data.qr_token 
          }));
        }

      } catch (err) {
        console.error("Gagal mengambil profile atau generate QR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div style={{ padding: "2rem", color: "white" }}>Loading...</div>;

  // Jika tidak ada ID (berarti belum login), tampilkan pesan
  if (!profile.id) {
    return (
      <div style={{ padding: "2rem", color: "white", backgroundColor: "#252525", minHeight: "100vh" }}>
        <h2>Anda belum login.</h2>
        <p>Silakan login terlebih dahulu untuk melihat QR Code.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#252525", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <UserCircle size={48} style={{ color: "#ff1f1f" }} />
        <div>
          <h2 style={{ color: "#fff", margin: 0 }}>{profile.full_name}</h2>
          <p style={{ color: "#9CA3AF", margin: 0 }}>@{profile.username}</p>
        </div>
      </div>

      {/* QR Button */}
      <button
        onClick={() => setShowQRCode(!showQRCode)}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#ff1f1f",
          color: "#fff",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        <QrCode size={20} />
        {showQRCode ? "Tutup QR Code" : "Tampilkan QR Member"}
      </button>

      {/* QR Code Area */}
      {showQRCode && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "2rem",
            backgroundColor: "#fff",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "300px"
          }}
        >
          {/* Tampilkan QR dari Token, bukan ID mentah */}
          <QRCodeSVG value={profile.qr_token || profile.id} size={200} level="H" />
          
          <p className="text-center mt-4" style={{ color: "#1a1a1a", fontWeight: "bold", marginTop: "1rem", wordBreak: "break-all", fontSize: "0.9rem" }}>
            ID: {profile.id}
          </p>

          <button
            onClick={() => {
                navigator.clipboard.writeText(profile.qr_token || profile.id);
                alert("Token berhasil disalin!");
            }}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
              color: "#fff",
              backgroundColor: "#1a1a1a",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Copy QR Token
          </button>
        </div>
      )}
    </div>
  );
}