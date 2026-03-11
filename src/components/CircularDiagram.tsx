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

const SEGMENTS = [
  {
    raKey: "ra1" as const,
    label: "Additive Manufacturing, Mechatronics, Aerospace & Machine Learning",
    color: "#D6CFCA",
    textColor: "#111111",
    startAngle: -30,
    endAngle: 90,
  },
  {
    raKey: "ra2" as const,
    label: "Advanced Materials, Biomaterials, Development, Modelling & Characterisation",
    color: "#D6CFCA",
    textColor: "#111111",
    startAngle: 90,
    endAngle: 210,
  },
  {
    raKey: "ra3" as const,
    label: "Sustainable Energy & Environmental Technologies",
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

/** Wrap text into lines of maxChars width */
function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (current.length + word.length + 1 > maxChars && current.length > 0) {
      lines.push(current);
      current = word;
    } else {
      current = current ? current + " " + word : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const CircularDiagram: React.FC = () => {
  const [selectedRA, setSelectedRA] = useState<string | null>(null);
  const [selectedProf, setSelectedProf] = useState<string | null>(null);

  const cx = 400;
  const cy = 400;
  const centerR = 65;
  const segInner = 70;
  const segOuter = 210;
  const entreInner = 215;
  const entreOuter = 255;
  const profR = 330;
  const nodeR = 55;

  const handleSegmentClick = (raKey: string) => {
    setSelectedRA((prev) => (prev === raKey ? null : raKey));
  };

  return (
    <div className="w-full flex items-center justify-center py-8 md:py-16">
      <div className="w-full max-w-[750px] aspect-square relative">
        <svg viewBox="0 0 800 800" className="w-full h-full" aria-label="MTEC Research Ecosystem Diagram">
          <defs>
            <filter id="entreGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Inner Segments (RA1, RA2, RA3) */}
          {SEGMENTS.map((seg, i) => {
            const midAngle = (seg.startAngle + seg.endAngle) / 2;
            const textR = (segInner + segOuter) / 2;
            const textPos = polarToCartesian(cx, cy, textR, midAngle);
            const lines = wrapText(seg.label, 18);
            const lineHeight = 15;
            const isSelected = selectedRA === seg.raKey;

            return (
              <g
                key={i}
                onClick={() => handleSegmentClick(seg.raKey)}
                style={{ cursor: "pointer" }}
              >
                <path
                  d={describeSegment(cx, cy, segInner, segOuter, seg.startAngle, seg.endAngle)}
                  fill={seg.color}
                  stroke="#111111"
                  strokeWidth={isSelected ? 3 : 2}
                  opacity={0.92}
                />
                {lines.map((line, li) => {
                  const yOffset = (li - (lines.length - 1) / 2) * lineHeight;
                  return (
                    <text
                      key={li}
                      x={textPos.x}
                      y={textPos.y + yOffset}
                      fill={seg.textColor}
                      fontSize="13"
                      fontFamily="'IBM Plex Sans', sans-serif"
                      fontWeight="600"
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ pointerEvents: "none" }}
                    >
                      {line}
                    </text>
                  );
                })}
              </g>
            );
          })}

          {/* Entrepreneurship Ring (outer) */}
          <circle
            cx={cx}
            cy={cy}
            r={(entreInner + entreOuter) / 2}
            fill="none"
            stroke="#CC3333"
            strokeWidth={entreOuter - entreInner}
            onClick={() => handleSegmentClick("ra4")}
            style={{ cursor: "pointer" }}
          />
          <defs>
            <path id="entreArc" d={describeArc(cx, cy, (entreInner + entreOuter) / 2 - 1, 100, 260)} />
          </defs>
          <text
            fill="#FFFFFF"
            fontSize="14"
            fontFamily="'IBM Plex Sans', sans-serif"
            fontWeight="600"
            style={{ pointerEvents: "none" }}
          >
            <textPath href="#entreArc" startOffset="50%" textAnchor="middle">
              Entrepreneurship
            </textPath>
          </text>

          {/* Center Circle */}
          <circle cx={cx} cy={cy} r={centerR} fill="#000000" />
          <text
            x={cx}
            y={cy + 2}
            fill="#FFFFFF"
            fontSize="22"
            fontFamily="'IBM Plex Sans', sans-serif"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="central"
          >
            MTEC
          </text>

          {/* Professor Nodes */}
          {FACULTY.map((prof, i) => {
            const angle = (360 / FACULTY.length) * i - 90;
            const pos = polarToCartesian(cx, cy, profR, angle + 90);

            // Determine visibility based on selected RA
            const isVisible = selectedRA === null || (prof.areas as any)[selectedRA] > 0;

            return (
              <g
                key={prof.id}
                onClick={() => {
                  if (prof.id === "2") setSelectedProf(prof.id);
                }}
                style={{
                  cursor: prof.id === "2" ? "pointer" : "default",
                  opacity: isVisible ? 1 : 0.08,
                  transition: "opacity 350ms ease",
                }}
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={nodeR}
                  fill="#FFFFFF"
                  stroke="#111111"
                  strokeWidth={2}
                />
                <text
                  x={pos.x}
                  y={pos.y + 1}
                  fill="#111111"
                  fontSize="11.5"
                  fontFamily="'IBM Plex Sans', sans-serif"
                  fontWeight="600"
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
        <FacultyPopup open={selectedProf === "2"} onClose={() => setSelectedProf(null)} />
      </div>
    </div>
  );
};

export default CircularDiagram;
