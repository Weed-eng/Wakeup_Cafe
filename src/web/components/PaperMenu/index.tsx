import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Phone, ExternalLink, ShoppingCart, Plus, ChevronDown, Menu, X } from "lucide-react";

/* ── light theme palette ── */
const R   = "#cc0000";   // red
const RH  = "#ff0a0a";   // red hover / glow
const BG  = "#f5f0eb";   // warm off-white page bg
const WH  = "#ffffff";   // pure white panels
const TX  = "#111111";   // primary text
const TX2 = "#444444";   // secondary text
const MU  = "#888888";   // muted text
const DV  = "#dddddd";   // divider
const HOV = "#fff5f5";   // row hover tint
const CB1 = R;           // checker colour 1
const CB2 = "#111111";   // checker colour 2

/* ── data ── */
const MENU_DATA: Record<string, { name: string; price: number | string; desc?: string }[]> = {
  Coffee: [
    { name: "Espresso",        price: 400 },
    { name: "Cappuccino",      price: 600 },
    { name: "Americano",       price: 500 },
    { name: "Latte",           price: 600 },
    { name: "Mocha",           price: 600 },
    { name: "Macchiato",       price: 500 },
    { name: "Spanish Latte",   price: 650 },
    { name: "Hazelnut Latte",  price: 650 },
    { name: "Vanilla Latte",   price: 650 },
    { name: "Caramel Latte",   price: 650 },
  ],
  Burgers: [
    { name: "Hot Grill Summer", price: 950,  desc: "Juicy grill chicken burger w fries n sauce" },
    { name: "Chick in Buns",    price: 1050, desc: "Crispy chicken fillet, killer sauce w fries" },
    { name: "Smash Me Up",      price: 850,  desc: "Smashed premium beef patty (150g) fries n sauce" },
  ],
  Originals: [
    { name: "Mac loves cheese",       price: 1150, desc: "Mac n Cheese, Fries, Tenders & Sauces" },
    { name: "Baddie in a blanket",    price: 1200, desc: "The Loaded Burrito (trust me its good)" },
    { name: "Funghi's Beef Lasagna",  price: 1850 },
    { name: "Chicken tenders",        price: "850 / 1450", desc: "4 pcs / 8 pcs" },
  ],
  "Add Ons": [
    { name: "My girlfriend is not hungry", price: 300, desc: "We double your fries ;)" },
    { name: "Beef Patty",   price: 450 },
    { name: "Cheese Slice", price: 150 },
    { name: "Coleslaw",     price: 150 },
    { name: "Sauce",        price: 230 },
  ],
  Appetizers: [
    { name: "Just fries",           price: 450,  desc: "Fries. yeah thats it, fries" },
    { name: "Fries gone wild",      price: 1050, desc: "Loaded fries with chicken, cheese and sauces" },
    { name: "Dumb thick & stringy", price: 750,  desc: "Mozzarella sticks" },
  ],
  "Funghi's Pizza": [
    { name: "Margherita",         price: 2050 },
    { name: "Pesto Chicken",      price: 2450 },
    { name: "Truffle Mushroom",   price: 2550 },
    { name: "Turkey Pineapple",   price: 2650 },
    { name: "Beef Pepperoni",     price: 2350 },
    { name: "Chicken and Olive",  price: 2250 },
    { name: "Nutella Pizza",      price: 2350 },
  ],
  Drinks: [
    { name: "Water",                      price: 120 },
    { name: "Carbonated Drinks",          price: 180 },
    { name: "Mint Margarita",             price: 450 },
    { name: "Mojito (seasonal flavours)", price: 450 },
    { name: "Lemonade",                   price: 350 },
    { name: "Chocolate Brownie Shake",    price: 750 },
    { name: "Oreo Shake",                 price: 800 },
  ],
  Desserts: [
    { name: "Creme Brulee",                 price: 750  },
    { name: "Chocolate Brownie w icecream", price: 750  },
    { name: "Lemon Mousse",                 price: 1050 },
    { name: "Donuts",                       price: 450  },
    { name: "Fried Dough Balls w icecream", price: 1250 },
    { name: "Cheesecake Slice",             price: 700  },
  ],
};

const EVENTS = [
  { date: "FRI 18 APR", title: "Open Mic Night",   desc: "Take the stage. Poets, musicians, anyone brave enough." },
  { date: "SAT 19 APR", title: "DJ Nights",         desc: "Late-night sets. Dance on the checkerboard floor." },
  { date: "WED 23 APR", title: "Burger Build-Off",  desc: "Vote for the monthly special. Winner stays on the menu." },
  { date: "FRI 25 APR", title: "Live Jazz",         desc: "Smooth jazz, late-night fries, neon lights." },
];

/** Permalinks — previews use Instagram’s /embed iframe (real post media). */
const INSTAGRAM = [
  "https://www.instagram.com/reel/DOOSbMwAkvn/",
  "https://www.instagram.com/p/DQreEMEAoyt/",
  "https://www.instagram.com/reel/DRIESq5DVdl/",
  "https://www.instagram.com/reel/DVUT1wXgpA_/",
  "https://www.instagram.com/reel/DTOQpVgiBve/",
  "https://www.instagram.com/reel/DUsKQnJDVvT/",
] as const;

const IG_EMBED_W = 326;
const IG_EMBED_H = 540;

function instagramEmbedSrc(permalink: string): string {
  const clean = permalink.split("?")[0].replace(/\/$/, "");
  return `${clean}/embed`;
}

const CHECKER = `repeating-conic-gradient(${CB1} 0% 25%, ${CB2} 0% 50%)`;

interface CartEntry { name: string; price: number | string; qty: number; }

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = () => setMatches(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [query]);
  return matches;
}

/** True for mouse/trackpad desktops — false for most phones/tablets (touch). */
function usePrefersFinePointer(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const fn = () => setOk(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return ok;
}

/* ══════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════ */
function CustomCursor() {
  const [pos, setPos]     = useState({ x: -200, y: -200 });
  const [hov, setHov]     = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // use real coords directly — no lag, so visual cup = exact pointer position
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target as HTMLElement;
      setHov(!!el.closest("button, a, [role=button], input, select, textarea"));
    };
    const onDown = () => setClick(true);
    const onUp   = () => setClick(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // click = tilt LEFT, hover = slight right lean + scale up
  const tilt = click
    ? "rotate(-18deg) scale(0.9)"
    : hov
    ? "rotate(6deg) scale(1.12)"
    : "rotate(0deg) scale(1)";

  return (
    <>
      <style>{`
        @keyframes steamUp {
          0%   { opacity: 0.85; transform: translateY(0px)   scaleX(1);   }
          100% { opacity: 0;    transform: translateY(-12px) scaleX(0.4); }
        }
      `}</style>

      <div style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        transform: `translate(-21px, 0px) ${tilt}`,
        transformOrigin: "21px 21px",
        pointerEvents: "none",
        zIndex: 999999,
        transition: "transform 0.18s cubic-bezier(.34,1.56,.64,1)",
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
      }}>

        {/* steam wisps — absolutely positioned above cup, never affects layout */}
        {hov && (
          <svg width="42" height="18" viewBox="0 0 42 18"
            style={{ position: "absolute", bottom: "100%", left: 0, pointerEvents: "none" }}
          >
            <path d="M10 16 Q8 9 10 2"  stroke="rgba(210,210,210,0.8)" strokeWidth="1.4" strokeLinecap="round" fill="none"
              style={{ animation: "steamUp 1.0s ease-out infinite" }}/>
            <path d="M21 16 Q19 8 21 1"  stroke="rgba(210,210,210,0.65)" strokeWidth="1.4" strokeLinecap="round" fill="none"
              style={{ animation: "steamUp 1.3s ease-out infinite 0.22s" }}/>
            <path d="M32 16 Q30 9 32 2"  stroke="rgba(210,210,210,0.5)" strokeWidth="1.4" strokeLinecap="round" fill="none"
              style={{ animation: "steamUp 1.1s ease-out infinite 0.48s" }}/>
          </svg>
        )}

        {/* the provided SVG, scaled to 60px wide */}
        <svg width="42" height="42" viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
          {/* lid top */}
          <ellipse cx="210" cy="90" rx="140" ry="32" fill="#2a2a2a"/>
          {/* lid body */}
          <rect x="70" y="90" width="280" height="34" rx="14" fill="#3a3a3a"/>
          {/* sip ridge LEFT */}
          <ellipse cx="150" cy="100" rx="30" ry="10" fill="#1f1f1f"/>
          {/* sip slot LEFT */}
          <rect x="138" y="98" width="24" height="8" rx="4" fill="#0c0c0c"/>
          {/* vent hole */}
          <circle cx="190" cy="96" r="3" fill="#0c0c0c"/>
          {/* lid bottom */}
          <ellipse cx="210" cy="124" rx="140" ry="22" fill="#242424"/>
          {/* cup body */}
          <path d="M100 124L320 124L300 350Q295 380 260 380L160 380Q125 380 120 350Z" fill="#f4eadb"/>
          {/* cup shading */}
          <path d="M210 124L320 124L300 350Q295 380 260 380L210 380Z" fill="#e6dccb" opacity="0.9"/>
          {/* sticker */}
          <rect x="120" y="205" width="180" height="64" rx="16" fill="#0a0a0a"/>
          {/* wakeup logo */}
          <text
            x="210" y="242"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Cooper Black','Georgia',serif"
            fontSize="40"
            fontWeight="900"
            fill="#ff2a00"
          >wakeup</text>
          {/* shadow */}
          <ellipse cx="210" cy="395" rx="90" ry="14" fill="black" opacity="0.25"/>
        </svg>

      </div>
    </>
  );
}

/* ══════════════════════════════════════════
   ROOT
══════════════════════════════════════════ */
export default function PaperMenu() {
  const [cart, setCart]         = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addItem = (name: string, price: number | string) =>
    setCart(prev => {
      const ex = prev.find(c => c.name === name);
      return ex ? prev.map(c => c.name === name ? { ...c, qty: c.qty + 1 } : c)
                : [...prev, { name, price, qty: 1 }];
    });

  const removeItem = (name: string) =>
    setCart(prev => prev.flatMap(c =>
      c.name === name ? (c.qty > 1 ? [{ ...c, qty: c.qty - 1 }] : []) : [c]
    ));

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPKR   = cart.reduce((s, c) => s + (typeof c.price === "number" ? c.price * c.qty : 0), 0);
  const finePointer = usePrefersFinePointer();

  return (
    <div style={{
      background: BG, minHeight: "100vh", color: TX, fontFamily: "'Barlow', sans-serif",
      overflowX: "hidden", cursor: finePointer ? "none" : "auto",
    }}>
      {finePointer && <style>{`*, *::before, *::after { cursor: none !important; }`}</style>}
      {finePointer && <CustomCursor />}

      <StickyNav totalItems={totalItems} onCartOpen={() => setCartOpen(true)} />

      <FrontCover />

      {/* ── PAGE BODY ── */}
      <div style={{ width: "100%", padding: "0 clamp(20px,5vw,80px)", boxSizing: "border-box" }}>

        <Rule />
        <TwoColMenu addItem={addItem} />
        <Rule />
        <AboutSection />
        <Rule />
        <EventsSection />
        <Rule />
        <InstagramSection />
        <Rule />
        <LocationSection />
        <FinePrint />

      </div>

      <SiteFooter />

      <CartDrawer
        open={cartOpen} onClose={() => setCartOpen(false)}
        cart={cart} onAdd={addItem} onRemove={removeItem} totalPKR={totalPKR}
      />

      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setCartOpen(true)}
            style={{
              position: "fixed", bottom: 24, right: 24, zIndex: 90,
              background: R, color: "#fff", border: "none",
              width: 58, height: 58,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
              boxShadow: `0 4px 20px ${R}88`,
              cursor: finePointer ? "none" : "pointer",
              fontFamily: "'Bebas Neue',sans-serif", fontSize: 11,
            }}
          >
            <ShoppingCart size={20} />
            <span>{totalItems}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════
   STICKY NAV
══════════════════════════════════════════ */
const NAV_LINKS: [string, string][] = [["menu", "Menu"], ["events", "Events"], ["instagram", "Instagram"], ["location", "Location"]];

function StickyNav({ totalItems, onCartOpen }: { totalItems: number; onCartOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobileNav = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!isMobileNav) setMenuOpen(false);
  }, [isMobileNav]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openCart = () => {
    setMenuOpen(false);
    onCartOpen();
  };

  const navText = scrolled ? TX : "#fff";
  const cartBorder = totalItems > 0 ? R : scrolled ? "#999" : "rgba(255,255,255,0.7)";

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(0,0,0,0.55)",
      backdropFilter: "blur(10px)",
      borderBottom: scrolled ? `1px solid ${DV}` : "none",
      transition: "all 0.35s ease",
    }}>
      {scrolled && <div style={{ background: CHECKER, backgroundSize: "14px 14px", height: 6 }} />}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
        padding: "0 clamp(12px,4vw,80px)", minHeight: 50, boxSizing: "border-box",
        position: "relative", zIndex: 102,
      }}>
        <span style={{
          fontFamily: "'Bebas Neue',sans-serif",
          fontSize: isMobileNav ? 20 : 24,
          letterSpacing: "0.08em", color: navText, flexShrink: 0,
        }}>
          wakeup<span style={{ color: R }}>®</span>
        </span>

        {isMobileNav ? (
          <>
            <div style={{ flex: 1 }} />
            <button
              type="button"
              onClick={openCart}
              aria-label={totalItems > 0 ? `Open cart, ${totalItems} items` : "Open order"}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 12px",
                background: totalItems > 0 ? R : "transparent",
                border: `2px solid ${cartBorder}`,
                color: totalItems > 0 ? "#fff" : navText,
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 11,
                letterSpacing: "0.1em", cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <ShoppingCart size={14} />
              {totalItems > 0 ? <span aria-hidden>{`(${totalItems})`}</span> : null}
            </button>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 44, height: 44, marginRight: -6,
                background: "transparent", border: "none", color: navText, cursor: "pointer",
              }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </>
        ) : (
          <nav style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {NAV_LINKS.map(([id, label]) => (
              <button key={id} type="button" onClick={() => scrollTo(id)}
                className="nav-desktop-link"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Bebas Neue',sans-serif", fontSize: 13,
                  letterSpacing: "0.18em", color: navText,
                  padding: "5px 10px", position: "relative",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = R;
                  (e.currentTarget.querySelector(".nav-ul") as HTMLElement).style.transform = "scaleX(1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = navText;
                  (e.currentTarget.querySelector(".nav-ul") as HTMLElement).style.transform = "scaleX(0)";
                }}
              >
                {label}
                <span className="nav-ul" style={{
                  position: "absolute", bottom: 0, left: "10px", right: "10px",
                  height: "2px", background: R,
                  transform: "scaleX(0)", transformOrigin: "left",
                  transition: "transform 0.2s ease",
                  display: "block",
                }} />
              </button>
            ))}

            <button type="button" onClick={openCart}
              onMouseEnter={e => {
                e.currentTarget.style.background = R;
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = R;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = totalItems > 0 ? R : "transparent";
                e.currentTarget.style.color = totalItems > 0 ? "#fff" : navText;
                e.currentTarget.style.borderColor = totalItems > 0 ? R : cartBorder;
              }}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "7px 16px",
                background: totalItems > 0 ? R : "transparent",
                border: `2px solid ${totalItems > 0 ? R : cartBorder}`,
                color: totalItems > 0 ? "#fff" : navText,
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 13,
                letterSpacing: "0.12em", cursor: "pointer",
                transition: "all 0.18s ease",
              }}>
              <ShoppingCart size={13} />
              {totalItems > 0 ? `ORDER (${totalItems})` : "ORDER"}
            </button>
          </nav>
        )}
      </div>

      {isMobileNav && menuOpen && (
        <div
          style={{
            position: "fixed", top: scrolled ? 56 : 50, left: 0, right: 0, bottom: 0,
            background: "rgba(255,255,255,0.98)", zIndex: 101,
            padding: "12px clamp(12px,4vw,24px) 24px",
            paddingBottom: "max(24px, env(safe-area-inset-bottom))",
            overflowY: "auto",
            borderTop: `1px solid ${DV}`,
            boxSizing: "border-box",
          }}
        >
          {NAV_LINKS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "16px 4px", border: "none", borderBottom: `1px solid ${DV}`,
                background: "transparent", color: TX,
                fontFamily: "'Bebas Neue',sans-serif", fontSize: 18,
                letterSpacing: "0.2em", cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   NEON SIGN (CSS text animation)
══════════════════════════════════════════ */
function NeonSign() {
  const [lit, setLit] = useState(true);

  useEffect(() => {
    const cycle = () => {
      let flickers = 0;
      const max = 2 + Math.floor(Math.random() * 2);
      const tick = () => {
        setLit(false);
        setTimeout(() => {
          setLit(true);
          flickers++;
          if (flickers < max) setTimeout(tick, 70 + Math.random() * 100);
          else setTimeout(cycle, 5000 + Math.random() * 7000);
        }, 50 + Math.random() * 80);
      };
      tick();
    };
    const t = setTimeout(cycle, 3500 + Math.random() * 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <span style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(56px, 11vw, 140px)",
      letterSpacing: "0.04em",
      color: lit ? RH : "#7a2020",
      textShadow: lit
        ? `0 0 6px #fff, 0 0 14px ${RH}, 0 0 30px ${RH}, 0 0 60px ${R}`
        : "none",
      transition: "color 0.04s, text-shadow 0.04s",
      userSelect: "none",
      lineHeight: 1,
      display: "block",
    }}>
      wakeup
    </span>
  );
}

/* ══════════════════════════════════════════
   FRONT COVER
══════════════════════════════════════════ */
function FrontCover() {
  return (
    <div style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── hero image ── */}
      <img
        src="/cafe-real.png"
        alt="Wakeup Cafe"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 30%",
          zIndex: 0,
        }}
      />

      {/* dark overlay — keeps photo dark throughout */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.72) 100%)",
      }} />

      {/* spacer for fixed nav */}
      <div style={{ height: 50, position: "relative", zIndex: 2 }} />

      {/* cover content — bottom-anchored */}
      <div style={{
        position: "relative", zIndex: 2, flex: 1,
        display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 clamp(20px,5vw,80px) clamp(40px,7vh,80px)",
        gap: 16,
      }}>
        {/* neon sign text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <NeonSign />
        </motion.div>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: "clamp(14px,2vw,20px)",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.85)",
            textTransform: "uppercase",
            maxWidth: 480,
          }}
        >
          Islamabad's late-night spot · I-8 Markaz
        </motion.p>

        {/* info strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {[
            { icon: <Clock size={11} />,  text: "12PM – 12AM" },
            { icon: <MapPin size={11} />, text: "I-8 Markaz" },
            { icon: <span style={{ fontSize: 10 }}>★</span>, text: "4.8 Rating" },
          ].map(p => (
            <div key={p.text} style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "5px 14px",
              background: "rgba(0,0,0,0.45)",
              border: "1px solid rgba(255,255,255,0.2)",
              fontFamily: "'Barlow Condensed',sans-serif",
              fontSize: 12, letterSpacing: "0.12em", color: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
            }}>
              <span style={{ color: R }}>{p.icon}</span>
              {p.text}
            </div>
          ))}
        </motion.div>

        {/* dine in / takeaway pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          style={{ display: "flex", gap: 0, border: `1px solid ${DV}`, width: "fit-content", overflow: "hidden" }}
        >
          {["Dine In", "Takeaway", "Late Night"].map((t, i) => (
            <span key={t} style={{
              padding: "6px 16px",
              borderRight: i < 2 ? "1px solid rgba(255,255,255,0.2)" : "none",
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 12, letterSpacing: "0.18em", color: "rgba(255,255,255,0.75)",
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
            }}>{t}</span>
          ))}
        </motion.div>

        {/* scroll cue */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8, padding: 0, marginTop: 4,
          }}
        >
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: "0.28em", color: "rgba(255,255,255,0.55)" }}>
            SEE THE MENU
          </span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <ChevronDown size={14} style={{ color: R }} />
          </motion.div>
        </motion.button>
      </div>

      {/* bottom checker strip */}
      <div style={{ position: "relative", zIndex: 2, background: CHECKER, backgroundSize: "26px 26px", height: 26 }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   RULE
══════════════════════════════════════════ */
function Rule() {
  return (
    <div style={{ margin: "36px 0", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ flex: 1, height: 1, background: DV }} />
      <div style={{ background: CHECKER, backgroundSize: "10px 10px", width: 40, height: 10, flexShrink: 0 }} />
      <div style={{ flex: 1, height: 1, background: DV }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   TWO-COL MENU
══════════════════════════════════════════ */
function TwoColMenu({ addItem }: { addItem: (n: string, p: number | string) => void }) {
  const left  = ["Coffee", "Burgers", "Originals", "Add Ons"];
  const right = ["Appetizers", "Funghi's Pizza", "Drinks", "Desserts"];
  const stack = useMediaQuery("(max-width: 700px)");

  return (
    <div id="menu" style={{ scrollMarginTop: 80 }}>
      <p style={{ fontSize: 12, color: MU, fontStyle: "italic", marginBottom: 24 }}>
        let the servers know for any kind of allergy · current GST rate will be applied
      </p>
      {stack ? (
        <div style={{ width: "100%", minWidth: 0 }}>
          {left.map(c => <MenuCat key={c} name={c} items={MENU_DATA[c]} addItem={addItem} />)}
          {right.map(c => <MenuCat key={c} name={c} items={MENU_DATA[c]} addItem={addItem} />)}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: "0 clamp(24px,4vw,56px)", alignItems: "start" }}>
          <div>{left.map(c => <MenuCat key={c} name={c} items={MENU_DATA[c]} addItem={addItem} />)}</div>
          <div style={{ background: DV, alignSelf: "stretch" }} />
          <div>{right.map(c => <MenuCat key={c} name={c} items={MENU_DATA[c]} addItem={addItem} />)}</div>
        </div>
      )}
    </div>
  );
}

function MenuCat({ name, items, addItem }: {
  name: string;
  items: { name: string; price: number | string; desc?: string }[];
  addItem: (n: string, p: number | string) => void;
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{
        fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
        fontSize: "clamp(18px,2.5vw,26px)", color: TX,
        marginBottom: 10, letterSpacing: "0.01em",
        borderBottom: `1.5px solid ${TX}`, paddingBottom: 5,
      }}>
        {name}
      </h2>
      {items.map(item => <MenuRow key={item.name} item={item} addItem={addItem} />)}
    </div>
  );
}

function MenuRow({ item, addItem }: {
  item: { name: string; price: number | string; desc?: string };
  addItem: (n: string, p: number | string) => void;
}) {
  const [hov, setHov]     = useState(false);
  const [added, setAdded] = useState(false);

  const handle = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item.name, item.price);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8,
        padding: "4px 6px", marginBottom: 2,
        background: hov ? HOV : "transparent",
        borderLeft: `2px solid ${hov ? R : "transparent"}`,
        transition: "background 0.15s, border-color 0.15s",
        cursor: "default",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          fontFamily: "'Barlow Condensed',sans-serif",
          fontSize: "clamp(13px,1.6vw,16px)", fontWeight: 600, color: TX,
        }}>
          {item.name}
        </span>
        {item.desc && (
          <p style={{ fontSize: "clamp(10px,1vw,12px)", color: MU, margin: "1px 0 0", lineHeight: 1.3 }}>
            {item.desc}
          </p>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={{ color: "#ccc", fontSize: 10, letterSpacing: "0.2em", userSelect: "none" }}>· · · · ·</span>
        <span style={{
          fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600,
          fontSize: "clamp(12px,1.5vw,15px)", color: hov ? R : TX,
          minWidth: 44, textAlign: "right", transition: "color 0.15s",
        }}>
          {typeof item.price === "number" ? item.price.toLocaleString() : item.price}
        </span>

        <AnimatePresence>
          {hov && (
            <motion.button key="btn"
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.12 }}
              onClick={handle}
              data-cursor="ADD"
              style={{
                width: 20, height: 20,
                background: added ? "#22c55e" : R,
                border: "none", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0, transition: "background 0.2s",
              }}
            >
              {added ? "✓" : <Plus size={11} />}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ABOUT
══════════════════════════════════════════ */
function AboutSection() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 40, alignItems: "center" }}>
      <div>
        <SectionHeading>About the place</SectionHeading>
        <p style={{ fontSize: "clamp(13px,1.4vw,15px)", lineHeight: 1.75, color: TX2, marginBottom: 12 }}>
          Wakeup Cafe is Islamabad's go-to late-night spot. Bold flavors, neon vibes, and a space built for good food and even better company.
        </p>
        <p style={{ fontSize: "clamp(13px,1.4vw,15px)", lineHeight: 1.75, color: MU, marginBottom: 24 }}>
          Started in 2021 in I-8 Markaz, we've become the neighbourhood's after-dark institution — whether you're ending your night or just getting started.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["Dine In", "Takeaway", "Late Night", "4.8 ★"].map(t => (
            <span key={t} style={{
              padding: "4px 12px", border: `1px solid ${DV}`,
              fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600,
              fontSize: 12, letterSpacing: "0.12em", color: MU,
            }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <img src="/about.jpg" alt="Wakeup Cafe interior" style={{
          width: "100%", aspectRatio: "4/3", objectFit: "cover",
          objectPosition: "center 30%", display: "block",
          border: `1px solid ${DV}`,
        }} />
        <div style={{
          position: "absolute", bottom: -8, right: -8,
          background: CHECKER, backgroundSize: "10px 10px",
          width: 40, height: 40, zIndex: -1,
        }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   EVENTS
══════════════════════════════════════════ */
function EventsSection() {
  return (
    <div id="events" style={{ scrollMarginTop: 80 }}>
      <SectionHeading>What's on</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: 12, width: "100%", minWidth: 0 }}>
        {EVENTS.map(ev => (
          <div key={ev.title} style={{
            background: WH, border: `1px solid ${DV}`,
            padding: "14px 16px 14px 20px",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: R }} />
            <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: "0.25em", color: R, marginBottom: 4 }}>{ev.date}</p>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 5, lineHeight: 1.1, color: TX }}>{ev.title}</p>
            <p style={{ fontSize: 12, color: MU, lineHeight: 1.5 }}>{ev.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   INSTAGRAM
══════════════════════════════════════════ */
function InstagramSection() {
  const narrow = useMediaQuery("(max-width: 640px)");
  const single = useMediaQuery("(max-width: 400px)");
  const gridCols = single ? "minmax(0,1fr)" : narrow ? "repeat(2, minmax(0,1fr))" : "repeat(3, minmax(0,1fr))";
  return (
    <div id="instagram" style={{ scrollMarginTop: 80, width: "100%", minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <SectionHeading>@wakeupcafe</SectionHeading>
        <a href="https://www.instagram.com/wakeupcafe/" target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: 6,
          fontFamily: "'Bebas Neue',sans-serif", fontSize: 12, letterSpacing: "0.18em",
          color: R, textDecoration: "none",
        }}>
          VIEW ALL <ExternalLink size={11} />
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 4, width: "100%", minWidth: 0 }}>
        {INSTAGRAM.map((href) => (
          <InstaCell key={href} href={href} />
        ))}
      </div>
    </div>
  );
}

function InstaCell({ href }: { href: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cellW, setCellW] = useState(280);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w && w > 0) setCellW(w);
    });
    ro.observe(el);
    setCellW(el.offsetWidth || 280);
    return () => ro.disconnect();
  }, []);

  const scale = cellW / IG_EMBED_W;
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1",
        overflow: "hidden",
        background: "#0a0a0a",
        boxShadow: hov ? `inset 0 0 0 2px ${R}` : "none",
        transition: "box-shadow 0.2s",
      }}
    >
      <iframe
        title="Instagram post"
        src={instagramEmbedSrc(href)}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: IG_EMBED_W,
          height: IG_EMBED_H,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
          border: 0,
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════
   LOCATION
══════════════════════════════════════════ */
function LocationSection() {
  const narrow = useMediaQuery("(max-width: 640px)");
  return (
    <div id="location" style={{ scrollMarginTop: 80, width: "100%", minWidth: 0, boxSizing: "border-box" }}>
      <SectionHeading>Find us</SectionHeading>
      <div style={{
        display: "grid",
        gridTemplateColumns: narrow ? "minmax(0, 1fr)" : "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
        gap: 28,
        alignItems: "start",
        width: "100%",
        minWidth: 0,
      }}>
        <div style={{
          border: `1px solid ${DV}`, overflow: "hidden", height: narrow ? 220 : 280,
          minWidth: 0, width: "100%", maxWidth: "100%", boxSizing: "border-box",
        }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.9063095!2d73.0844!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95b5e0c2e9e9%3A0x0!2sI-8+Markaz%2C+Islamabad!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
            width="100%" height="100%" style={{ border: 0, display: "block", maxWidth: "100%" }}
            allowFullScreen loading="lazy" title="Wakeup Cafe"
          />
        </div>
        <div style={{ minWidth: 0, width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
          {[
            { Icon: MapPin, label: "Address", val: "I-8 Markaz, Islamabad, Capital Territory" },
            { Icon: Clock,  label: "Hours",   val: "12 PM – 12 AM daily · Fri–Sat until 2 AM" },
            { Icon: Phone,  label: "Phone",   val: "+92 300 000 0000" },
          ].map(({ Icon, label, val }) => (
            <div key={label} style={{ display: "flex", gap: 12, marginBottom: 18, minWidth: 0 }}>
              <Icon size={14} style={{ color: R, marginTop: 2, flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 2, color: MU }}>{label}</p>
                <p style={{ fontSize: 13, color: TX2, wordBreak: "break-word" }}>{val}</p>
              </div>
            </div>
          ))}
          <a href="https://maps.google.com/?q=I-8+Markaz+Islamabad" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "12px 18px", background: R, color: "#fff",
            fontFamily: "'Bebas Neue',sans-serif", fontSize: narrow ? 12 : 14,
            letterSpacing: "0.12em", textDecoration: "none",
            width: narrow ? "100%" : "inline-flex", maxWidth: "100%", boxSizing: "border-box",
          }}>
            GET DIRECTIONS →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SHARED
══════════════════════════════════════════ */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700,
      fontSize: "clamp(20px,2.8vw,28px)", color: TX, marginBottom: 16,
    }}>
      {children}
    </h2>
  );
}

function FinePrint() {
  return (
    <div style={{ marginTop: 48, paddingTop: 16, borderTop: `1px solid ${DV}` }}>
      <p style={{ fontSize: 11, color: "#bbb", fontStyle: "italic", lineHeight: 1.8 }}>
        let the servers know for any kind of allergy · current GST rate will be applied · prices in PKR · menu subject to change · © 2025 Wakeup Cafe
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function SiteFooter() {
  return (
    <>
      <div style={{ background: CHECKER, backgroundSize: "26px 26px", height: 26, marginTop: 56 }} />
      <div style={{
        background: TX, padding: "16px clamp(20px,5vw,80px)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: WH, letterSpacing: "0.06em" }}>
          wakeup<span style={{ color: R }}>®</span>
        </span>
        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase" }}>
          I-8 Markaz, Islamabad · built for the night owls
        </span>
      </div>
      <div style={{ background: CHECKER, backgroundSize: "26px 26px", height: 26 }} />
    </>
  );
}

/* ══════════════════════════════════════════
   CART DRAWER
══════════════════════════════════════════ */
function CartDrawer({ open, onClose, cart, onAdd, onRemove, totalPKR }: {
  open: boolean; onClose: () => void; cart: CartEntry[];
  onAdd: (n: string, p: number | string) => void;
  onRemove: (n: string) => void; totalPKR: number;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(3px)" }}
          />
          <motion.aside key="dr"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 201,
              width: "clamp(280px,85vw,420px)",
              background: WH, borderLeft: `2px solid ${R}`,
              boxShadow: "-4px 0 30px rgba(0,0,0,0.12)",
              display: "flex", flexDirection: "column", overflow: "hidden",
            }}
          >
            <div style={{ background: CHECKER, backgroundSize: "18px 18px", height: 18, flexShrink: 0 }} />

            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${DV}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 22, color: TX }}>Your Order</h3>
              <button onClick={onClose}
                onMouseEnter={e => {
                  e.currentTarget.style.background = R;
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.borderColor = R;
                  e.currentTarget.style.transform = "rotate(90deg)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = MU;
                  e.currentTarget.style.borderColor = DV;
                  e.currentTarget.style.transform = "rotate(0deg)";
                }}
                style={{
                  background: "transparent", border: `1.5px solid ${DV}`,
                  cursor: "pointer", color: MU, fontSize: 14,
                  width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.18s ease",
                }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "12px 20px" }}>
              {cart.length === 0
                ? <p style={{ color: MU, fontSize: 13, marginTop: 48, textAlign: "center" }}>Nothing added yet.<br />Hover an item and tap +</p>
                : cart.map(item => (
                  <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${DV}` }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 15, color: TX }}>{item.name}</p>
                      <p style={{ fontSize: 12, color: R }}>PKR {typeof item.price === "number" ? item.price.toLocaleString() : item.price}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => onRemove(item.name)} style={{ width: 26, height: 26, background: "#f0f0f0", border: `1px solid ${DV}`, color: TX, cursor: "pointer", fontSize: 15 }}>−</button>
                      <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 17, minWidth: 18, textAlign: "center", color: TX }}>{item.qty}</span>
                      <button onClick={() => onAdd(item.name, item.price)} style={{ width: 26, height: 26, background: R, border: "none", color: "#fff", cursor: "pointer", fontSize: 15 }}>+</button>
                    </div>
                  </div>
                ))
              }
            </div>

            {cart.length > 0 && (
              <div style={{ padding: "16px 20px", borderTop: `1px solid ${DV}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.1em", color: MU }}>TOTAL</span>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 20, color: R }}>PKR {totalPKR.toLocaleString()}</span>
                </div>
                <button style={{ width: "100%", padding: "14px", background: R, color: "#fff", border: "none", fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: "0.15em", cursor: "pointer" }}>
                  PLACE ORDER →
                </button>
              </div>
            )}

            <div style={{ background: CHECKER, backgroundSize: "18px 18px", height: 18, flexShrink: 0 }} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
