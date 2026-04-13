import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, X, Flame, Sparkles, ChevronDown, Minus, Plus, Trash2 } from "lucide-react";
import { MENU, CATEGORIES, MenuItem, Category } from "./data";
import MenuHeader from "./MenuHeader";
import CartDrawer from "./CartDrawer";

export interface CartItem extends MenuItem {
  qty: number;
}

export default function MenuScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("Burgers");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // Track scroll progress + active item + category
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? scrollY / docH : 0);

      // Find which item is most visible
      let closestIdx = 0;
      let closestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - window.innerHeight * 0.45);
        if (dist < closestDist) { closestDist = dist; closestIdx = i; }
      });
      setCurrentIndex(closestIdx);
      setActiveCategory(MENU[closestIdx].category);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addToCart = useCallback((item: MenuItem) => {
    setCart(prev => {
      const exists = prev.find(c => c.id === item.id);
      if (exists) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart(prev => prev.flatMap(c => c.id === id ? (c.qty > 1 ? [{ ...c, qty: c.qty - 1 }] : []) : [c]));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.priceNum * c.qty, 0);

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      {/* ── STICKY HEADER ── */}
      <MenuHeader
        activeCategory={activeCategory}
        progress={progress}
        currentIndex={currentIndex}
        total={MENU.length}
        cartCount={totalItems}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* ── HERO TITLE ── */}
      <HeroTitle />

      {/* ── CATEGORY MARKERS + ITEMS ── */}
      <div ref={containerRef} className="relative">
        {CATEGORIES.map(cat => (
          <CategoryBlock
            key={cat}
            category={cat}
            items={MENU.filter(m => m.category === cat)}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            addToCart={addToCart}
            addedId={addedId}
            itemRefs={itemRefs}
            globalOffset={MENU.findIndex(m => m.category === cat)}
          />
        ))}
      </div>

      {/* ── END OF MENU ── */}
      <EndSlate onCartOpen={() => setCartOpen(true)} totalItems={totalItems} />

      {/* ── CART DRAWER ── */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onClear={clearCart}
        totalPrice={totalPrice}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO TITLE
// ─────────────────────────────────────────────
function HeroTitle() {
  return (
    <div
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ height: "75vh", paddingBottom: "clamp(40px,8vh,80px)", paddingLeft: "clamp(24px,6vw,96px)" }}
    >
      {/* BG image */}
      <div className="absolute inset-0">
        <img src="/burger-hero.png" alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.35)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000 30%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 30% 60%, rgba(139,0,0,0.25) 0%, transparent 70%)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#FF0A0A", letterSpacing: "0.35em", fontSize: "clamp(11px,1.2vw,14px)" }}
        >
          I‑8 MARKAZ · ISLAMABAD · OPEN 12PM – 12AM
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.35 }}
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(64px,14vw,200px)",
            lineHeight: 0.87,
            color: "#fff",
            letterSpacing: "-0.01em",
          }}
        >
          THE<br />
          <span style={{ color: "#FF0A0A", textShadow: "0 0 40px rgba(255,10,10,0.5)" }}>MENU</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ fontFamily: "'Barlow',sans-serif", color: "#888", fontSize: "clamp(14px,1.6vw,18px)", marginTop: 24, maxWidth: 420 }}
        >
          {MENU.length} items. Scroll through every one.
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 12 }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ChevronDown size={18} style={{ color: "#FF0A0A" }} />
          </motion.div>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#444", letterSpacing: "0.2em", fontSize: 13 }}>
            SCROLL THE MENU
          </span>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CATEGORY BLOCK
// ─────────────────────────────────────────────
function CategoryBlock({
  category, items, expandedId, setExpandedId, addToCart, addedId, itemRefs, globalOffset
}: {
  category: Category;
  items: MenuItem[];
  expandedId: number | null;
  setExpandedId: (id: number | null) => void;
  addToCart: (item: MenuItem) => void;
  addedId: number | null;
  itemRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  globalOffset: number;
}) {
  const catColors: Record<Category, string> = {
    Burgers: "#FF0A0A",
    Fries:   "#FF6B00",
    Drinks:  "#0AADFF",
    Combos:  "#FFD700",
  };
  const color = catColors[category];

  return (
    <div>
      {/* Category divider */}
      <div
        className="sticky top-16 z-20 flex items-center gap-6 px-6 md:px-16 py-4 select-none pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.98) 60%, transparent)",
          borderBottom: `1px solid ${color}22`,
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(32px,5vw,56px)",
            color,
            lineHeight: 1,
            letterSpacing: "0.04em",
            textShadow: `0 0 30px ${color}66`,
          }}
        >
          {category.toUpperCase()}
        </span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${color}44,transparent)` }} />
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#333", fontSize: 13, letterSpacing: "0.2em" }}>
          {items.length} ITEMS
        </span>
      </div>

      {/* Items */}
      <div>
        {items.map((item, localIdx) => {
          const globalIdx = globalOffset + localIdx;
          return (
            <MenuItemRow
              key={item.id}
              item={item}
              index={globalIdx}
              localIndex={localIdx}
              isExpanded={expandedId === item.id}
              onExpand={() => setExpandedId(expandedId === item.id ? null : item.id)}
              onAdd={addToCart}
              justAdded={addedId === item.id}
              accent={color}
              ref={el => { itemRefs.current[globalIdx] = el; }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MENU ITEM ROW
// ─────────────────────────────────────────────
import React from "react";
const MenuItemRow = React.forwardRef<HTMLElement, {
  item: MenuItem;
  index: number;
  localIndex: number;
  isExpanded: boolean;
  onExpand: () => void;
  onAdd: (item: MenuItem) => void;
  justAdded: boolean;
  accent: string;
}>(({ item, index, localIndex, isExpanded, onExpand, onAdd, justAdded, accent }, ref) => {
  const isEven = localIndex % 2 === 0;

  return (
    <motion.article
      ref={ref as React.RefObject<HTMLElement>}
      layout
      onClick={onExpand}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      style={{
        cursor: "pointer",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
        overflow: "hidden",
        background: isExpanded ? "#0c0000" : "transparent",
        transition: "background 0.4s ease",
      }}
    >
      {/* Hover red left stripe */}
      <motion.div
        animate={{ scaleY: isExpanded ? 1 : 0 }}
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: accent,
          boxShadow: `0 0 12px ${accent}`,
          transformOrigin: "top",
        }}
      />

      {/* ── COLLAPSED ROW ── */}
      <div
        className="grid items-center gap-4 md:gap-8 px-6 md:px-16 py-8 md:py-10"
        style={{
          gridTemplateColumns: "clamp(36px,5vw,64px) 1fr clamp(120px,20vw,260px) clamp(80px,10vw,140px)",
        }}
      >
        {/* Index number */}
        <span
          style={{
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: "clamp(14px,2vw,20px)",
            color: isExpanded ? accent : "#333",
            letterSpacing: "0.05em",
            transition: "color 0.3s",
            userSelect: "none",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Name + tag + desc */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h2
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(28px,4.5vw,72px)",
                lineHeight: 0.9,
                color: isExpanded ? "#fff" : "#e8e8e8",
                letterSpacing: "-0.01em",
                transition: "color 0.3s",
              }}
            >
              {item.name}
            </h2>
            {/* Badges */}
            {item.spicy && <Flame size={14} fill="#FF4400" style={{ color: "#FF4400", flexShrink: 0 }} />}
            {item.new   && <Sparkles size={14} fill={accent} style={{ color: accent, flexShrink: 0 }} />}
          </div>
          <p
            style={{
              fontFamily: "'Barlow',sans-serif",
              fontSize: "clamp(12px,1.2vw,15px)",
              color: "#555",
              marginTop: 4,
              letterSpacing: "0.02em",
            }}
          >
            {item.desc}
          </p>
          {/* Tag pill */}
          <span
            style={{
              display: "inline-block",
              marginTop: 8,
              padding: "2px 10px",
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 11,
              letterSpacing: "0.2em",
              background: `${accent}22`,
              color: accent,
              border: `1px solid ${accent}44`,
            }}
          >
            {item.tag}
          </span>
        </div>

        {/* Floating food image */}
        <div
          className="hidden md:block relative"
          style={{ height: "clamp(80px,12vw,160px)", pointerEvents: "none" }}
        >
          <motion.img
            src={item.image}
            alt={item.name}
            animate={{
              y: isExpanded ? -8 : 0,
              scale: isExpanded ? 1.06 : 1,
              filter: isExpanded ? "drop-shadow(0 0 20px rgba(255,10,10,0.4))" : "drop-shadow(0 4px 12px rgba(0,0,0,0.6))",
            }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        {/* Price */}
        <div style={{ textAlign: "right" }}>
          <span
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(20px,2.5vw,36px)",
              color: isExpanded ? accent : "#e8e8e8",
              letterSpacing: "0.03em",
              transition: "color 0.3s",
              display: "block",
            }}
          >
            {item.price}
          </span>
          {/* Expand hint */}
          <motion.span
            animate={{ opacity: isExpanded ? 0 : 1 }}
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 11,
              color: "#444",
              letterSpacing: "0.15em",
            }}
          >
            TAP TO EXPAND
          </motion.span>
        </div>
      </div>

      {/* ── EXPANDED DETAIL ── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expand"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            style={{ overflow: "hidden" }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="px-6 md:px-16 pb-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              {/* Long description */}
              <div>
                <div style={{ width: 40, height: 2, background: accent, marginBottom: 20, boxShadow: `0 0 8px ${accent}` }} />
                <p
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: "clamp(15px,1.5vw,20px)",
                    lineHeight: 1.65,
                    color: "#aaa",
                    maxWidth: 480,
                  }}
                >
                  {item.longDesc}
                </p>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onAdd(item)}
                  style={{
                    marginTop: 28,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "14px 32px",
                    background: justAdded ? "#1a4a1a" : accent,
                    color: "#fff",
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 18,
                    letterSpacing: "0.15em",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: justAdded ? "0 0 20px rgba(34,197,94,0.4)" : `0 0 20px ${accent}66`,
                    transition: "background 0.3s, box-shadow 0.3s",
                  }}
                >
                  <ShoppingCart size={18} />
                  {justAdded ? "ADDED ✓" : `ADD TO ORDER · ${item.price}`}
                </motion.button>
              </div>

              {/* Big food image */}
              <div className="flex justify-center md:justify-end">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  initial={{ scale: 0.85, opacity: 0, rotate: -4 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    width: "clamp(180px,30vw,380px)",
                    height: "clamp(180px,30vw,380px)",
                    objectFit: "contain",
                    filter: `drop-shadow(0 0 32px ${accent}55)`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
});
MenuItemRow.displayName = "MenuItemRow";

// ─────────────────────────────────────────────
// END SLATE
// ─────────────────────────────────────────────
function EndSlate({ onCartOpen, totalItems }: { onCartOpen: () => void; totalItems: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{
        minHeight: "60vh",
        background: "linear-gradient(to top, #000, #0a0000)",
        padding: "80px 24px",
      }}
    >
      {/* Red glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 40% at 50% 80%, rgba(139,0,0,0.25) 0%, transparent 70%)",
      }} />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontFamily: "'Bebas Neue',sans-serif", color: "#FF0A0A", letterSpacing: "0.35em", fontSize: 13, marginBottom: 24 }}
      >
        THAT'S THE WHOLE MENU
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: "clamp(56px,10vw,140px)",
          lineHeight: 0.87,
          color: "#fff",
          marginBottom: 16,
        }}
      >
        MADE<br />
        <span style={{ color: "#FF0A0A", textShadow: "0 0 40px rgba(255,10,10,0.5)" }}>YOUR PICK?</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        style={{ fontFamily: "'Barlow',sans-serif", color: "#555", fontSize: 16, marginBottom: 40 }}
      >
        I‑8 Markaz, Islamabad · Open until midnight
      </motion.p>
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onCartOpen}
        style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "18px 40px",
          background: "#FF0A0A",
          color: "#fff",
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: 22,
          letterSpacing: "0.15em",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 0 40px rgba(255,10,10,0.4), 0 0 80px rgba(255,10,10,0.15)",
        }}
      >
        <ShoppingCart size={22} />
        VIEW ORDER {totalItems > 0 && `· ${totalItems} ITEMS`}
      </motion.button>
    </div>
  );
}
