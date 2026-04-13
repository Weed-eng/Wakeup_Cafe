import { motion } from "framer-motion";
import { Camera, Globe, Send, Play, MapPin, Clock, Phone, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Location", href: "#location" },
  { label: "Order Now", href: "#order" },
];

const social = [
  { Icon: Camera, href: "https://instagram.com", label: "Instagram" },
  { Icon: Globe, href: "https://facebook.com", label: "Facebook" },
  { Icon: Send, href: "https://twitter.com", label: "Twitter" },
  { Icon: Play, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#000",
        borderTop: "1px solid rgba(255,10,10,0.15)",
        boxShadow: "0 -20px 60px rgba(255,10,10,0.04)",
      }}
    >
      {/* Top red glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #FF0A0A 30%, #FF0A0A 70%, transparent)", boxShadow: "0 0 15px #FF0A0A" }}
      />

      {/* Checkerboard strip */}
      <div className="checkerboard-sm h-3 w-full opacity-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="Wakeup Cafe"
                className="h-10 w-10 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <span
                className="text-white text-2xl"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em" }}
              >
                WAKEUP<span style={{ color: "#FF0A0A" }}>.</span>
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: "#666", fontFamily: "'Barlow', sans-serif" }}>
              Islamabad's premier late-night burger spot. Bold flavors, neon vibes. I-8 Markaz.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {social.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center transition-all duration-300 hover:bg-red-900/30"
                  style={{
                    border: "1px solid rgba(255,10,10,0.2)",
                    color: "#888",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#FF0A0A";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,10,10,0.6)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 12px rgba(255,10,10,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#888";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,10,10,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="font-display text-white text-sm tracking-[0.2em] mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              NAVIGATE
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-sm transition-colors duration-200 hover:text-[#FF0A0A] text-left"
                    style={{ color: "#666", fontFamily: "'Barlow', sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="font-display text-white text-sm tracking-[0.2em] mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              HOURS
            </h4>
            <div className="space-y-2">
              {[
                { day: "Monday – Thursday", time: "12 PM – 12 AM" },
                { day: "Friday – Saturday", time: "12 PM – 2 AM" },
                { day: "Sunday", time: "1 PM – 12 AM" },
              ].map((h) => (
                <div key={h.day} className="font-body text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  <span style={{ color: "#555" }}>{h.day}</span>
                  <br />
                  <span style={{ color: "#E8E8E8" }}>{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-display text-white text-sm tracking-[0.2em] mb-5"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              CONTACT
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <MapPin size={14} style={{ color: "#FF0A0A", marginTop: 2, flexShrink: 0 }} />
                <span className="font-body text-sm" style={{ color: "#666", fontFamily: "'Barlow', sans-serif" }}>
                  I-8 Markaz, Islamabad<br />Capital Territory
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={14} style={{ color: "#FF0A0A", flexShrink: 0 }} />
                <a href="tel:+92300000000" className="font-body text-sm hover:text-[#FF0A0A] transition-colors" style={{ color: "#666", fontFamily: "'Barlow', sans-serif" }}>
                  +92 300 000 0000
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Clock size={14} style={{ color: "#FF0A0A", flexShrink: 0 }} />
                <span className="font-body text-sm" style={{ color: "#666", fontFamily: "'Barlow', sans-serif" }}>
                  Open daily 12PM – 12AM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="font-body text-xs"
            style={{ color: "#444", fontFamily: "'Barlow', sans-serif" }}
          >
            © 2024 Wakeup Cafe. All rights reserved. Islamabad, Pakistan.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-condensed text-xs tracking-widest" style={{ color: "#444" }}>
              BUILT FOR THE NIGHT OWLS
            </span>
            {/* Back to top */}
            <button
              onClick={() => scrollTo("#hero")}
              className="w-8 h-8 flex items-center justify-center transition-all duration-300 hover:bg-red-900/30"
              style={{
                border: "1px solid rgba(255,10,10,0.3)",
                color: "#FF0A0A",
              }}
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
