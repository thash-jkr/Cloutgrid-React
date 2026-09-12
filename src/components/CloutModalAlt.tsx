import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CloutModalAlt = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="container flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl mx-3
           lg:mx-0 lg:w-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`min-h-0 flex-1`}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default CloutModalAlt;
