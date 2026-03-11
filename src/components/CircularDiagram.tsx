import React, { useState } from "react";

const PROFESSORS = [
  { id: "A", name: "Professor A", lab: "Nano-Materials Lab", interests: "Nanoscale composites, thin-film technologies" },
  { id: "B", name: "Professor B", lab: "Biomechanics Lab", interests: "Tissue engineering, bio-implants" },
  { id: "C", name: "Professor C", lab: "3D Printing Centre", interests: "Metal additive manufacturing, lattice structures" },
  { id: "D", name: "Professor D", lab: "Renewable Energy Lab", interests: "Solar cells, green hydrogen" },
  { id: "E", name: "Professor E", lab: "AI & Materials Lab", interests: "ML for materials discovery" },
  { id: "F", name: "Professor F", lab: "Polymer Science Lab", interests: "Smart polymers, hydrogels" },
  { id: "G", name: "Professor G", lab: "Aerospace Structures Lab", interests: "Lightweight alloys, fatigue analysis" },
  { id: "H", name: "Professor H", lab: "Environmental Tech Lab", interests: "Waste-to-energy, water purification" },
  { id: "I", name: "Professor I", lab: "Computational Lab", interests: "FEA modelling, multiscale simulation" },
  { id: "J", name: "Professor J", lab: "MedTech Innovation Lab", interests: "Wearable sensors, diagnostics" },
];

const SEGMENTS = [
  {
    label: "Advanced Materials\nBiomaterials\nDevelopment\nModelling\nCharacterisation",
    color: "#B7AEA9",
    textColor: "#111111",
    startAngle: -30,
    endAngle: 90,
  },
  {
    label: "Additive Manufacturing\nMedtronics\nAerospace\nMachine Learning",
    color: "#D6CFCA",
    textColor: "#111111",
    startAngle: 90,
    endAngle: 210,
  },
  {
    label: "Sustainable Energy\nEnvironmental\nTechnologies",
    color: "#686260",
    textColor: "#FFFFFF",
    startAngle: 210,
    endAngle: 330,
  },
];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

function describeSegment(cx: number, cy: number, innerR: number, outerR: number, startAngle: number, endAngle: number) {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

const CircularDiagram: React.FC = () => {
  const [hoveredProf, setHoveredProf] = useState<string | null>(null);
  const [hoveredSeg, setHoveredSeg] = useState<number | null>(null);

  const cx = 400;
  const cy = 400;
  const centerR = 70;
  const ring2Inner = 75;
  const ring2Outer = 120;
  const ring3Inner = 125;
  const ring3Outer = 230;
  const profR = 280;
  const nodeR = 28;

  return (
    <div className="w-full flex items-center justify-center py-8 md:py-16">
      <div className="w-full max-w-[700px] aspect-square relative">
        <svg viewBox="0 0 800 800" className="w-full h-full" aria-label="MTech Invite Research Ecosystem Diagram">
          {/* Ring 2 — Entrepreneurship */}
          <circle cx={cx} cy={cy} r={(ring2Inner + ring2Outer) / 2} fill="none" stroke="#CC3333" strokeWidth={ring2Outer - ring2Inner} />
          {/* Curved text for Entrepreneurship */}
          <defs>
            <path id="entreArc" d={describeArc(cx, cy, (ring2Inner + ring2Outer) / 2 + 2, 200, 340)} />
          </defs>
          <text fill="#FFFFFF" fontSize="13" fontFamily="'IBM Plex Sans', sans-serif" fontWeight="500">
            <textPath href="#entreArc" startOffset="50%" textAnchor="middle">
              Entrepreneurship
            </textPath>
          </text>

          {/* Ring 3 — Segments */}
          {SEGMENTS.map((seg, i) => {
            const midAngle = (seg.startAngle + seg.endAngle) / 2;
            const textR = (ring3Inner + ring3Outer) / 2;
            const textPos = polarToCartesian(cx, cy, textR, midAngle);
            const isHovered = hoveredSeg === i;
            const lines = seg.label.split("\n");

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredSeg(i)}
                onMouseLeave={() => setHoveredSeg(null)}
                style={{
                  transform: isHovered ? `scale(1.04)` : "scale(1)",
                  transformOrigin: `${cx}px ${cy}px`,
                  transition: "transform 250ms ease",
                  cursor: "pointer",
                }}
              >
                <path
                  d={describeSegment(cx, cy, ring3Inner, ring3Outer, seg.startAngle, seg.endAngle)}
                  fill={seg.color}
                  stroke="#111111"
                  strokeWidth="2"
                  opacity={isHovered ? 1 : 0.92}
                />
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={textPos.x}
                    y={textPos.y + (li - (lines.length - 1) / 2) * 15}
                    fill={seg.textColor}
                    fontSize="11"
                    fontFamily="'IBM Plex Sans', sans-serif"
                    fontWeight="400"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ pointerEvents: "none" }}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Center Circle */}
          <circle cx={cx} cy={cy} r={centerR} fill="#000000" />
          <text
            x={cx}
            y={cy - 6}
            fill="#FFFFFF"
            fontSize="16"
            fontFamily="'IBM Plex Sans', sans-serif"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="central"
          >
            MTech
          </text>
          <text
            x={cx}
            y={cy + 14}
            fill="#FFFFFF"
            fontSize="16"
            fontFamily="'IBM Plex Sans', sans-serif"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="central"
          >
            Invite
          </text>

          {/* Professor Nodes */}
          {PROFESSORS.map((prof, i) => {
            const angle = (360 / PROFESSORS.length) * i - 90;
            const pos = polarToCartesian(cx, cy, profR, angle + 90);
            const isHov = hoveredProf === prof.id;

            return (
              <g
                key={prof.id}
                onMouseEnter={() => setHoveredProf(prof.id)}
                onMouseLeave={() => setHoveredProf(null)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeR}
                  fill="#000000"
                  stroke={isHov ? "#CC3333" : "#333333"}
                  strokeWidth={isHov ? 3 : 1.5}
                  style={{ transition: "stroke 250ms ease, stroke-width 250ms ease" }}
                />
                <text
                  x={pos.x}
                  y={pos.y - 4}
                  fill="#FFFFFF"
                  fontSize="8.5"
                  fontFamily="'IBM Plex Sans', sans-serif"
                  fontWeight="400"
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ pointerEvents: "none" }}
                >
                  Prof.
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 8}
                  fill="#FFFFFF"
                  fontSize="10"
                  fontFamily="'IBM Plex Sans', sans-serif"
                  fontWeight="500"
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ pointerEvents: "none" }}
                >
                  {prof.id}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Professor hover cards — positioned absolutely over the SVG */}
        {PROFESSORS.map((prof, i) => {
          const angle = (360 / PROFESSORS.length) * i - 90;
          const pos = polarToCartesian(50, 50, 35, angle + 90); // percentage-based
          const isHov = hoveredProf === prof.id;

          if (!isHov) return null;

          return (
            <div
              key={prof.id}
              className="absolute z-50 w-52 rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg pointer-events-none"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -120%)",
                animation: "fadeIn 200ms ease",
              }}
            >
              <p className="text-sm font-semibold">{prof.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{prof.lab}</p>
              <p className="text-xs mt-1 opacity-80">{prof.interests}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircularDiagram;
