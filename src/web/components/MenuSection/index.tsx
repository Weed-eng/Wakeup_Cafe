import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShoppingCart, Zap } from "lucide-react";

const tabs = ["Burgers", "Fries", "Drinks", "Combos"];

const menuData: Record<string, Array<{ name: string; desc: string; price: string; image: string; hot?: boolean }>> = {
  Burgers: [
    { name: "Wakeup Classic", desc: "Double beef, secret sauce, brioche bun", price: "Rs. 890", image: "/burger-classic.png" },
    { name: "Hot Grill Summer", desc: "Spicy chicken, jalapeños, chipotle mayo", price: "Rs. 950", image: "/burger-hot.png", hot: true },
    { name: "Premium Smash", desc: "Wagyu smash, American cheese, wakeup sauce", price: "Rs. 1,190", image: "/burger-smash.png" },
    { name: "Chicken in Buns", desc: "Crispy fried chicken, coleslaw, pickles", price: "Rs. 820", image: "/chicken-bun.png" },
    { name: "BBQ Stack", desc: "BBQ beef, crispy onions, cheddar", price: "Rs. 990", image: "/burger-classic.png" },
    { name: "Mushroom Swiss", desc: "Beef patty, sautéed mushrooms, Swiss cheese", price: "Rs. 1,050", image: "/burger-smash.png" },
  ],
  Fries: [
    { name: "Loaded Fries", desc: "Cheese sauce, jalapeños, bacon bits", price: "Rs. 490", image: "/fries-loaded.png" },
    { name: "Classic Fries", desc: "Crispy golden fries, seasoning salt", price: "Rs. 250", image: "/fries-loaded.png" },
    { name: "Chili Fries", desc: "Fries topped with chili con carne", price: "Rs. 420", image: "/fries-loaded.png", hot: true },
    { name: "Waffle Fries", desc: "Thick-cut waffle fries, dipping sauce", price: "Rs. 350", image: "/fries-loaded.png" },
  ],
  Drinks: [
    { name: "Craft Cola", desc: "House-made cola, fresh ice", price: "Rs. 180", image: "/drink-cola.png" },
    { name: "Neon Lemonade", desc: "Fresh lemon, mint, chili salt rim", price: "Rs. 250", image: "/drink-cola.png" },
    { name: "Mango Lassi", desc: "Premium Chaunsa mango, yogurt", price: "Rs. 320", image: "/drink-cola.png" },
    { name: "Midnight Shake", desc: "Oreo, vanilla bean, whipped cream", price: "Rs. 420", image: "/drink-cola.png" },
  ],
  Combos: [
    { name: "Classic Combo", desc: "Classic Burger + Fries + Drink", price: "Rs. 1,290", image: "/combo-meal.png" },
    { name: "Smash Deal", desc: "Premium Smash + Loaded Fries + Shake", price: "Rs. 1,790", image: "/combo-meal.png" },
    { name: "Family Pack", desc: "4 Burgers + 2 Loaded Fries + 4 Drinks", price: "Rs. 4,490", image: "/combo-meal.png" },
    { name: "Date Night", desc: "2 Burgers + Loaded Fries + 2 Shakes", price: "Rs. 2,990", image: "/combo-meal.png" },
  ],
};

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState("Burgers");
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.2 });

  const items = menuData[activeTab] ?? [];

  return (
    <section
      id="menu"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* BG pattern */}
      <div
        className="absolute top-0 left-0 bottom-0 w-32 checkerboard opacity-[0.03] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={titleRef} className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="red-line" />
            <span className="font-condensed text-xs tracking-[0.3em] uppercase" style={{ color: "#FF0A0A" }}>
              Full Menu
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
            WHAT'S<br />
            <span style={{ color: "#FF0A0A" }} className="neon-text-subtle">ON THE MENU</span>
          </motion.h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-10 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`menu-tab px-6 py-3 text-lg tracking-widest transition-all duration-300 ${activeTab === tab ? "active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {items.map((item, i) => (
              <motion.div
                key={`${activeTab}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group flex gap-4 p-4 transition-all duration-300 cursor-pointer"
                style={{
                  background: "#111",
                  border: "1px solid rgba(255,10,10,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,10,10,0.35)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(255,10,10,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,10,10,0.07)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div className="flex-shrink-0 overflow-hidden" style={{ width: 70, height: 70 }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4
                      className="font-condensed font-700 text-white text-sm leading-tight"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                    >
                      {item.name}
                    </h4>
                    {item.hot && <Zap size={11} fill="#FF0A0A" style={{ color: "#FF0A0A", flexShrink: 0 }} />}
                  </div>
                  <p className="font-body text-xs mb-2 line-clamp-1" style={{ color: "#666", fontFamily: "'Barlow', sans-serif" }}>
                    {item.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-condensed font-bold text-sm" style={{ color: "#FF0A0A" }}>
                      {item.price}
                    </span>
                    <button
                      className="p-1.5 transition-all duration-200 hover:bg-red-900/30"
                      style={{ border: "1px solid rgba(255,10,10,0.3)", color: "#FF0A0A" }}
                    >
                      <ShoppingCart size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
