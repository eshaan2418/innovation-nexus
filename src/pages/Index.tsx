import { useState } from "react";
import CircularDiagram from "@/components/CircularDiagram";
import ProfessorGrid from "@/components/ProfessorGrid";
import ImagePopup from "@/components/ImagePopup";

import georgeZhuImg from "@/assets/george_zhu_full.png";
import alexCzekanskiImg from "@/assets/alex_czekanski.png";
import andrewMaxwellImg from "@/assets/andrew_maxwell.png";
import satinderBrarImg from "@/assets/satinder_brar.png";
import garrettMelenkaImg from "@/assets/garrett_melenka.png";
import ronaldHansonImg from "@/assets/ronald_hanson.png";
import marinaFreireGormalyImg from "@/assets/marina_freire_gormaly.png";
import solomonBoakyeYiadomImg from "@/assets/solomon_boakye_yiadom.png";
import simonePisanaImg from "@/assets/simone_pisana.png";
import ryanOrszulikImg from "@/assets/ryan_orszulik.png";
import stephanieGoraImg from "@/assets/stephanie_gora.png";
import christopherCaputoImg from "@/assets/christopher_caputo.png";
import paulOBrienImg from "@/assets/paul_obrien.png";
import terrySachlosImg from "@/assets/terry_sachlos.png";

const PROFESSOR_POPUPS: Record<string, { image: string; alt: string }> = {
  "1": { image: andrewMaxwellImg, alt: "Andrew Maxwell Faculty Profile" },
  "2": { image: alexCzekanskiImg, alt: "Alex Czekanski Faculty Profile" },
  "3": { image: georgeZhuImg, alt: "George Zhu Faculty Profile" },
  "4": { image: solomonBoakyeYiadomImg, alt: "Solomon Boakye-Yiadom Faculty Profile" },
  "5": { image: ronaldHansonImg, alt: "Ronald Hanson Faculty Profile" },
  "6": { image: garrettMelenkaImg, alt: "Garrett Melenka Faculty Profile" },
  "7": { image: marinaFreireGormalyImg, alt: "Marina Freire-Gormaly Faculty Profile" },
  "12": { image: satinderBrarImg, alt: "Satinder K. Brar Faculty Profile" },
  "13": { image: simonePisanaImg, alt: "Simone Pisana Faculty Profile" },
  "14": { image: ryanOrszulikImg, alt: "Ryan Orszulik Faculty Profile" },
  "15": { image: stephanieGoraImg, alt: "Stephanie Gora Faculty Profile" },
  "16": { image: christopherCaputoImg, alt: "Christopher Caputo Faculty Profile" },
  "17": { image: paulOBrienImg, alt: "Paul O'Brien Faculty Profile" },
  "18": { image: terrySachlosImg, alt: "Terry Sachlos Faculty Profile" },
};

const Index = () => {
  const [selectedRA, setSelectedRA] = useState<string | null>(null);
  const [selectedProf, setSelectedProf] = useState<string | null>(null);

  const currentPopup = selectedProf ? PROFESSOR_POPUPS[selectedProf] : null;

  return (
    <div className="min-h-screen" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      <h1 className="sr-only">MTech Invite — Academic Research Innovation Ecosystem</h1>

      <section className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 py-12 bg-background min-h-screen">
        <div className="flex flex-col items-center shrink-0 w-full lg:w-[50%]">
          <p className="text-center text-sm tracking-widest uppercase mb-2 text-muted-foreground" style={{ fontWeight: 300 }}>
            Manufacturing · Technology · Entrepreneurship · Industry Partnership
          </p>
          <CircularDiagram selectedRA={selectedRA} onSelectRA={setSelectedRA} />
        </div>

        <div className="flex-1 max-w-xl">
          <ProfessorGrid
            selectedRA={selectedRA}
            onReset={() => setSelectedRA(null)}
            onSelectProfessor={(id) => {
              if (PROFESSOR_POPUPS[id]) setSelectedProf(id);
            }}
          />
        </div>
      </section>

      {currentPopup && (
        <ImagePopup
          open={!!selectedProf}
          onClose={() => setSelectedProf(null)}
          imageSrc={currentPopup.image}
          altText={currentPopup.alt}
        />
      )}
    </div>
  );
};

export default Index;
