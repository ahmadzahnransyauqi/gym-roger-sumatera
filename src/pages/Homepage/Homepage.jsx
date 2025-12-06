import Header from "../../component/homepage/header.jsx";
import heroImage from "../../assets/pria-hitamberotot-ini.webp";
import PeopleIcon from "../../assets/person-svgrepo-com.svg?react";
import CoachIcon from "../../assets/coach-svgrepo-com.svg?react";
import DanceIcon from "../../assets/Group.svg";
import CardioIcon from "../../assets/XMLID_8_.svg";
import StrengthIcon from "../../assets/dumbbell-svgrepo-com1.svg";
import TestimonialList from "../../component/homepage/testimonial-card.jsx";
import Footer from "../../component/homepage/footer.jsx";
import BodyAssesment from "../../assets/BodyAssesment.webp";
import GroupClasses from "../../assets/GroupClasses.webp";
import NutritionGuidance from "../../assets/NutritionGuidance.webp";
import PersonalTrainer from "../../assets/PersonalTrainer.webp";
import BellyDance from "../../assets/BellyDanceClass.webp";
import Boxing from "../../assets/BoxingClass.webp";
import Piloxing from "../../assets/PiloxingClass.webp";
import Zumba from "../../assets/ZumbaClass.webp";
import { Link } from "react-router-dom";
import FacilitiesSlider from "../../component/homepage/box-can-scroll.jsx";
import MembershipLayout from "../../component/homepage/membership-layout.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

export default function Home() {
  const { isLoading, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) return;
    if (role === "admin") navigate("/admin");
    else navigate("/user");
  }, [isLoading, isAuthenticated, role, navigate]);
  return (
    <>
      <Header />

      {/* 1. Hero Section */}
      <div
        className="
          w-full max-w-7xl mx-auto 
          h-[400px] md:h-[500px] lg:h-[600px] /* Responsive Height */
          bg-[#303030] mt-4 md:mt-8 
          rounded-lg 
          p-6 md:p-10 lg:p-12
          flex flex-col justify-between 
          bg-cover bg-center
          relative
        "
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0px 30px 45.9px 15px rgba(255, 43, 43, 0.25)",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 rounded-lg"></div>

        {/* Hero Text Content (Higher Z-Index) */}
        <div className="relative z-10">
          <h1
            className="
              text-3xl font-extrabold leading-tight 
              w-full max-w-xl
              
              /* Default (Mobile): Shorter, punchier text */
              text-shadow-md
              
              /* Medium/Desktop: Original, longer text */
              md:text-[50px] lg:text-6xl
            "
            style={{
              // Original gradient text effect
              backgroundImage: "linear-gradient(to right, #ff0000, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
            }}
          >
            {/* Conditional text display using Tailwind classes: */}
            <span className="hidden sm:block">
              Teach And Upgrade Your Body To It's Maximum Potential
            </span>
            <span className="block sm:hidden">
              Upgrade Your Body. <br /> Maximize Your Potential.
            </span>
          </h1>

          <Link
            to="/login"
            className="
              inline-block mt-6 md:mt-10 
              font-bold 
              hover:bg-[#ff6161] 
              bg-[#ff1f1f] 
              text-white 
              text-lg md:text-xl lg:text-2xl 
              rounded-lg 
              px-6 py-3 md:px-8 md:py-4
              transition-colors duration-300
            "
          >
            Let's Start
          </Link>
        </div>

        {/* Bottom Tagline */}
        <h3
          className="relative z-10 text-xl sm:text-2xl md:text-[30px] font-semibold text-white max-w-sm md:max-w-lg"
          style={{ textShadow: "3px -2px 8px rgba(0,0,0,0.5)" }}
        >
          Upgrade your body, Increase <br />
          your stamina, and reach your prime era
        </h3>
      </div>

      {/* 2. Stats Section (Members/Coaches) */}
      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-[#ff1f1f] rounded-lg mt-10 md:mt-15 flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-10 md:gap-20">
        <div className="flex items-center gap-4 text-white">
          <PeopleIcon className="w-10 h-10 md:w-16 md:h-16 fill-white stroke-white shrink-0" />
          <h1 className="text-3xl md:text-5xl font-bold whitespace-nowrap">
            600+ Members
          </h1>
        </div>
        <div className="w-0.5 h-16 bg-white/50 hidden sm:block"></div>{" "}
        {/* Separator */}
        <div className="flex items-center gap-4 text-white">
          <CoachIcon className="w-10 h-10 md:w-16 md:h-16 fill-white stroke-white shrink-0" />
          <h1 className="text-3xl md:text-5xl font-bold whitespace-nowrap">
            50+ Coaches
          </h1>
        </div>
      </div>

      {/* 3. Our Services Section */}
      <div className="mt-20 px-4">
        <h2 className="text-white text-3xl font-bold text-center">
          Our Services
        </h2>
        <h3 className="text-white text-lg md:text-xl font-normal text-center mb-12">
          Fit for your need
        </h3>

        {/* Services Grid/Layout */}
        <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-center md:justify-around items-end gap-y-12 gap-x-6">
          {/* Personal Training (No translation needed for mobile) */}
          <div className="flex flex-col items-center w-full max-w-[250px]">
            <div
              className="w-full h-80 bg-[#ff1f1f] rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${PersonalTrainer})`,
                backgroundSize: "cover",
                backgroundPosition: "80% 20%",
              }}
            ></div>
            <p className="text-white mt-3 text-xl font-semibold text-center">
              Personal Training
            </p>
            <p className="text-white text-base text-center">
              Train with our professional trainer
            </p>
          </div>

          {/* Group Classes */}
          <div className="flex flex-col items-center w-full max-w-[250px] md:translate-y-14">
            <div
              className="w-full h-80 bg-[#ff1f1f] rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${GroupClasses})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <p className="text-white mt-3 text-xl font-semibold text-center">
              Group Classes
            </p>
            <p className="text-white text-base text-center max-w-[280px]">
              Take fun group classes like Zumba, Yoga, and HIIT
            </p>
          </div>

          {/* Nutrition Guidance (Order flipped on mobile) */}
          <div className="flex flex-col items-center w-full max-w-[250px] md:order-0 order-4">
            <p className="text-white text-xl font-semibold text-center mb-3">
              Nutrition Guidance
            </p>
            <p className="text-white mb-3 text-base text-center max-w-[280px] hidden md:block">
              Nutrition advice for better training results and a healthier
              lifestyle
            </p>
            <div
              className="w-full h-80 bg-[#ff1f1f] rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${NutritionGuidance})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <p className="text-white mb-3 text-base text-center max-w-[280px] block md:hidden">
              Nutrition advice for better training results and a healthier
              lifestyle
            </p>
          </div>

          {/* Body Assessment (Order flipped on mobile) */}
          <div className="flex flex-col items-center w-full max-w-[250px] md:translate-y-10 md:order-0 order-3">
            <p className="text-white text-xl font-semibold text-center mb-3">
              Body Assesment
            </p>
            <p className="text-white mb-3 text-base text-center max-w-[280px] hidden md:block">
              Regular body evaluation to track your fitness progress.
            </p>
            <div
              className="w-full h-80 bg-[#ff1f1f] rounded-lg shadow-lg"
              style={{
                backgroundImage: `url(${BodyAssesment})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <p className="text-white mb-3 text-base text-center max-w-[280px] block md:hidden">
              Regular body evaluation to track your fitness progress.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Unlimited Classes Section */}
      <div className="mt-20 md:mt-32 flex flex-col justify-center px-4">
        <div>
          <h2 className="text-white text-3xl font-bold text-center">
            Unlimited Access to 100+ Classes
          </h2>
          <p className="text-white text-lg md:text-xl text-center mb-10">
            Designed just for you
          </p>
        </div>

        {/* Classes Grid */}
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Class Card Helper Function (Inline Array of Data) */}
          {[
            {
              img: Zumba,
              name: "Zumba",
              type: "Dance",
              color: "#FF6666",
              icon: DanceIcon,
              intensity: "Beginner",
            },
            {
              img: BellyDance,
              name: "Belly Dance",
              type: "Dance",
              color: "#FF6666",
              icon: DanceIcon,
              intensity: "Intermediate",
            },
            {
              img: Piloxing,
              name: "Piloxing",
              type: "Cardio",
              color: "#7D6EFF",
              icon: CardioIcon,
              intensity: "Beginner",
            },
            {
              img: Boxing,
              name: "Boxing",
              type: "Strength",
              color: "#4EFF69",
              icon: StrengthIcon,
              intensity: "Advanced",
            },
          ].map((cls, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              <div
                className="relative w-full h-80 flex flex-col justify-end rounded-lg shadow-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundImage: `url(${cls.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Gradient Overlay for Text */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>

                {/* Type Tag */}
                <div className="absolute top-4 right-4 w-[100px] h-10 bg-[#444444] rounded-lg flex items-center justify-center gap-1 z-10 p-2">
                  <span
                    className={`font-bold text-xs`}
                    style={{ color: cls.color }}
                  >
                    {cls.type}
                  </span>
                  <img src={cls.icon} alt={cls.type} className="w-4 h-4" />
                </div>

                {/* Class Details */}
                <div className="relative z-10 p-4">
                  <p className="text-white text-sm font-semibold mb-1">
                    {cls.intensity} - 60 min
                  </p>
                  <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight">
                    {cls.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-10 mb-16 flex justify-center">
          <Link
            to="/class"
            className="
              hover:bg-[#ff6161] 
              text-lg md:text-[20px] 
              font-bold 
              text-white 
              w-max 
              bg-[#ff1f1f] 
              px-6 py-3 
              rounded-lg
              transition-colors duration-300
            "
          >
            View More Classes
          </Link>
        </div>
      </div>

      {/* 5. Facilities Slider (Component is assumed responsive) */}
      <FacilitiesSlider />

      {/* 6. Membership Plans (Component is assumed responsive from previous fixes) */}
      <div className="mt-20">
        <MembershipLayout
          title="Membership Plans"
          plans={[
            {
              name: "Basic",
              price: "Rp 150.000/month",
              bg: "#444444",
              highlight: false,
              benefits: [
                "Regular gym access",
                "1x trainer consultation",
                "Access to public lockers",
              ],
            },
            {
              name: "Premium",
              price: "Rp 300.000/month",
              bg: "#ff1f1f",
              highlight: true,
              benefits: [
                "Full gym access",
                "4x personal trainer sessions",
                "Access to group classes",
                "Private locker",
              ],
            },
            {
              name: "Elite",
              price: "Rp 500.000/month",
              bg: "#444444",
              highlight: false,
              benefits: [
                "24-hour access",
                "8x personal trainer sessions",
                "Monthly body assessment",
                "Free merchandise",
              ],
            },
          ]}
        />
        <div className="mt-10 mb-16 flex justify-center">
          <Link
            to="/membership"
            className="
              hover:bg-[#ff6161] 
              text-lg md:text-[20px] 
              font-bold 
              text-white 
              w-max 
              bg-[#ff1f1f] 
              px-6 py-3 
              rounded-lg
              transition-colors duration-300
            "
          >
            View More Plans
          </Link>
        </div>
      </div>

      {/* 7. Testimonial Section */}
      <div className="mt-20 py-10 px-4">
        <h2 className="text-3xl font-bold text-white text-center">
          Member Testimonial
        </h2>
        <h3 className="text-lg md:text-xl text-white text-center mb-8">
          This is what YOU said about us!
        </h3>
        {/* TestimonialList component handles its own layout, assumed responsive */}
        <TestimonialList />
      </div>

      <Footer />
    </>
  );
}
