export default function MarqueeBanner() {
  const items = ["WAKEUP CAFE", "SMASH BURGERS", "ISLAMABAD", "LATE NIGHT", "NEON VIBES", "I-8 MARKAZ", "BOLD FLAVORS", "ORDER NOW"];

  const repeated = [...items, ...items];

  return (
    <div className="overflow-hidden py-3 z-10 relative" style={{ background: "#FF0A0A" }}>
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-display whitespace-nowrap px-8 text-black text-sm tracking-[0.2em]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            {item}
            <span className="mx-4 opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
