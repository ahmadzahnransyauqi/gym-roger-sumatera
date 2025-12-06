function TestimonialCard({ nama, kerja, bintang, komentar, link }) {
  return (
    <div
      className="bg-[#444444] 
                 w-[280px] sm:w-[320px] lg:w-[370px] /* Tighter width for small phones */
                 min-h-[250px] h-auto rounded-lg p-5 sm:p-8 shadow 
                 overflow-hidden flex flex-col justify-between shrink-0"
    >
      <div className="flex flex-row gap-3 sm:gap-5 items-start">
        <img src={link} alt={`Profile photo of ${nama}`} className="rounded-full w-12 h-12 sm:w-16 sm:h-16" /> {/* Smaller image */}
        <div className="flex text-lg md:text-xl flex-col text-white">
          <h3 className="font-semibold text-base sm:text-lg">{nama}</h3>
          <h3 className="font-bold text-sm sm:text-base text-[#ff1f1f]">{kerja}</h3>
          <h3 className="text-yellow-400 text-xl">{"⭐".repeat(bintang)}</h3>
        </div>
      </div>

      <p className="text-white italic mt-4 text-sm sm:text-base md:text-lg">
        "{komentar}"
      </p>
    </div>
  );
}

// (TestimonialCard component defined above would go here or be imported)

export default function TestimonialList() {
  const cards = [
    {
      nama: "Alya Putri",
      kerja: "Graphic Designer",
      bintang: 4,
      komentar: "Tempatnya bersih dan nyaman. Kelas grupnya seru, recommended!",
      link: "https://i.pravatar.cc/150?img=12",
    },
    {
      nama: "Dimas Rinaldi",
      kerja: "Atlet Fitness",
      bintang: 5,
      komentar: "Fasilitas premium dan trainernya profesional. Gym terbaik!",
      link: "https://i.pravatar.cc/150?img=45",
    },
    {
      nama: "Clara A.",
      kerja: "Content Creator",
      bintang: 5,
      komentar: "Staff ramah dan suasananya cozy banget!",
      link: "https://i.pravatar.cc/150?img=22",
    },
    {
      nama: "Rudi Hartono",
      kerja: "Karyawan Swasta",
      bintang: 4,
      komentar: "Suka banget sama kelas Zumba-nya. Seru abis!",
      link: "https://i.pravatar.cc/150?img=17",
    },
  ];

  return (
    <div className="w-full overflow-hidden relative mt-8 h-[250px] md:h-[280px]">
      <div
        className="
          flex gap-5 absolute left-0 top-0 
          animate-[slideX_20s_linear_infinite]
          
          /* Adjusted width for the smaller card size (280px) on mobile */
          w-[1220px] sm:w-[2200px] lg:w-[3100px] 
        "
        // New Mobile Width Calculation: (4 cards * 280px + 5 gaps * 20px) * 2 sets = (1120 + 100) * 2 = 2440px. 
        // Using w-[1220px] is incorrect for the double loop effect.
        // Let's use Tailwind's `min-w-max` and ensure the inner divs stretch correctly
        // Or calculate the necessary pixel width if Tailwind utility is cumbersome.
        // For simplicity and to maintain the fixed animation, I'll rely on a large enough class and the assumption that the content overflows.
        // Given the constraints, let's trust the inner flex layout and ensure the animation is defined externally.
        style={{ width: "2440px" }} // Explicit width for the animation track
      >
        {/* First set of cards */}
        <div className="flex gap-5">
          {cards.map((c, i) => (
            <TestimonialCard key={i} {...c} />
          ))}
        </div>

        {/* Second set of cards (duplicate for infinite scroll effect) */}
        <div className="flex gap-5">
          {cards.map((c, i) => (
            <TestimonialCard key={"dup" + i} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}