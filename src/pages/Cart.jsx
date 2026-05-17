import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeItem, totalPrice } = useCart();

  return (
    <main style={{ flex: 1, paddingTop: "80px", backgroundColor: "#F0E4C8" }}>

      {/* Header — centered cart icon */}
      <div style={{ padding: "28px 48px 20px", borderBottom: "1px solid #C45A3A", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2C1810" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B89B95" }}>
          {items.length} item{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: "120px 48px", textAlign: "center" }}>
          <p style={{ fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 300, letterSpacing: "-0.01em", lineHeight: 1.5, color: "#B89B95", marginBottom: "48px" }}>
            Your cart is empty.<br />Go find a lamp that speaks to you.
          </p>
          <Link to="/" style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D9531E", textDecoration: "underline" }}>
            Back to Shop
          </Link>
        </div>
      ) : (
        <>
          {/* Items */}
          {items.map((item, i) => (
            <div key={item.id} style={{ padding: "48px", borderBottom: "1px solid #C45A3A", display: "flex", alignItems: "center", gap: "36px", backgroundColor: i % 2 === 0 ? "#F0E4C8" : "#F2D9C2" }}>
              <img src={item.image} alt={item.name} style={{ width: "252px", height: "auto", objectFit: "contain", filter: "drop-shadow(2px 6px 12px rgba(44,24,16,0.2))" }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 900, fontSize: "clamp(20px, 2.5vw, 32px)", letterSpacing: "-0.02em", marginBottom: "8px", color: "#2C1810" }}>{item.name}</div>
                <div style={{ fontWeight: 300, fontSize: "16px", color: "#B89B95" }}>${item.price}</div>
              </div>
              <div style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B89B95" }}>
                1 of 1
              </div>
              <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", fontSize: "11px", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", color: "#C45A3A", textDecoration: "underline" }}>
                Remove
              </button>
            </div>
          ))}

          {/* Summary — below items, right-aligned */}
          <div style={{ display: "flex", justifyContent: "flex-end", backgroundColor: "#F2D9C2", padding: "32px 48px", gap: "48px", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px", color: "#B89B95" }}>Total</div>
              <div style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.02em", color: "#2C1810" }}>${totalPrice.toFixed(2)}</div>
            </div>
            <Link
              to="/checkout"
              style={{ display: "block", textAlign: "center", backgroundColor: "#2C1810", color: "#F0E4C8", padding: "16px 40px", fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "background-color 0.15s", whiteSpace: "nowrap" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#D9531E"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#2C1810"}
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
