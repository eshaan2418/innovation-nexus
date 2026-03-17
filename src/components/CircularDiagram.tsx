import React from "react";

interface CircularDiagramProps {
  selectedRA: string | null;
  onSelectRA: (ra: string | null) => void;
}

const SEGMENTS = [
  {
    raKey: "ra1" as const,
    label: "Additive Manufacturing, Mechatronics, Aerospace & Machine Learning",
    startAngle: -30,
    endAngle: 90,
  },
  {
    raKey: "ra2" as const,
    label: "Advanced Materials, Biomaterials, Development, Modelling & Characterisation",
    startAngle: 90,
    endAngle: 210,
  },
  {
    raKey: "ra3" as const,
    label: "Sustainable Energy & Environmental Technologies",
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

const CircularDiagram: React.FC<CircularDiagramProps> = ({ selectedRA, onSelectRA }) => {
  const cx = 400;
  const cy = 400;
  const centerR = 65;
  const segInner = 70;
  const segOuter = 210;
  const entreInner = 215;
  const entreOuter = 255;

  const handleSegmentClick = (raKey: string) => {
    onSelectRA(selectedRA === raKey ? null : raKey);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-[800px] aspect-square relative">
        <svg viewBox="100 100 600 600" className="w-full h-full" aria-label="MTEC Research Ecosystem Diagram">
          {/* Inner Segments */}
          {SEGMENTS.map((seg, i) => {
            const midAngle = (seg.startAngle + seg.endAngle) / 2;
            const textR = (segInner + segOuter) / 2;
            const textPos = polarToCartesian(cx, cy, textR, midAngle);
            const lines = wrapText(seg.label, 18);
            const lineHeight = 15;
            const isSelected = selectedRA === seg.raKey;

            return (
              <g key={i} onClick={() => handleSegmentClick(seg.raKey)} style={{ cursor: "pointer" }}>
                <path
                  d={describeSegment(cx, cy, segInner, segOuter, seg.startAngle, seg.endAngle)}
                  fill={isSelected ? "#686260" : "#D6CFCA"}
                  stroke="hsl(var(--foreground))"
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
                      fill={isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"}
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

          {/* Entrepreneurship Ring */}
          <circle
            cx={cx}
            cy={cy}
            r={(entreInner + entreOuter) / 2}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={entreOuter - entreInner}
            onClick={() => handleSegmentClick("ra4")}
            style={{ cursor: "pointer" }}
          />
          <defs>
            <path id="entreArc" d={describeArc(cx, cy, (entreInner + entreOuter) / 2 - 1, 100, 260)} />
          </defs>
          <text
            fill="hsl(var(--primary-foreground))"
            fontSize="14"
            fontFamily="'IBM Plex Sans', sans-serif"
            fontWeight="600"
            style={{ pointerEvents: "none" }}
          >
            <textPath href="#entreArc" startOffset="50%" textAnchor="middle">
              Entrepreneurship
            </textPath>
          </text>

          {/* Center Circle — Home button */}
          <circle cx={cx} cy={cy} r={centerR} fill="hsl(var(--foreground))" onClick={() => onSelectRA(null)} style={{ cursor: "pointer" }} />
          <text
            x={cx}
            y={cy + 2}
            fill="hsl(var(--primary-foreground))"
            fontSize="22"
            fontFamily="'IBM Plex Sans', sans-serif"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="central"
          >
            MTEC
          </text>
        </svg>
      </div>
    </div>
  );
};

export default CircularDiagram;
