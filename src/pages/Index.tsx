import { useState } from "react";
import CircularDiagram from "@/components/CircularDiagram";
import ProfessorGrid from "@/components/ProfessorGrid";
import FacultyPopup from "@/components/FacultyPopup";

const Index = () => {
  const [selectedRA, setSelectedRA] = useState<string | null>(null);
  const [selectedProf, setSelectedProf] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-12 pb-4 bg-background">
        <h1 className="sr-only">MTech Invite — Academic Research Innovation Ecosystem</h1>
        <CircularDiagram selectedRA={selectedRA} onSelectRA={setSelectedRA} />
        <p className="text-center text-sm tracking-widest uppercase mt-2 mb-10 text-muted-foreground" style={{ fontWeight: 300 }}>
          Innovation · Research · Entrepreneurship
        </p>
      </section>

      {/* Professor Grid Section */}
      <section className="py-12 bg-background">
        <ProfessorGrid
          selectedRA={selectedRA}
          onReset={() => setSelectedRA(null)}
          onSelectProfessor={(id) => {
            if (id === "2") setSelectedProf(id);
          }}
        />
      </section>

      <FacultyPopup open={selectedProf === "2"} onClose={() => setSelectedProf(null)} />
    </div>
  );
};

export default Index;
