import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import georgeZhuImg from "@/assets/george_zhu.png";

interface GeorgeZhuPopupProps {
  open: boolean;
  onClose: () => void;
}

const GeorgeZhuPopup: React.FC<GeorgeZhuPopupProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[950px] w-[95vw] p-0 gap-0 border-none rounded-xl overflow-hidden bg-white">
        <DialogTitle className="sr-only">George Zhu Faculty Profile</DialogTitle>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full p-1 bg-white/80 hover:bg-white transition-colors"
          aria-label="Close"
        >
          <X size={22} style={{ color: "#333" }} />
        </button>
        <img src={georgeZhuImg} alt="George Zhu profile" className="w-full h-auto block" />
      </DialogContent>
    </Dialog>
  );
};

export default GeorgeZhuPopup;
