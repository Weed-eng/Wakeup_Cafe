import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";

const featured = [
  {
    id: 1,
    name: "Wakeup Classic",
    desc: "Double beef patty, caramelized onions, secret sauce, toasted brioche bun.",
    price: "Rs. 890",
    image: "/burger-classic.png",
    badge: "BESTSELLER",
  },
  {
    id: 2,
    name: "Hot Grill Summer",
    desc: "Spicy chicken fillet, jalapeños, chipotle mayo, crispy slaw.",
    price: "Rs. 950",
    image: "/burger-hot.png",
    badge: "SPICY",
  },
  {
    id: 3,
    name: "Premium Smash",
    desc: "Two smashed wagyu patties, American cheese, special wakeup sauce.",
    price: "Rs. 1,190",
    image: "/burger-smash.png",
    badge: "PREMIUM",
  },
  {
    id: 4,
    name: "Loaded Fries",
    desc: "Crispy fries, cheese sauce, jalapeños, bacon bits, sour cream.",
    price: "Rs. 490",
    image: "/fries-loaded.png",
    badge: "FAN FAVE",
  },
  {
    id: 5,
    name: "Chicken in Buns",
    desc: "Crispy fried chicken, coleslaw, pickles, honey mustard.",
    price: "Rs. 820",
    image: "/chicken-bun.png",
    badge: "CRISPY",
  },
];

function FoodCard({ item, index }: { item: typeof featured[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: index * 0.1 }}
      className="food-card group cursor-pointer"
      style={{
        background: "#111",
        border: "1px solid rgba(255,10,10,0.08)",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))" }}
        />
        {/* Badge */}
        <div
          className="absolute top-3 left-3 px-2 py-1 font-condensed text-xs tracking-widest"
          style={{ background: "#FF0A0A", color: "white" }}
        >
          {item.badge}
        </div>
        {/* Stars */}
        <div className="absolute top-3 right-3 flex gap-0.5">
          {[1,2,3,4,5].map(s => <Star key={s} size={10} className="star" fill="#FF0A0A" />)}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="font-display text-white text-xl leading-tight"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
          >
            {item.name}
          </h3>
          <span
            className="font-condensed font-bold text-base ml-3 whitespace-nowrap"
            style={{ color: "#FF0A0A" }}
          >
            {item.price}
          </span>
        </div>
        <p className="font-body text-sm mb-5" style={{ color: "#888", fontFamily: "'Barlow', sans-serif" }}>
          {item.desc}
        </p>
        <button
          className="w-full neon-btn py-3 text-sm tracking-[0.15em] flex items-center justify-center gap-2"
        >
          <ShoppingCart size={15} />
          Order Now
        </button>
      </div>
    </motion.div>
  );
}

export default function FeaturedItems() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });

  return (
    <section
      id="featured"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Checkerboard strip */}
      <div className="absolute top-0 left-0 right-0 checkerboard h-px opacity-30" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <div ref={titleRef} className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="red-line" />
            <span className="font-condensed text-xs tracking-[0.3em] uppercase" style={{ color: "#FF0A0A" }}>
              Fan Favorites
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
            FEATURED<br />
            <span style={{ color: "#FF0A0A" }} className="neon-text-subtle">MENU ITEMS</span>
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {featured.map((item, i) => (
            <FoodCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
