import Footer from "../../component/homepage/footer";
import Header from "../../component/homepage/header";
import GymImage from "../../assets/ruanganGym.webp";
import rogerSumateraMeme from "../../assets/rogerSumateraMeme.webp";
import blackSuperman from "../../assets/blackSuperman.webp";
import strongThumb from "../../assets/strongthumb.webp";
import AchmadCaesar from "../../assets/AchmadCaesarRamadhan.webp";
import MHDDepa from "../../assets/MHDDepa.webp";
import MHDHafiz from "../../assets/MHDHafiz.webp";
import Zahran from "../../assets/stelle.webp";

export default function AboutUs() {
  return (
    <>
      <Header />
      <div
        className="max-w-7xl mx-auto w-full rounded-lg overflow-hidden mt-4"
        style={{
          backgroundImage: `url(${GymImage})`,
          backgroundSize: "cover",
          boxShadow: "0px 30px 45.9px 15px rgba(255, 43, 43, 0.25)",
        }}
      >
        <div className="bg-black/40 w-full h-48 md:h-64 lg:h-96 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold">
            About Us
          </h1>
        </div>
      </div>
      <div className="w-full bg-[#ff1f1f] mt-20 text-white flex flex-col md:flex-row">
        {/* IMAGE */}
        <div
          className="bg-[#444444] md:w-[40%] w-full h-auto md:h-auto m-0 md:m-8"
          style={{
            backgroundImage: `url(${rogerSumateraMeme})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        ></div>

        {/* TEXT SECTION */}
        <div className="p-6 md:p-8 md:w-[60%] w-full">
          <h2 className="font-bold text-[26px] md:text-[30px]">
            Know Our Story
          </h2>

          <h3 className="mt-5 text-[16px] md:text-[20px] leading-relaxed">
            Roger Sumatera Gym was inspired by the iconic
            <strong> Roger Sumatera meme</strong> — a calm, powerful werewolf
            beneath a tree. More than a joke, it symbolizes
            <strong> strength</strong>, <strong>discipline</strong>, and
            <strong> composure</strong>.
            <br />
            <br />
            Our leader saw that meaning and created a gym that carries the same
            spirit — a place where anyone can build their own version of
            <strong> strength</strong>, physically and mentally. A space to
            <strong> train hard</strong>, stay grounded, and grow at their own
            pace.
            <br />
            <br />
            Roger Sumatera Gym stands for being
            <strong> strong yet calm</strong>,{" "}
            <strong>focused yet relaxed</strong>, and committed to{" "}
            <strong>becoming better every day</strong>.
          </h3>
        </div>
      </div>

      <div className="text-white text-center mt-15">
        <q className="text-[30px] font-bold">
          Over 100+ Reach Their Dream Body Every Year
        </q>
        <h3 className="text-[20px] italic">
          With our help, you can do it too!
        </h3>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-16 md:gap-24">
        {/* === VISION SECTION === */}
        {/* Layout: Image Left, Text Right on Desktop */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Image Container */}
          <div
            className="w-full md:w-1/2 h-64 md:h-96 rounded-2xl shadow-xl shadow-red-900/20"
            style={{
              backgroundImage: `url(${blackSuperman})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Text Container */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-[#ff1f1f] font-extrabold tracking-widest uppercase text-sm md:text-base">
              The Goal
            </h2>
            <h3 className="text-3xl md:text-5xl text-white font-bold leading-tight">
              Our Vision
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed md:max-w-xl">
              To become the leading fitness community in Sumatra that represents
              true balanced strength —{" "}
              <span className="text-white font-semibold">
                powerful in body, calm in mind
              </span>{" "}
              — inspiring people to grow, stay disciplined, and become the
              strongest version of themselves.
            </p>
          </div>
        </div>

        {/* === MISSION SECTION === */}
        {/* Layout: Image Right, Text Left on Desktop. 
      Uses 'md:flex-row-reverse' so on mobile the Image is still on top! */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-16">
          {/* Image Container */}
          <div
            className="w-full md:w-1/2 h-64 md:h-96 rounded-2xl shadow-xl shadow-red-900/20"
            style={{
              backgroundImage: `url(${strongThumb})`,
              backgroundSize: "cover",
              backgroundPosition: "center", // Changed to center for better focus
            }}
          ></div>

          {/* Text Container */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-right items-center md:items-end">
            <h2 className="text-[#ff1f1f] font-extrabold tracking-widest uppercase text-sm md:text-base">
              The Path
            </h2>
            <h3 className="text-3xl md:text-5xl text-white font-bold leading-tight">
              Our Mission
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed md:max-w-xl">
              To build a supportive ecosystem where discipline meets passion. We
              are dedicated to providing the knowledge, environment, and
              motivation needed to forge{" "}
              <span className="text-white font-semibold">
                unbreakable character
              </span>{" "}
              and physical resilience.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-50">
        <h2 className="font-bold text-white text-2xl md:text-[30px] text-center mt-12">
          Know Our Founder
        </h2>

        <div
          className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-5 
      gap-6       /* Reduced gap for mobile */
      lg:gap-10   /* Original gap for desktop */
      p-4         /* Reduced padding for mobile */
      lg:p-10     /* Original padding for desktop */
      mt-8 
      justify-items-center
    "
        >
          {/* Founder 1 */}
          <div>
            <div
              className="bg-[#ff1f1f] w-40 h-56 md:w-48 md:h-70 rounded-lg mb-5 justify-self-center bg-no-repeat"
              style={{
                backgroundImage: `url(${AchmadCaesar})`,
                backgroundSize: "cover", // Changed to cover for better responsiveness, or use "100%"
                backgroundPosition: "center top", // Adjusted for safety
              }}
            ></div>
            <p className="text-white text-lg md:text-[20px] font-bold text-center">
              Achmad Caesar Ramadhan
            </p>
            <p className="text-white text-sm md:text-base text-center">
              Front-End Dev & Founder
            </p>
          </div>

          {/* Founder 2 — Translated ONLY on Desktop (lg) */}
          <div className="lg:translate-y-20">
            <div
              className="bg-[rgb(255,31,31)] w-40 h-56 md:w-48 md:h-70 rounded-lg mb-5 justify-self-center bg-no-repeat"
              style={{
                backgroundImage: `url(${MHDHafiz})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <p className="text-white text-lg md:text-[20px] font-bold text-center">
              MHD. Hafiz
            </p>
            <p className="text-white text-sm md:text-base text-center">
              Back-End Dev & CFO
            </p>
          </div>

          {/* Founder 3 */}
          <div>
            <div
              className="bg-[#ff1f1f] w-40 h-56 md:w-48 md:h-70 rounded-lg mb-5 justify-self-center bg-no-repeat"
              style={{
                backgroundImage: `url(${Zahran})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <p className="text-white text-lg md:text-[20px] font-bold text-center">
              Ahmad Zahran Syauqi
            </p>
            <p className="text-white text-sm md:text-base text-center">
              Database Dev & Founder
            </p>
          </div>

          {/* Founder 4 — Translated ONLY on Desktop (lg) */}
          <div className="lg:translate-y-20">
            <div className="bg-[#ff1f1f] w-40 h-56 md:w-48 md:h-70 rounded-lg mb-5 justify-self-center"></div>
            <p className="text-white text-lg md:text-[20px] font-bold text-center">
              Muaz Alfattah Fadhani
            </p>
            <p className="text-white text-sm md:text-base text-center">
              Front-End Dev & CTO
            </p>
          </div>

          {/* Founder 5 */}
          <div>
            <div
              className="bg-[#ff1f1f] w-40 h-56 md:w-48 md:h-70 rounded-lg mb-5 justify-self-center bg-no-repeat"
              style={{
                backgroundImage: `url(${MHDDepa})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <p className="text-white text-lg md:text-[20px] font-bold text-center">
              Muhammad Aryadefa
            </p>
            <p className="text-white text-sm md:text-base text-center">
              Back-End Dev & Founder
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
