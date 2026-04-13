import { motion, useSpring } from "framer-motion";
import { ShoppingCart, Zap } from "lucide-react";
import { Category } from "./data";

interface Props {
  activeCategory: Category;
  progress: number;
  currentIndex: number;
  total: number;
  cartCount: number;
  onCartOpen: () => void;
}

const catColors: Record<Category, string> = {
  Burgers: "#FF0A0A",
  Fries:   "#FF6B00",
  Drinks:  "#0AADFF",
  Combos:  "#FFD700",
};

export default function MenuHeader({ activeCategory, progress, currentIndex, total, cartCount, onCartOpen }: Props) {
  const color = catColors[activeCategory];
  const springProgress = useSpring(progress, { stiffness: 120, damping: 28 });

  return (
    <>
      {/* ── PROGRESS BAR (top of screen) ── */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          zIndex: 1000,
          background: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}66`,
          width: `${progress * 100}%`,
          transition: "width 0.1s linear, background 0.5s ease, box-shadow 0.5s ease",
          transformOrigin: "left",
        }}
      />

      {/* ── MAIN HEADER BAR ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(0,0,0,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${color}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(16px,4vw,64px)",
          height: 56,
          transition: "border-color 0.5s ease",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Zap size={16} fill={color} style={{ color, transition: "color 0.5s" }} />
          <span
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 22,
              letterSpacing: "0.1em",
              color: "#fff",
            }}
          >
            WAKEUP<span style={{ color }}>.</span>
          </span>
        </div>

        {/* Centre: active category */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(14px,2vw,20px)",
            letterSpacing: "0.2em",
            color,
            textShadow: `0 0 16px ${color}88`,
            whiteSpace: "nowrap",
          }}
        >
          — {activeCategory.toUpperCase()} —
        </motion.div>

        {/* Right: item counter + cart */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Counter */}
          <div
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(12px,1.5vw,17px)",
              letterSpacing: "0.12em",
              color: "#444",
              display: "flex",
              alignItems: "baseline",
              gap: 3,
            }}
          >
            <motion.span
              key={currentIndex}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "#e8e8e8", fontSize: "1.2em" }}
            >
              {String(currentIndex + 1).padStart(2, "0")}
            </motion.span>
            <span style={{ fontSize: "0.9em" }}>/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          {/* Cart button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={onCartOpen}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              background: cartCount > 0 ? color : "transparent",
              border: `1px solid ${cartCount > 0 ? color : "#333"}`,
              color: "#fff",
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 14,
              letterSpacing: "0.15em",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: cartCount > 0 ? `0 0 16px ${color}66` : "none",
            }}
          >
            <ShoppingCart size={15} />
            {cartCount > 0 ? `ORDER (${cartCount})` : "ORDER"}
          </motion.button>
        </div>
      </header>
    </>
  );
}
