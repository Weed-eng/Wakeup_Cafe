import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart, Menu } from "lucide-react";
import Particles from "../Particles";

export default function OrderCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="order"
      ref={ref}
      className="relative py-28 md:py-40 overflow-hidden flex flex-col items-center justify-center text-center"
      style={{
        background: "linear-gradient(135deg, #0a0000 0%, #000 50%, #0a0000 100%)",
        minHeight: 500,
      }}
    >
      {/* Particles */}
      <div className="absolute inset-0">
        <Particles count={50} />
      </div>

      {/* Checkerboard edges */}
      <div className="absolute top-0 left-0 right-0 checkerboard h-px opacity-20" />
      <div className="absolute bottom-0 left-0 right-0 checkerboard h-px opacity-20" />

      {/* Red radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,0,0,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Left / right red column glow */}
      <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, #FF0A0A, transparent)", boxShadow: "0 0 15px #FF0A0A" }} />
      <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, #FF0A0A, transparent)", boxShadow: "0 0 15px #FF0A0A" }} />

      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-condensed text-sm tracking-[0.4em] uppercase mb-6"
          style={{ color: "#FF0A0A" }}
        >
          Late Night Cravings Hit Different
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
          className="font-display neon-text leading-none mb-4"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(80px, 18vw, 240px)",
            lineHeight: 0.85,
            color: "#FF0A0A",
          }}
        >
          HUNGRY?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-lg mb-12"
          style={{ color: "#888", fontFamily: "'Barlow', sans-serif" }}
        >
          Open until midnight every night. Islamabad, we're waiting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <button
            onClick={() => scrollTo("#featured")}
            className="neon-btn px-10 py-5 text-xl tracking-[0.15em] flex items-center gap-3"
          >
            <ShoppingCart size={22} />
            Order Now
          </button>
          <button
            onClick={() => scrollTo("#menu")}
            className="neon-btn-outline px-10 py-5 text-xl tracking-[0.15em] flex items-center gap-3"
          >
            <Menu size={22} />
            View Full Menu
          </button>
        </motion.div>

        {/* Hours pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-3 mt-10 font-condensed text-sm tracking-wider"
          style={{ color: "#666" }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "#22c55e", boxShadow: "0 0 8px #22c55e" }}
          />
          Open Now · I-8 Markaz, Islamabad · 12 PM – 12 AM
        </motion.div>
      </div>
    </section>
  );
}
