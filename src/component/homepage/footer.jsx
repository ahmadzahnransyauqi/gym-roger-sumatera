import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoText from "../../assets/logotext.png";

export default function Footer() {
  return (
    <footer className="bg-[#444444] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3 max-w-[350px]">
            <img src={logoText} alt="Gym Logo" className="w-28 md:w-32 mb-2" />
            <p className="text-[15px] md:text-[16px] leading-6">
              Train with us and upgrade your body, stamina, and lifestyle. The
              best facility with professional trainers.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] font-bold mb-1">Quick Links</h3>
            <Link to="/" className="hover:text-[#ff6161]">Home</Link>
            <Link to="/class" className="hover:text-[#ff6161]">Class</Link>
            <Link to="/membership" className="hover:text-[#ff6161]">Membership</Link>
            <Link to="/aboutus" className="hover:text-[#ff6161]">About Us</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] font-bold mb-1">Contact</h3>
            <p>+62 812-3456-7890</p>
            <p>Jl. USU FASILKOM-TI</p>
            <p>Medan, Indonesia</p>
          </div>

          <div>
            <h3 className="text-[18px] font-bold mb-3">Follow Us</h3>
            <div className="flex gap-4 flex-wrap">
              <a className="bg-[#ff1f1f] p-3 rounded-full hover:bg-[#ff6161] transition">
                <FaInstagram size={20} />
              </a>
              <a className="bg-[#ff1f1f] p-3 rounded-full hover:bg-[#ff6161] transition">
                <FaFacebook size={20} />
              </a>
              <a className="bg-[#ff1f1f] p-3 rounded-full hover:bg-[#ff6161] transition">
                <FaYoutube size={20} />
              </a>
              <a className="bg-[#ff1f1f] p-3 rounded-full hover:bg-[#ff6161] transition">
                <FaTiktok size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-[13px] text-gray-300 mt-8">
          © {new Date().getFullYear()} Roger Sumatera Gym. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}