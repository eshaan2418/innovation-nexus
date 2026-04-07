import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import portraitImg from "@/assets/george_zhu.png";

const FONT = "'IBM Plex Sans', sans-serif";

const RESEARCH_INTERESTS = [
  "Dynamics and Control of Spacecraft",
  "Robotic Control and advanced Control Theory",
  "Artificial Intelligence and Machine Learning",
  "3D/4D Printing in Space",
];

const PROJECT_HIGHLIGHT =
  "Development and on-orbit demonstration of electrodynamic tether systems through the DESCENT CubeSat mission, enabling fuel-free satellite deorbiting and accelerated orbital decay to mitigate space debris and collision risk. Advances in autonomous robotic capture and control systems also support broader applications in manufacturing automation, robotics, electric vehicle navigation, energy systems, and intelligent infrastructure on Earth.";

interface GeorgeZhuPopupProps {
  open: boolean;
  onClose: () => void;
}

const RedArrow = () => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="flex-shrink-0 mt-[3px]">
    <path d="M1 1L8 6L1 11" stroke="#CC3333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GeorgeZhuPopup: React.FC<GeorgeZhuPopupProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-[900px] w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0 border-none rounded-xl"
        style={{ fontFamily: FONT }}
      >
        <DialogTitle className="sr-only">George Zhu Faculty Profile</DialogTitle>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full p-1 hover:bg-black/10 transition-colors"
          aria-label="Close"
        >
          <X size={20} style={{ color: "#333" }} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* LEFT COLUMN */}
          <div className="md:w-[280px] flex-shrink-0 bg-white">
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-full border-4 pointer-events-none" style={{ borderColor: "#CC3333" }} />
              <img
                src={portraitImg}
                alt="George Zhu portrait"
                className="w-full object-contain"
                style={{ display: "block" }}
              />
            </div>
            <div className="px-4 py-4 text-center">
              <p className="text-base font-bold leading-tight" style={{ color: "#111" }}>George Zhu, P.Eng.</p>
              <p className="text-sm font-bold mt-1" style={{ color: "#111" }}>MTEC Co-Director</p>
              <p className="text-sm" style={{ color: "#333" }}>Professor, Mechanical Engineering</p>
              <p className="text-sm" style={{ color: "#333" }}>York Tier 1 Research Chair in</p>
              <p className="text-sm" style={{ color: "#333" }}>Space Robotics and AI</p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-1 p-6 md:p-8 bg-white">
            {/* Research Interests */}
            <div>
              <h3 className="text-base font-bold mb-3" style={{ color: "#111" }}>
                Research Interests:
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
              <h3 className="text-base font-bold mb-3" style={{ color: "#111" }}>
                Project Highlight:
              </h3>
              <p className="text-sm leading-relaxed text-justify" style={{ color: "#333" }}>
                {PROJECT_HIGHLIGHT}
              </p>
            </div>

            {/* Website */}
            <div className="mt-4">
              <span className="text-base font-bold" style={{ color: "#111" }}>Website: </span>
              <a
                href="https://georgezhulab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base underline hover:opacity-80 transition-opacity"
                style={{ color: "#5B9AA0" }}
              >
                George Zhu Lab
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GeorgeZhuPopup;
