import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { lamps } from "../data/lamps";

const COLORS = ["#D9531E", "#8A7A4E", "#E8782C", "#F2A93B", "#C45A3A", "#B89B95", "#E8C8BC", "#D9531E", "#C45A3A", "#E8782C", "#8A7A4E", "#D9531E", "#C45A3A"];

export default function LampDetail() {
  const { id } = useParams();
  const { addItem, items } = useCart();
  const lamp = lamps.find((l) => l.id === Number(id));

  if (!lamp) return (
    <main style={{ padding: "80px 48px" }}>
      <p style={{ fontWeight: 900 }}>Not found.</p>
      <Link to="/">← Back</Link>
    </main>
  );

  const color  = COLORS[(lamp.id - 1) % COLORS.length];
  const inCart = items.some((i) => i.id === lamp.id);

  function handleAdd() {
    if (inCart) return;
    addItem(lamp);
  }

  return (
    <main style={{ flex: 1, display: "grid", gridTemplateColumns: "55fr 45fr", minHeight: "100vh" }}>

      {/* LEFT — IMAGE */}
      <div style={{ backgroundColor: color, display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 60px", position: "sticky", top: 0, height: "100vh" }}>
        <img
          src={lamp.image}
          alt={lamp.name}
          style={{ maxHeight: "75vh", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(8px 20px 40px rgba(44,24,16,0.3))" }}
        />
      </div>

      {/* RIGHT — INFO */}
      <div style={{ padding: "80px 56px 80px", display: "flex", flexDirection: "column", justifyContent: "center", overflowY: "auto", backgroundColor: "#F0E4C8" }}>

        <Link to="/" style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", color: "#B89B95", marginBottom: "48px", display: "block" }}>
          ← Back to Shop
        </Link>

        <div style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "16px", color: "#B89B95" }}>
          Strange Light
        </div>

        <h1 style={{ fontSize: "clamp(36px, 4vw, 64px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em", margin: "0 0 28px", color: "#2C1810" }}>
          {lamp.name}
        </h1>

        <div style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "32px", color: "#C45A3A" }}>
          ${lamp.price}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #C45A3A", margin: "0 0 32px" }} />

        <p style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 300, lineHeight: 1.9, color: "#5C3D2A", margin: "0 0 40px", maxWidth: "460px" }}>
          {lamp.description}
        </p>

        <div style={{ fontSize: "13px", fontWeight: 400, lineHeight: 2.4, marginBottom: "40px" }}>
          <div style={{ color: "#5C3D2A" }}><span style={{ fontWeight: 700, color: "#2C1810" }}>Materials:</span> {lamp.materials}</div>
          <div style={{ color: "#5C3D2A" }}><span style={{ fontWeight: 700, color: "#2C1810" }}>Dimensions:</span> {lamp.dimensions}</div>
          <div><span style={{ fontWeight: 700, color: "#2C1810" }}>Availability:</span>{" "}
            <span style={{ color: "#D9531E", fontWeight: 700 }}>1 of 1 — Once it's gone, it's gone.</span>
          </div>
        </div>

        <button
          onClick={handleAdd}
          style={{
            backgroundColor: inCart ? color : "#2C1810",
            color: "#F0E4C8",
            border: "none",
            padding: "22px 40px",
            fontFamily: "inherit",
            fontSize: "12px",
            fontWeight: 900,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            cursor: inCart ? "default" : "pointer",
            opacity: inCart ? 0.75 : 1,
            width: "100%",
            maxWidth: "460px",
            transition: "background-color 0.15s",
          }}
          onMouseEnter={e => { if (!inCart) e.currentTarget.style.backgroundColor = color; }}
          onMouseLeave={e => { if (!inCart) e.currentTarget.style.backgroundColor = "#2C1810"; }}
        >
          {inCart ? "In Cart — 1 of 1" : "Add to Cart"}
        </button>

      </div>
    </main>
  );
}
