export default function CloudArt({ size = 260 }) {
  function superR(angle, R, n = 2.8) {
    return R / Math.pow(
      Math.pow(Math.abs(Math.cos(angle)), n) +
      Math.pow(Math.abs(Math.sin(angle)), n),
      1 / n
    );
  }

  function cloudPath(cx, cy, baseR, bumps, bumpH, phase) {
    const steps = 360;
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const r = superR(a, baseR) + bumpH * Math.sin(bumps * a + phase);
      pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
    }
    return `M ${pts.join(" L ")} Z`;
  }

  const bumps = 10;

  const layers = [
    { r: 175, bumpH: 26, phase: 0.0, color: "#F5D555" },
    { r: 138, bumpH: 23, phase: 0.5, color: "#ECA820" },
    { r: 104, bumpH: 20, phase: 1.0, color: "#E08010" },
    { r: 74,  bumpH: 17, phase: 1.5, color: "#CC6008" },
    { r: 48,  bumpH: 14, phase: 2.0, color: "#B84A05" },
  ];

  const dots = [
    { x: 155, y: 178, r: 27, fill: "#3858CC" },
    { x: 238, y: 194, r: 19, fill: "#3858CC" },
    { x: 191, y: 212, r: 13, fill: "#7030B0" },
    { x: 213, y: 170, r: 15, fill: "#CC2060" },
    { x: 168, y: 214, r: 10, fill: "#DD4020" },
    { x: 230, y: 167, r: 8,  fill: "#3858CC" },
    { x: 197, y: 236, r: 8,  fill: "#CC2060" },
    { x: 222, y: 230, r: 12, fill: "#7030B0" },
    { x: 163, y: 196, r: 6,  fill: "#DD4020" },
    { x: 243, y: 214, r: 6,  fill: "#7030B0" },
  ];

  return (
    <svg viewBox="0 0 400 400" width={size} height={size} style={{ display: "block" }}>
      {layers.map((l, i) => (
        <path key={i} d={cloudPath(200, 200, l.r, bumps, l.bumpH, l.phase)} fill={l.color} />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.fill} />
      ))}
    </svg>
  );
}
