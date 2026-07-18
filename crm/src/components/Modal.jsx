import { useEffect } from "react";
import { IconX } from "./icons";

export default function Modal({ open, onClose, title, children, maxWidth = "max-w-lg" }) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-text-dark/50 p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} rounded-[3px] bg-white p-6 shadow-card`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black text-text-dark">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[3px] p-1 text-text-muted hover:bg-surface-tint hover:text-text-dark"
            aria-label="Cerrar"
          >
            <IconX width={18} height={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
