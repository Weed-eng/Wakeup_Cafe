import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, Heart, MessageCircle, ArrowUpRight } from "lucide-react";

const posts = [
  { image: "/social-1.png", likes: "2.4K", comments: "186" },
  { image: "/social-2.png", likes: "3.1K", comments: "247" },
  { image: "/social-3.png", likes: "1.8K", comments: "134" },
  { image: "/social-4.png", likes: "4.2K", comments: "312" },
  { image: "/social-5.png", likes: "2.9K", comments: "203" },
  { image: "/social-6.png", likes: "1.6K", comments: "98" },
];

export default function SocialSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Top checker */}
      <div className="checkerboard-sm h-px w-full opacity-20 absolute top-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="red-line" />
              <span className="font-condensed text-xs tracking-[0.3em] uppercase" style={{ color: "#FF0A0A" }}>
                @wakeupcafeislamabad
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
              WAKEUP<br />
              <span style={{ color: "#FF0A0A" }} className="neon-text-subtle">MOMENTS</span>
            </motion.h2>
          </div>

          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="neon-btn-outline px-6 py-3 text-base tracking-widest flex items-center gap-2 self-start md:self-auto"
            whileHover={{ scale: 1.03 }}
          >
            <Camera size={18} />
            View Instagram
            <ArrowUpRight size={16} />
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="social-cell cursor-pointer"
              style={{ aspectRatio: "1", position: "relative", overflow: "hidden" }}
            >
              <img
                src={post.image}
                alt={`Wakeup Cafe post ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="social-cell-overlay">
                <div className="flex flex-col items-center gap-4">
                  <Camera size={28} style={{ color: "white" }} />
                  <div className="flex items-center gap-5 text-white text-sm font-condensed">
                    <span className="flex items-center gap-1">
                      <Heart size={14} fill="white" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
              {/* Hover border */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ border: "2px solid rgba(255,10,10,0.6)", boxShadow: "inset 0 0 20px rgba(255,10,10,0.15)" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Follow pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-10"
        >
          <div
            className="flex items-center gap-3 px-6 py-3 font-condensed text-sm tracking-widest"
            style={{
              border: "1px solid rgba(255,10,10,0.2)",
              color: "#888",
            }}
          >
            <Camera size={16} style={{ color: "#FF0A0A" }} />
            Follow us for daily food porn
            <span style={{ color: "#FF0A0A" }}>@wakeupcafe</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
