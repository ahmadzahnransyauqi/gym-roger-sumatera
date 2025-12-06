import { useRef, useState, useEffect } from "react";
import OutdoorGym from "../../assets/OutdoorGym.webp";
import LockerRoom from "../../assets/LockerRoom.webp";
import Cafeteria from "../../assets/Cafeteria.webp";
import GymRoom from "../../assets/GymRoom.webp";
import Sauna from "../../assets/Sauna.webp";

export default function FacilitiesSlider() {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);

  const slides = [
    { id: 1, title: "Gym Room" },
    { id: 2, title: "Sauna" },
    { id: 3, title: "Locker Room" },
    { id: 4, title: "Cafeteria" },
    { id: 5, title: "Outdoor Gym" },
  ];

  const images = [GymRoom, Sauna, LockerRoom, Cafeteria, OutdoorGym];

  const totalSlides = slides.length;

  useEffect(() => {
    const slider = scrollRef.current;
    let scrollTimeout;

    const handleScroll = () => {
      const position = slider.scrollLeft;
      const width = window.innerWidth;
      const newIndex = Math.round(position / width);
      setIndex(newIndex);

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        startAutoScroll();
      }, 10000);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  const startAutoScroll = () => {
    const slider = scrollRef.current;

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % totalSlides;
        slider.scrollTo({
          left: next * window.innerWidth,
          behavior: "smooth",
        });
        return next;
      });
    }, 20000);

    return interval;
  };

  useEffect(() => {
    const interval = startAutoScroll();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <h2 className="mt-8 text-white text-center text-[30px] font-bold">
        Enjoy Our Top Facilities
      </h2>

      <div
        ref={scrollRef}
        className="mt-5 w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)]
                   overflow-x-scroll flex snap-x snap-mandatory scroll-smooth hide-scrollbar"
      >
        {slides.map((item, i) => (
          <div
            key={item.id}
            className="relative w-screen h-[528px] bg-cover bg-center bg-no-repeat pt-8 snap-start shrink-0"
            style={{
              backgroundImage: `url(${images[i]})`,
            }}
          >
            <h2 className="text-white text-[50px] text-shadow-[6px_4px_4px_#000000] font-bold ml-10">
              {item.title}
            </h2>
          </div>
        ))}
      </div>

      <div className="relative w-full flex justify-center mt-4 mb-10">
        <div className="bg-white w-64 h-4 rounded-lg relative overflow-hidden">
          <div
            className="bg-[#FF6161] h-full rounded-lg transition-all duration-300"
            style={{
              width: "20%",
              transform: `translateX(${index * 100}%)`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
