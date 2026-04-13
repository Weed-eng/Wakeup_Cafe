import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, MapPin, Star, Users } from "lucide-react";

const stats = [
  { icon: Star, value: "4.8", label: "Rating" },
  { icon: Users, value: "10K+", label: "Happy Guests" },
  { icon: Clock, value: "12PM–12AM", label: "Open Daily" },
  { icon: MapPin, value: "I-8 Markaz", label: "Islamabad" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Background checkerboard corner */}
      <div
        className="absolute top-0 right-0 w-64 h-64 checkerboard opacity-5 pointer-events-none"
        style={{ borderRadius: "0 0 0 100%" }}
      />

      {/* Red accent line left */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-0.5 pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, #FF0A0A, transparent)", boxShadow: "0 0 15px #FF0A0A" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <img
                src="/cafe-interior.png"
                alt="Wakeup Cafe Interior"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.85) contrast(1.1)" }}
              />
              {/* Red overlay glow */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(139,0,0,0.3) 0%, transparent 60%)" }}
              />
            </div>

            {/* Floating tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: -6 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -right-4 md:-right-8 px-5 py-4"
              style={{
                background: "#FF0A0A",
                boxShadow: "0 0 30px rgba(255,10,10,0.5)",
              }}
            >
              <p className="font-display text-white text-xs tracking-[0.2em]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                SINCE
              </p>
              <p className="font-display text-white text-3xl leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                2021
              </p>
            </motion.div>

            {/* Border frame */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ border: "1px solid rgba(255,10,10,0.2)", transform: "translate(12px, 12px)" }}
            />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="red-line" />
              <span className="font-condensed text-xs tracking-[0.3em] uppercase" style={{ color: "#FF0A0A" }}>
                Our Story
              </span>
            </div>

            <h2
              className="font-display text-white leading-none mb-8"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(48px, 7vw, 90px)",
                lineHeight: 0.9,
              }}
            >
              THE <span style={{ color: "#FF0A0A" }} className="neon-text-subtle">VIBE</span>
              <br />
              IS REAL.
            </h2>

            <div className="space-y-4 mb-10">
              <p
                className="font-body text-base leading-relaxed"
                style={{ color: "#E8E8E8", fontFamily: "'Barlow', sans-serif" }}
              >
                Wakeup Cafe is Islamabad's go-to late-night burger spot. We built this place for the night owls,
                the late-night cravings, and the ones who know that the best meals happen after midnight.
              </p>
              <p
                className="font-body text-base leading-relaxed"
                style={{ color: "#888", fontFamily: "'Barlow', sans-serif" }}
              >
                Bold flavors, neon vibes, and a space built for good food and great company. Every burger is
                crafted with premium ingredients, every visit is an experience you'll post about.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="p-4"
                  style={{
                    background: "#111",
                    border: "1px solid rgba(255,10,10,0.1)",
                  }}
                >
                  <stat.icon size={16} style={{ color: "#FF0A0A" }} className="mb-2" />
                  <p
                    className="font-display text-white text-xl"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-condensed text-xs tracking-widest" style={{ color: "#666" }}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
