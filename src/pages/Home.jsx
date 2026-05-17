import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { lamps } from "../data/lamps";

const ROTATIONS     = [-6, 4, -3, 5, 7, -5, 3, -4, 6, -2, 5, -5, 4];
const DURATIONS     = [2.6, 3.1, 2.3, 3.8, 2.9, 3.4, 2.1, 3.6, 2.7, 3.2, 2.4, 3.9, 2.8];
const BANNER_COLORS = ["#D9531E", "#8A7A4E", "#C45A3A", "#E8782C", "#B89B95", "#5C3D2A"];
const BANNER_FG     = { "#D9531E": "#F0E4C8", "#8A7A4E": "#F0E4C8", "#C45A3A": "#F0E4C8", "#E8782C": "#2C1810", "#B89B95": "#2C1810", "#5C3D2A": "#F0E4C8" };

export default function Home() {
  const [searchParams] = useSearchParams();
  const activeQuery = searchParams.get("search") || "";

  const logoRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isResting = tilt.x === 0 && tilt.y === 0;

  function handleLogoMove(e) {
    const el = logoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setTilt({ x: -dy * 10, y: dx * 10 });
  }

  function handleLogoLeave() {
    setTilt({ x: 0, y: 0 });
  }

  const filtered = activeQuery.trim() === ""
    ? lamps
    : lamps.filter((l) =>
        l.animals.some((a) => a.toLowerCase().includes(activeQuery.trim().toLowerCase()))
      );

  return (
    <main style={{ flex: 1 }}>

      {/* HERO */}
      <section style={{ minHeight: "34vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "59px 48px 90px", textAlign: "center", position: "relative", borderBottom: "1px solid #C45A3A" }}>
        <p style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "48px", color: "#8A7A4E" }}>
          Est. 2024 &nbsp;/&nbsp; Handmade Lamps &nbsp;/&nbsp; No Two Alike
        </p>
        <h1
          ref={logoRef}
          onMouseMove={handleLogoMove}
          onMouseLeave={handleLogoLeave}
          style={{
            fontSize: "clamp(28px, 5vw, 80px)", fontWeight: 900, lineHeight: 0.82, letterSpacing: "-0.05em", margin: 0, border: "2px solid #2C1810", padding: "24px 40px", color: "#2C1810",
            transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: isResting ? "transform 0.6s ease" : "transform 0.08s ease",
            cursor: "default",
            willChange: "transform",
          }}
        >
          STRANGE<br />LIGHT
        </h1>
        <p style={{ fontSize: "clamp(15px, 1.6vw, 20px)", fontWeight: 300, letterSpacing: "0.05em", marginTop: "56px", maxWidth: "440px", lineHeight: 1.7, color: "#8A7A4E" }}>
          Objects for rooms that refuse to be ordinary.<br />Several are a little odd. That is the point.
        </p>

        <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B89B95", fontWeight: 400 }}>
          Scroll
        </div>
      </section>

      {/* COLLAGE DISPLAY */}
      <div style={{ backgroundColor: "#E8782C", borderBottom: "1px solid #C45A3A", padding: "100px 80px 100px", position: "relative", overflow: "hidden" }}>

        {/* Corner label top-left */}
        <div style={{ position: "absolute", top: "36px", left: "36px", zIndex: 20, transform: "rotate(-3deg)" }}>
          <div style={{ backgroundColor: "#D9531E", color: "#F0E4C8", padding: "7px 16px", fontWeight: 900, fontSize: "13px", letterSpacing: "0.18em", textTransform: "uppercase" }}>STRANGE LIGHT</div>
          <div style={{ backgroundColor: "#F2D9C2", color: "#2C1810", padding: "4px 16px", fontSize: "10px", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase" }}>HANDMADE LAMPS</div>
        </div>

        {/* NEW! starburst top-right */}
        <div style={{ position: "absolute", top: "28px", right: "36px", zIndex: 20, width: "72px", height: "72px", backgroundColor: "#D9531E", clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#F0E4C8", fontWeight: 900, fontSize: "11px", letterSpacing: "0.05em", textTransform: "uppercase", textAlign: "center", lineHeight: 1.1 }}>NEW!</span>
        </div>

        {/* Active search banner */}
        {activeQuery && (
          <div style={{ textAlign: "center", marginBottom: "40px", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F2D9C2" }}>
              Showing results for "{activeQuery}"
            </span>
            <Link to="/" style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#F2D9C2", border: "1px solid #F2D9C2", padding: "6px 14px", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#F2D9C2"; e.currentTarget.style.color = "#2C1810"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#F2D9C2"; }}
            >
              × Show All
            </Link>
          </div>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", fontSize: "13px", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F2D9C2", opacity: 0.7 }}>
            No lamps found for "{activeQuery}" — <Link to="/" style={{ color: "#F2D9C2", fontWeight: 900 }}>show all</Link>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "80px", justifyContent: "center", alignItems: "flex-end" }}>
          {filtered.map((lamp, i) => {
            const rotate      = ROTATIONS[i % ROTATIONS.length];
            const bannerColor = BANNER_COLORS[i % BANNER_COLORS.length];
            const bannerFg    = BANNER_FG[bannerColor];

            return (
              <Link
                key={lamp.id}
                to={`/lamp/${lamp.id}`}
                className="lamp-item"
                style={{ flexShrink: 0, textDecoration: "none", transform: `rotate(${rotate}deg)` }}
              >
                <img
                  src={lamp.image}
                  alt={lamp.name}
                  className="lamp-sway"
                  style={{
                    width: "clamp(330px, 39vw, 630px)",
                    height: "auto",
                    objectFit: "contain",
                    filter: "drop-shadow(4px 10px 16px rgba(44,24,16,0.3))",
                    "--sway-duration": `${DURATIONS[i % DURATIONS.length]}s`,
                    "--sway-delay": `${(i * 0.41).toFixed(2)}s`,
                  }}
                />
                <div style={{ backgroundColor: bannerColor, color: bannerFg, padding: "6px 14px", fontWeight: 900, fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  {lamp.name}
                </div>
                <div style={{ backgroundColor: "#F2D9C2", color: "#2C1810", padding: "4px 14px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", width: "fit-content" }}>
                  ${lamp.price}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </main>
  );
}
