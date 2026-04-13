import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { CartItem } from "./index";
import { MenuItem } from "./data";

interface Props {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (id: number) => void;
  onClear: () => void;
  totalPrice: number;
}

export default function CartDrawer({ open, onClose, cart, onAdd, onRemove, onClear, totalPrice }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 200,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 201,
              width: "clamp(300px,90vw,480px)",
              background: "#0a0a0a",
              borderLeft: "1px solid rgba(255,10,10,0.2)",
              boxShadow: "-20px 0 60px rgba(255,10,10,0.08)",
              display: "flex", flexDirection: "column",
              overflowY: "auto",
            }}
          >
            {/* Top red bar */}
            <div style={{ height: 3, background: "#FF0A0A", boxShadow: "0 0 12px #FF0A0A" }} />

            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "20px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: "#fff", letterSpacing: "0.08em" }}>
                  YOUR ORDER
                </h2>
                {cart.length > 0 && (
                  <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "#555", marginTop: 2 }}>
                    {cart.reduce((s, c) => s + c.qty, 0)} items · Wakeup Cafe, I-8 Markaz
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                style={{ color: "#555", background: "none", border: "none", cursor: "pointer", padding: 4 }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", paddingTop: 80 }}>
                  <ShoppingBag size={40} style={{ color: "#222", margin: "0 auto 16px" }} />
                  <p style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "#333", letterSpacing: "0.1em" }}>
                    NOTHING HERE YET
                  </p>
                  <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, color: "#444", marginTop: 8 }}>
                    Scroll the menu and tap to expand an item.
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {cart.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "14px 16px",
                        background: "#111",
                        border: "1px solid rgba(255,10,10,0.08)",
                      }}
                    >
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 52, height: 52, objectFit: "cover", flexShrink: 0 }}
                      />
                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontFamily: "'Bebas Neue',sans-serif",
                          fontSize: 17, color: "#e8e8e8",
                          letterSpacing: "0.05em",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          {item.name}
                        </p>
                        <p style={{ fontFamily: "'Barlow',sans-serif", fontSize: 13, color: "#FF0A0A", marginTop: 2 }}>
                          {item.price}
                        </p>
                      </div>
                      {/* Qty controls */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <button
                          onClick={() => onRemove(item.id)}
                          style={{
                            width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                            background: "none", border: "1px solid #333", color: "#888", cursor: "pointer",
                          }}
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: "#fff", minWidth: 20, textAlign: "center" }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => onAdd(item)}
                          style={{
                            width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                            background: "#FF0A0A", border: "none", color: "#fff", cursor: "pointer",
                          }}
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div style={{
                borderTop: "1px solid rgba(255,255,255,0.05)",
                padding: "20px 24px",
                display: "flex", flexDirection: "column", gap: 14,
              }}>
                {/* Total */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "'Barlow',sans-serif", fontSize: 14, color: "#555", letterSpacing: "0.1em" }}>
                    TOTAL
                  </span>
                  <span style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 28, color: "#FF0A0A",
                    letterSpacing: "0.05em",
                    textShadow: "0 0 12px rgba(255,10,10,0.4)",
                  }}>
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Place order CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "16px 24px",
                    background: "#FF0A0A",
                    color: "#fff",
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 20,
                    letterSpacing: "0.15em",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 0 30px rgba(255,10,10,0.4)",
                  }}
                >
                  PLACE ORDER →
                </motion.button>

                {/* Clear */}
                <button
                  onClick={onClear}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "10px",
                    background: "none",
                    border: "1px solid #222",
                    color: "#444",
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 14,
                    letterSpacing: "0.15em",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={13} />
                  CLEAR ORDER
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
