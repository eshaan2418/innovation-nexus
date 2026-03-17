import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import portraitImg from "@/assets/alex-portrait.png";
import roboticArmImg from "@/assets/robotic-arm.png";
import toolpathImg from "@/assets/toolpath-planning.png";
import printedArmImg from "@/assets/printed-patch-arm.png";

const FONT = "'IBM Plex Sans', sans-serif";

const RESEARCH_INTERESTS = [
  "Advanced applied mechanics to promote design and innovation",
  "Additive manufacturing of smart materials with tailored behavior",
  "Multi-scale modeling and topology optimization",
  "Constitutive modeling of hyper-elastic and composite materials",
];

const PROJECT_IMAGES = [
  { src: roboticArmImg, caption: "Robotic arm printing complex curved surfaces" },
  { src: toolpathImg, caption: "Toolpath planning" },
  { src: printedArmImg, caption: "Printed patch on a human-like arm" },
];

interface FacultyPopupProps {
  open: boolean;
  onClose: () => void;
}

const RedArrow = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="flex-shrink-0 mt-[3px]">
    <path d="M1 1L8 6L1 11" stroke="#CC3333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FacultyPopup: React.FC<FacultyPopupProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-[900px] w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0 border-none rounded-xl"
        style={{ fontFamily: FONT }}
      >
        {/* Hidden accessible title */}
        <DialogTitle className="sr-only">Alex Czekanski Faculty Profile</DialogTitle>

        <div className="flex flex-col md:flex-row">
          {/* LEFT COLUMN */}
          <div className="md:w-[280px] flex-shrink-0 bg-black text-white">
            {/* Red accent line */}
            <div className="relative">
              <div className="absolute top-0 right-0 w-[4px] h-full" style={{ backgroundColor: "#CC3333" }} />
              <img
                src={portraitImg}
                alt="Alex Czekanski portrait"
                className="w-full object-contain"
                style={{ display: "block" }}
              />
            </div>
            <div className="px-5 py-5">
              <p className="text-lg font-semibold leading-tight">Alex Czekanski</p>
              <p className="text-sm mt-1 opacity-90">Professor, P.Eng</p>
              <p className="text-sm opacity-90">Mechanical Engineering</p>
              <p className="text-sm opacity-90">MTEC Co-Director</p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-1 p-6 md:p-8 bg-white">
            {/* Title */}
            <h2 className="text-lg font-bold leading-snug" style={{ color: "#111" }}>
              MTEC CO-DIRECTOR: Alex Czekanski, P.Eng
            </h2>
            <p className="text-sm mt-1" style={{ color: "#555" }}>
              Professor, Mechanical Engineering
            </p>

            {/* Research Interests */}
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#111" }}>
                Research Interests
              </h3>
              <ul className="space-y-2">
                {RESEARCH_INTERESTS.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#333" }}>
                    <RedArrow />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project Highlight */}
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#111" }}>
                Project Highlight
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                Co-developed a robotic in-situ bioprinting system for the fabrication of customized multilayer skin
                implants directly onto a patient's skin. This system accounts for the complexity of human body shapes
                and auto-compensates for printing defects. This biofabrication project represents a major step toward
                personalized, in-situ tissue repair through advanced toolpath planning and real-time bioprinting
                technology.
              </p>
            </div>

            {/* Project Image Gallery */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {PROJECT_IMAGES.map((img, i) => (
                <div key={i} className="flex flex-col items-center justify-end">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className={`rounded object-contain ${img.className || "w-full"}`}
                    style={{ display: "block" }}
                  />
                  <p
                    className="text-[11px] text-center mt-2 italic leading-tight"
                    style={{ color: "#666", fontFamily: FONT }}
                  >
                    {img.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FacultyPopup;
