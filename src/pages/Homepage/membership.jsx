import Footer from "../../component/homepage/footer";
import Header from "../../component/homepage/header";
import MembershipLayout from "../../component/homepage/membership-layout";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function Membership() {
  const [promos, setPromos] = useState([]);
  const [plans, setPlans] = useState({
    weekly: [],
    monthly: [],
    yearly: [],
  });

  const [canScroll, setCanScroll] = useState(false);
  const carouselRef = useRef(null);

  // -------- Fetch Promos --------
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/promos`)
      .then((res) => setPromos(res.data))
      .catch((err) => console.error("Failed to fetch promos:", err));
  }, []);

  // -------- Fetch Membership Plans from DB --------
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/admin/plans`)
      .then((res) => {
        const result = { weekly: [], monthly: [], yearly: [] };

        res.data.forEach((p) => {
          // benefits are ALREADY array from backend
          const benefitList = Array.isArray(p.benefits) ? p.benefits : [];

          const planObj = {
            name: p.name,
            price: `Rp ${parseInt(p.price).toLocaleString()}`,
            bg: "#444444",
            highlight: p.name.toLowerCase().includes("premium"),
            benefits: benefitList,
          };

          const dur = p.duration_days;

          if (dur <= 7) {
            result.weekly.push(planObj);
          } else if (dur <= 31) {
            result.monthly.push(planObj);
          } else {
            result.yearly.push(planObj);
          }
        });

        setPlans(result);
      })
      .catch((err) => console.error("Failed to fetch plans:", err));
  }, []);

  // -------- Carousel Scroll Detection --------
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !promos.length) return;

    const totalWidth = [...carousel.children[0].children].reduce(
      (acc, card) => acc + card.offsetWidth + 16,
      0
    );

    setCanScroll(totalWidth > carousel.offsetWidth);
  }, [promos]);

  // -------- Auto Scroll Carousel --------
  useEffect(() => {
    if (!canScroll) return;

    const carousel = carouselRef.current;
    let scrollAmount = 0;
    const speed = 2;

    const scroll = () => {
      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        scrollAmount = 0;
      } else scrollAmount += speed;

      carousel.scrollLeft = scrollAmount;
      requestAnimationFrame(scroll);
    };

    scroll();
  }, [canScroll, promos]);

  return (
    <>
      <Header />

      <h2 className="text-white font-bold text-4xl md:text-[50px] text-center mt-12 mb-8">
        Membership
      </h2>

      {/* Promo Carousel */}
      <div
        ref={carouselRef}
        className={`w-full overflow-hidden flex py-4 ${
          !canScroll ? "justify-center" : "flex-nowrap"
        }`}
      >
        <div
          className="flex gap-4"
          style={{ minWidth: canScroll ? "max-content" : "auto" }}
        >
          {[...(canScroll ? [...promos, ...promos] : promos)].map(
            (promo, index) => (
              <div
                key={index}
                className="min-w-[250px] p-4 rounded-lg text-white shrink-0"
                style={{
                  backgroundColor: "#555555",
                  overflowWrap: "break-word",
                }}
              >
                <h3 className="font-bold text-lg mb-1">{promo.title}</h3>
                <p className="text-sm mb-1">{promo.description}</p>
                <p className="text-xs">
                  Discount: {promo.discount_percentage}%
                </p>
                <p className="text-xs">
                  Expires:{" "}
                  {promo.valid_until
                    ? new Date(promo.valid_until).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Render Weekly / Monthly / Yearly */}
      <MembershipLayout title="Weekly Plans" plans={plans.weekly} />
      <div className="w-full h-16 md:h-20"></div>

      <MembershipLayout title="Monthly Plans" plans={plans.monthly} />
      <div className="w-full h-16 md:h-20"></div>

      <MembershipLayout title="Yearly Plans" plans={plans.yearly} />
      <div className="w-full h-12"></div>

      <Footer />
    </>
  );
}