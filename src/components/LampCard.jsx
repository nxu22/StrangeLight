import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const PANELS = [
  { bg: "#FF0000", fg: "#ffffff" },
  { bg: "#000000", fg: "#ffffff" },
  { bg: "#0057FF", fg: "#ffffff" },
  { bg: "#FF6B00", fg: "#000000" },
];

export default function LampCard({ lamp, index = 0 }) {
  const { addItem } = useCart();
  const panel = PANELS[index % PANELS.length];
  const flipped = index % 2 !== 0;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #000" }}>

      {/* IMAGE SIDE */}
      <div style={{ order: flipped ? 2 : 1, backgroundColor: panel.bg, minHeight: "520px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(80px, 12vw, 180px)", cursor: "pointer" }}>
        <Link to={`/lamp/${lamp.id}`} style={{ textDecoration: "none" }}>🪔</Link>
      </div>

      {/* TEXT SIDE */}
      <div style={{ order: flipped ? 1 : 2, backgroundColor: "#ffffff", padding: "clamp(40px, 6vw, 80px) clamp(32px, 5vw, 64px)", display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: flipped ? "none" : "1px solid #000", borderRight: flipped ? "1px solid #000" : "none" }}>
        <div>
          <div style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "24px", opacity: 0.4 }}>
            No. {String(index + 1).padStart(2, "0")}
          </div>
          <Link to={`/lamp/${lamp.id}`} style={{ textDecoration: "none", color: "#000" }}>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", margin: "0 0 24px 0" }}>
              {lamp.name}
            </h2>
          </Link>
          <p style={{ fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 300, lineHeight: 1.8, color: "#333", maxWidth: "380px", margin: "0 0 32px 0" }}>
            {lamp.description}
          </p>
          <div style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5, lineHeight: 2 }}>
            <div>{lamp.materials}</div>
            <div>{lamp.dimensions}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "40px", paddingTop: "24px", borderTop: "1px solid #000" }}>
          <span style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 900, letterSpacing: "-0.02em" }}>${lamp.price}</span>
          <button
            onClick={() => addItem(lamp)}
            style={{ backgroundColor: "#000", color: "#fff", border: "none", padding: "14px 28px", fontFamily: "inherit", fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = panel.bg; e.currentTarget.style.color = panel.fg; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#000"; e.currentTarget.style.color = "#fff"; }}
          >
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
}
