import { Link } from "react-router-dom";

export default function MembershipLayout({ title, plans }) {
  return (
    <div className="mx-auto px-4">
      {/* Title */}
      <h2 className="mt-8 text-white text-center text-2xl md:text-[30px] font-bold">
        {title}
      </h2>

      {/* Plans Container: Uses flex-col on mobile, centers items, and controls spacing */}
      <div className="flex text-white justify-center flex-wrap gap-8 md:gap-10 mt-8">
        {plans.map((plan, i) => (
          // Link applied to individual card for better targeting
          <Link 
            to="/login"
            key={i}
            className={`
              block 
              w-full sm:w-[320px] md:w-[280px]  /* Responsive width */
              h-auto min-h-[420px]             /* Dynamic height with min-height */
              rounded-xl 
              transition-all duration-300 ease-out 
              shadow-lg
              /* Conditional Styling for Highlighted Card */
              ${plan.highlight 
                ? "shadow-red-800/50 hover:scale-[1.03] hover:-translate-y-1 z-10" 
                : "translate-y-0 md:translate-y-8 hover:scale-[1.03] hover:-translate-y-1"
              }
            `}
            style={{ backgroundColor: plan.bg }}
          >
            <div className="p-6 h-full flex flex-col">
              
              {plan.highlight && (
                <h3 className="text-yellow-400 text-xl font-black text-center mb-1 uppercase tracking-wider">
                  BEST DEAL!
                </h3>
              )}

              {/* Plan Name & Price */}
              <h2 className="text-center font-bold text-3xl mb-1">{plan.name}</h2>
              <h3 className="text-center text-xl mb-6 font-semibold">{plan.price}</h3>
              
              {/* Benefits List */}
              <div className="space-y-3 grow">
                {plan.benefits.map((benefit, bIndex) => (
                  <p key={bIndex} className="flex items-start text-base md:text-[17px]">
                    <span
                      className={`font-black text-xl mr-2 mt-[-3px] shrink-0 ${
                        plan.highlight ? "text-[#1a1a1a]" : "text-red-500"
                      }`}
                    >
                      ✔
                    </span>
                    {benefit}
                  </p>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}