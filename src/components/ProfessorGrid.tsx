import React from "react";

export interface FacultyMember {
  id: string;
  name: string;
  areas: { ra1?: number; ra2?: number; ra3?: number; ra4?: number };
}

export const FACULTY: FacultyMember[] = [
  { id: "1", name: "Andrew Maxwell", areas: { ra4: 1 } },
  { id: "2", name: "Alex Czekanski", areas: { ra1: 2, ra2: 1 } },
  { id: "3", name: "George Zhu", areas: { ra1: 1, ra2: 2 } },
  { id: "4", name: "Solomon Boakye-Yiadom", areas: { ra1: 2, ra2: 1 } },
  { id: "5", name: "Ronald Hanson", areas: { ra3: 1 } },
  { id: "6", name: "Garrett Melenka", areas: { ra1: 2, ra2: 1 } },
  { id: "7", name: "Marina Freire-Gormaly", areas: { ra1: 3, ra3: 1 } },
  { id: "8", name: "Cuiying Jian", areas: { ra2: 1, ra3: 2 } },
  { id: "9", name: "Pouya Rezai", areas: { ra1: 3, ra2: 2, ra3: 1 } },
  { id: "10", name: "Reza Rizvi", areas: { ra2: 1 } },
  { id: "11", name: "Hani Tabatabaei", areas: { ra2: 1 } },
];

interface ProfessorGridProps {
  selectedRA: string | null;
  onReset: () => void;
  onSelectProfessor?: (id: string) => void;
}

const ProfessorGrid: React.FC<ProfessorGridProps> = ({ selectedRA, onReset, onSelectProfessor }) => {
  const filtered = selectedRA
    ? FACULTY.filter((prof) => (prof.areas as Record<string, number>)[selectedRA] > 0)
    : FACULTY;

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      {/* Home / Reset button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={onReset}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border-2 ${
            selectedRA === null
              ? "bg-foreground text-background border-foreground"
              : "bg-background text-foreground border-border hover:bg-muted"
          }`}
          style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
        >
          Home
        </button>
      </div>

      {/* Professor Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
        {filtered.map((prof) => {
          const parts = prof.name.split(" ");
          const firstName = parts[0];
          const lastName = parts.slice(1).join(" ");

          return (
            <div
              key={prof.id}
              onClick={() => onSelectProfessor?.(prof.id)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center border-2 border-foreground/20 hover:border-foreground/50 transition-colors duration-200"
                style={{ backgroundColor: "#D6CFCA" }}
              >
                <div className="text-center px-2">
                  <p
                    className="text-foreground text-sm font-semibold leading-tight"
                    style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    {firstName}
                  </p>
                  {lastName && (
                    <p
                      className="text-foreground text-sm font-semibold leading-tight"
                      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
                    >
                      {lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfessorGrid;
