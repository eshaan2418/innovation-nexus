import React, { useState } from "react";
import FacultyPopup from "@/components/FacultyPopup";

interface FacultyMember {
  id: string;
  name: string;
  shortName: string;
  areas: { ra1?: number; ra2?: number; ra3?: number; ra4?: number };
}

const FACULTY: FacultyMember[] = [
  { id: "1", name: "Andrew Maxwell", shortName: "A. Maxwell", areas: { ra4: 1 } },
  { id: "2", name: "Aleksander Czekanski", shortName: "A. Czekanski", areas: { ra1: 2, ra2: 1 } },
  { id: "3", name: "Zheng Hong (George) Zhu", shortName: "G. Zhu", areas: { ra1: 1, ra2: 2 } },
  { id: "4", name: "Solomon Boakye-Yiadom", shortName: "S. Boakye-Y.", areas: { ra1: 2, ra2: 1 } },
  { id: "5", name: "Ronald Hanson", shortName: "R. Hanson", areas: { ra3: 1 } },
  { id: "6", name: "Garrett Melenka", shortName: "G. Melenka", areas: { ra1: 2, ra2: 1 } },
  { id: "7", name: "Marina Freire-Gormaly", shortName: "M. Freire-G.", areas: { ra1: 3, ra3: 1 } },
  { id: "8", name: "Cuiying Jian", shortName: "C. Jian", areas: { ra2: 1, ra3: 2 } },
  { id: "9", name: "Pouya Rezai", shortName: "P. Rezai", areas: { ra1: 3, ra2: 2, ra3: 1 } },
  { id: "10", name: "Reza Rizvi", shortName: "R. Rizvi", areas: { ra2: 1 } },
  { id: "11", name: "Hani Tabatabaei", shortName: "H. Tabatabaei", areas: { ra2: 1 } },
];

// Segments map to research areas: index 0 = RA1, index 1 = RA2, index 2 = RA3
const SEGMENTS = [
  {
    raKey: "ra1" as const,
    lines: ["Additive Manufacturing", "Mechatronics", "Aerospace", "Machine Learning"],
    color: "#B7AEA9",
    textColor: "#111111",
    startAngle: -30,
    endAngle: 90,
  },
  {
    raKey: "ra2" as const,
    lines: ["Advanced Materials", "Biomaterials", "Development", "Modelling", "Characterisation"],
    color: "#D6CFCA",
    textColor: "#111111",
    startAngle: 90,
    endAngle: 210,
  },
  {
    raKey: "ra3" as const,
    lines: ["Sustainable Energy", "Environmental", "Technologies"],
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

function describeArcCW(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
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

function getTranslateOffset(strength: number): number {
  if (strength === 3) return 18;
  if (strength === 2) return 12;
  if (strength === 1) return 7;
  return 0;
}

const CircularDiagram: React.FC = () => {
  const [hoveredProf, setHoveredProf] = useState<string | null>(null);
  const [selectedProf, setSelectedProf] = useState<string | null>(null);

  const cx = 400;
  const cy = 400;
  const centerR = 65;
  const ring2Inner = 70;
  const ring2Outer = 115;
  const ring3Inner = 120;
  const ring3Outer = 260;
  const profR = 310;
  const nodeR = 30;

  const hoveredFaculty = FACULTY.find((f) => f.id === hoveredProf);
  const anyHovered = hoveredProf !== null;

  return (
    <div className="w-full flex items-center justify-center py-8 md:py-16">
      <div className="w-full max-w-[750px] aspect-square relative">
        <svg viewBox="0 0 800 800" className="w-full h-full" aria-label="MTEC Research Ecosystem Diagram">
          {/* Glow filter for highlights */}
          <defs>
            <filter id="segGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="entreGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ring 2 — Entrepreneurship (RA4) */}
          {(() => {
            const ra4Strength = hoveredFaculty?.areas.ra4 ?? 0;
            const shouldScale = anyHovered && ra4Strength > 0;
            const scale = shouldScale ? 1.15 : 1;
            return (
              <g style={{
                transform: `scale(${scale})`,
                transformOrigin: `${cx}px ${cy}px`,
                transition: "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={(ring2Inner + ring2Outer) / 2}
                  fill="none"
                  stroke="#CC3333"
                  strokeWidth={ring2Outer - ring2Inner}
                />
                <defs>
                  <path id="entreArc" d={describeArc(cx, cy, (ring2Inner + ring2Outer) / 2 - 1, 130, 230)} />
                </defs>
                <text
                  fill="#FFFFFF"
                  fontSize="13"
                  fontFamily="'IBM Plex Sans', sans-serif"
                  fontWeight="500"
                >
                  <textPath href="#entreArc" startOffset="50%" textAnchor="middle">
                    Entrepreneurship
                  </textPath>
                </text>
              </g>
            );
          })()}

          {/* Ring 3 — Segments */}
          {SEGMENTS.map((seg, i) => {
            const raStrength = hoveredFaculty?.areas[seg.raKey] ?? 0;
            const offset = anyHovered ? getTranslateOffset(raStrength) : 0;
            const isHighlighted = anyHovered && raStrength > 0;
            const fontSize = isHighlighted ? (raStrength === 3 ? 13.5 : raStrength === 2 ? 12.5 : 11.5) : 10.5;
            const fontWeight = isHighlighted ? "600" : "400";
            const midAngle = (seg.startAngle + seg.endAngle) / 2;
            // Calculate outward translation direction
            const dirRad = ((midAngle - 90) * Math.PI) / 180;
            const tx = Math.cos(dirRad) * offset;
            const ty = Math.sin(dirRad) * offset;

            const lineCount = seg.lines.length;
            const lineSpacing = (ring3Outer - ring3Inner) / (lineCount + 1);

            return (
              <g
                key={i}
                style={{
                  transform: `translate(${tx}px, ${ty}px)`,
                  transition: "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <path
                  d={describeSegment(cx, cy, ring3Inner, ring3Outer, seg.startAngle, seg.endAngle)}
                  fill={seg.color}
                  stroke="#111111"
                  strokeWidth={2}
                  opacity={0.92}
                />
                {seg.lines.map((line, li) => {
                  const textRadius = ring3Inner + lineSpacing * (li + 1);
                  const needsFlip = midAngle > 90 && midAngle < 270;
                  const arcSpread = 40;
                  const arcId = `segArc-${i}-${li}`;

                  return (
                    <g key={li}>
                      <defs>
                        {needsFlip ? (
                          <path id={arcId} d={describeArc(cx, cy, textRadius, midAngle - arcSpread, midAngle + arcSpread)} />
                        ) : (
                          <path id={arcId} d={describeArcCW(cx, cy, textRadius, midAngle - arcSpread, midAngle + arcSpread)} />
                        )}
                      </defs>
                      <text
                        fill={seg.textColor}
                        fontSize={fontSize}
                        fontFamily="'IBM Plex Sans', sans-serif"
                        fontWeight={fontWeight}
                        style={{ pointerEvents: "none", transition: "font-size 300ms ease, font-weight 300ms ease" }}
                      >
                        <textPath href={`#${arcId}`} startOffset="50%" textAnchor="middle">
                          {line}
                        </textPath>
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Center Circle */}
          <circle cx={cx} cy={cy} r={centerR} fill="#000000" />
          <text
            x={cx}
            y={cy + 2}
            fill="#FFFFFF"
            fontSize="20"
            fontFamily="'IBM Plex Sans', sans-serif"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="central"
          >
            MTEC
          </text>

          {/* Professor Nodes */}
          {FACULTY.map((prof, i) => {
            const angle = (360 / FACULTY.length) * i - 90;
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
                  y={pos.y + 1}
                  fill="#FFFFFF"
                  fontSize="7"
                  fontFamily="'IBM Plex Sans', sans-serif"
                  fontWeight="500"
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ pointerEvents: "none" }}
                >
                  {prof.shortName}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default CircularDiagram;
