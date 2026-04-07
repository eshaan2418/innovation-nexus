import { useState } from "react";
import CircularDiagram from "@/components/CircularDiagram";
import ProfessorGrid from "@/components/ProfessorGrid";
import FacultyPopup from "@/components/FacultyPopup";
import GeorgeZhuPopup from "@/components/GeorgeZhuPopup";

const Index = () => {
  const [selectedRA, setSelectedRA] = useState<string | null>(null);
  const [selectedProf, setSelectedProf] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <h1 className="sr-only">MTech Invite — Academic Research Innovation Ecosystem</h1>

      {/* Side-by-side Layout */}
      <section className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 py-12 bg-background min-h-screen">
        {/* Left: Circular Diagram */}
        <div className="flex flex-col items-center shrink-0 w-full lg:w-[50%]">
          <p className="text-center text-sm tracking-widest uppercase mb-2 text-muted-foreground" style={{ fontWeight: 300 }}>
            Manufacturing · Technology · Entrepreneurship · Industry Partnership
          </p>
          <CircularDiagram selectedRA={selectedRA} onSelectRA={setSelectedRA} />
        </div>

        {/* Right: Professor Grid */}
        <div className="flex-1 max-w-xl">
          <ProfessorGrid
            selectedRA={selectedRA}
            onReset={() => setSelectedRA(null)}
            onSelectProfessor={(id) => {
              if (id === "2" || id === "3") setSelectedProf(id);
            }}
          />
        </div>
      </section>

      <FacultyPopup open={selectedProf === "2"} onClose={() => setSelectedProf(null)} />
      <GeorgeZhuPopup open={selectedProf === "3"} onClose={() => setSelectedProf(null)} />
    </div>
  );
};

export default Index;
