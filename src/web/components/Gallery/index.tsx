import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const galleryImages = [
  { src: "/gallery-banner.png", wide: true, alt: "Wakeup Cafe cinematic food spread" },
  { src: "/burger-classic.png", wide: false, alt: "Classic Burger" },
  { src: "/burger-hot.png", wide: false, alt: "Hot Grill Summer" },
  { src: "/burger-smash.png", wide: false, alt: "Premium Smash Burger" },
  { src: "/fries-loaded.png", wide: false, alt: "Loaded Fries" },
  { src: "/combo-meal.png", wide: false, alt: "Combo Meal" },
];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#000" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="red-line" />
            <span className="font-condensed text-xs tracking-[0.3em] uppercase" style={{ color: "#FF0A0A" }}>
              Food Gallery
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-white leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 7vw, 90px)",
              lineHeight: 0.9,
            }}
          >
            FOOD<br />
            <span style={{ color: "#FF0A0A" }} className="neon-text-subtle">THAT HITS</span>
          </motion.h2>
        </div>

        {/* Banner image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-3 overflow-hidden relative group"
          style={{ height: "clamp(200px, 35vw, 450px)" }}
        >
          <img
            src="/gallery-banner.png"
            alt="Wakeup Cafe food spread"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)" }}
          />
          {/* Red glow edges */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: "inset 0 0 60px rgba(255,10,10,0.2), inset 0 0 0 1px rgba(255,10,10,0.3)",
            }}
          />
        </motion.div>

        {/* 5-col grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {galleryImages.slice(1).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
              className="overflow-hidden group relative cursor-pointer"
              style={{ aspectRatio: "1" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ filter: "brightness(0.85) contrast(1.05)" }}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, rgba(139,0,0,0.4), transparent)" }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: "1px solid rgba(255,10,10,0.4)", boxShadow: "inset 0 0 20px rgba(255,10,10,0.1)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
