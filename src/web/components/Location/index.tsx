import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Phone, Navigation, ExternalLink } from "lucide-react";

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="location"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Checkerboard accent */}
      <div className="absolute bottom-0 left-0 right-0 checkerboard h-px opacity-20" />

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
              Find Us
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
            WE'RE IN<br />
            <span style={{ color: "#FF0A0A" }} className="neon-text-subtle">ISLAMABAD</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative overflow-hidden"
            style={{
              border: "1px solid rgba(255,10,10,0.2)",
              boxShadow: "0 0 40px rgba(255,10,10,0.05)",
              height: 380,
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.9063095!2d73.0844!3d33.6844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95b5e0c2e9e9%3A0x0!2sI-8+Markaz%2C+Islamabad%2C+Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.4) brightness(0.8)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wakeup Cafe Location"
            />
            {/* Overlay pin */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 60%, rgba(10,10,10,0.4))",
              }}
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
            className="flex flex-col justify-center gap-6"
          >
            {/* Address */}
            <div
              className="flex gap-4 p-5"
              style={{ background: "#111", border: "1px solid rgba(255,10,10,0.1)" }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
                style={{ background: "rgba(255,10,10,0.1)", border: "1px solid rgba(255,10,10,0.3)" }}
              >
                <MapPin size={18} style={{ color: "#FF0A0A" }} />
              </div>
              <div>
                <p className="font-condensed font-bold text-white text-sm tracking-wider mb-1">ADDRESS</p>
                <p className="font-body text-sm" style={{ color: "#888", fontFamily: "'Barlow', sans-serif" }}>
                  I-8 Markaz, Islamabad<br />
                  Capital Territory, Pakistan
                </p>
              </div>
            </div>

            {/* Hours */}
            <div
              className="flex gap-4 p-5"
              style={{ background: "#111", border: "1px solid rgba(255,10,10,0.1)" }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
                style={{ background: "rgba(255,10,10,0.1)", border: "1px solid rgba(255,10,10,0.3)" }}
              >
                <Clock size={18} style={{ color: "#FF0A0A" }} />
              </div>
              <div>
                <p className="font-condensed font-bold text-white text-sm tracking-wider mb-1">OPENING HOURS</p>
                <div className="space-y-1">
                  {[
                    { day: "Mon – Thu", time: "12 PM – 12 AM" },
                    { day: "Fri – Sat", time: "12 PM – 2 AM" },
                    { day: "Sunday", time: "1 PM – 12 AM" },
                  ].map(h => (
                    <div key={h.day} className="flex gap-3 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      <span style={{ color: "#666", minWidth: 80 }}>{h.day}</span>
                      <span style={{ color: "#E8E8E8" }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div
              className="flex gap-4 p-5"
              style={{ background: "#111", border: "1px solid rgba(255,10,10,0.1)" }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
                style={{ background: "rgba(255,10,10,0.1)", border: "1px solid rgba(255,10,10,0.3)" }}
              >
                <Phone size={18} style={{ color: "#FF0A0A" }} />
              </div>
              <div>
                <p className="font-condensed font-bold text-white text-sm tracking-wider mb-1">CALL US</p>
                <a
                  href="tel:+92300000000"
                  className="font-body text-sm hover:text-[#FF0A0A] transition-colors"
                  style={{ color: "#888", fontFamily: "'Barlow', sans-serif" }}
                >
                  +92 300 000 0000
                </a>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap">
              <a
                href="https://maps.google.com/?q=I-8+Markaz+Islamabad"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-btn px-6 py-3 text-sm tracking-widest flex items-center gap-2"
              >
                <Navigation size={16} />
                Get Directions
              </a>
              <a
                href="tel:+92300000000"
                className="neon-btn-outline px-6 py-3 text-sm tracking-widest flex items-center gap-2"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
