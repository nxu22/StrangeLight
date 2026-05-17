const VB = 800; // fixed coordinate space — display size is separate

export default function CloudFrame({ width = 800, height = 800 }) {
  const cx = VB / 2;
  const cy = VB / 2;
  const bumps = 10;

  function path(rx, ry, bumpH, phase) {
    const steps = 360;
    const pts = [];
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const b = bumpH * Math.sin(bumps * a + phase);
      pts.push(
        `${(cx + (rx + b) * Math.cos(a)).toFixed(2)},` +
        `${(cy + (ry + b) * Math.sin(a)).toFixed(2)}`
      );
    }
    return `M ${pts.join(" L ")} Z`;
  }

  const layers = [
    { rx: 335, ry: 335, bumpH: 16, phase: 0.0, color: "#F5D555" },
    { rx: 328, ry: 328, bumpH: 15, phase: 0.5, color: "#ECA820" },
    { rx: 320, ry: 320, bumpH: 13, phase: 1.0, color: "#E08010" },
    { rx: 312, ry: 312, bumpH: 11, phase: 1.5, color: "#CC6008" },
  ];

  const holePath = path(288, 288, 10, 2.0);

  return (
    <svg
      viewBox={`0 0 ${VB} ${VB}`}
      width={width}
      height={height}
      style={{ display: "block" }}
    >
      <defs>
        <mask id="holeMask">
          <rect width={VB} height={VB} fill="white" />
          <path d={holePath} fill="black" />
        </mask>
      </defs>
      <g mask="url(#holeMask)">
        {layers.map((l, i) => (
          <path key={i} d={path(l.rx, l.ry, l.bumpH, l.phase)} fill={l.color} />
        ))}
      </g>
    </svg>
  );
}
