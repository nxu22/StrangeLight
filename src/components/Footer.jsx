export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #000", padding: "28px 48px", display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#000", marginTop: "auto" }}>
      <span>Strange Light © {new Date().getFullYear()}</span>
      <span>Handmade. Weird. One of a kind.</span>
    </footer>
  );
}
