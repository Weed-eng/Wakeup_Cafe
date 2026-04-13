import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import Particles from "../Particles";

const slides = [
  {
    image: "/burger-hero.png",
    headline: "WAKE UP",
    headline2: "YOUR NIGHT",
    sub: "Islamabad's late-night burger spot.",
  },
  {
    image: "/burger-smash.png",
    headline: "BOLD",
    headline2: "FLAVORS",
    sub: "Smash burgers built to hit different.",
  },
  {
    image: "/cafe-interior.png",
    headline: "THE VIBE",
    headline2: "IS REAL",
    sub: "Neon lit. Late night. I-8 Markaz.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(-1);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [current]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 600 }}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: i === current ? "scale(1.05)" : "scale(1)",
              transition: "transform 7s ease",
            }}
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(139,0,0,0.3) 100%)",
            }}
          />
          {/* Red left stripe */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{
              background: "linear-gradient(180deg, transparent, #FF0A0A, transparent)",
              boxShadow: "0 0 20px #FF0A0A",
            }}
          />
        </div>
      ))}

      {/* Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Particles count={35} />
      </div>

      {/* Checkerboard bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 checkerboard-sm z-10 pointer-events-none"
        style={{ height: 60, opacity: 0.15, maskImage: "linear-gradient(to bottom, transparent, black)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16 lg:px-24">
        {/* Badge */}
        <motion.div
          key={`badge-${current}`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="red-line" />
          <span
            className="font-condensed text-xs tracking-[0.3em] uppercase"
            style={{ color: "#FF0A0A" }}
          >
            I-8 Markaz · Islamabad
          </span>
        </motion.div>

        {/* Headline */}
        <div className="overflow-hidden">
          <motion.h1
            key={`h1-${current}`}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="font-display text-white leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(72px, 13vw, 180px)",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
            }}
          >
            {slides[current].headline}
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            key={`h2-${current}`}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.32 }}
            className="neon-text leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(72px, 13vw, 180px)",
              color: "#FF0A0A",
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
            }}
          >
            {slides[current].headline2}
          </motion.h1>
        </div>

        {/* Subtext */}
        <motion.p
          key={`sub-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-condensed text-lg md:text-2xl mt-6 max-w-md"
          style={{ color: "#E8E8E8", letterSpacing: "0.05em", fontWeight: 400 }}
        >
          {slides[current].sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          key={`cta-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap items-center gap-4 mt-8"
        >
          <button
            onClick={() => scrollTo("#menu")}
            className="neon-btn px-8 py-4 text-base tracking-[0.15em]"
          >
            View Menu
          </button>
          <button
            onClick={() => scrollTo("#order")}
            className="neon-btn-outline px-8 py-4 text-base tracking-[0.15em]"
          >
            Order Now →
          </button>
        </motion.div>

        {/* Slide indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center gap-3 mt-12"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPrev(current); setCurrent(i); }}
              className="transition-all duration-300"
              style={{
                width: i === current ? 32 : 8,
                height: 3,
                background: i === current ? "#FF0A0A" : "#444",
                boxShadow: i === current ? "0 0 8px #FF0A0A" : "none",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("#about")}
      >
        <span className="font-condensed text-xs tracking-[0.3em] uppercase" style={{ color: "#888" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={16} style={{ color: "#FF0A0A" }} />
        </motion.div>
      </motion.div>

      {/* Rating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute top-24 right-8 md:right-16 z-20 hidden md:flex flex-col items-center justify-center"
        style={{
          width: 90,
          height: 90,
          border: "1px solid rgba(255,10,10,0.3)",
          boxShadow: "0 0 20px rgba(255,10,10,0.1)",
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span className="font-display text-2xl text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          4.8★
        </span>
        <span className="font-condensed text-xs text-[#888] tracking-widest text-center mt-1">
          RATED
        </span>
      </motion.div>
    </section>
  );
}
