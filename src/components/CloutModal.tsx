import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function CloutModal({ isOpen, onClose, children, title }: ModalProps) {
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
        className="container flex h-[75vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl mx-3
           lg:mx-0 lg:h-2/3 lg:w-auto lg:aspect-3/4"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="m-3 flex shrink-0 items-center justify-between">
            <h2 className="text-lg font-bold">{title}</h2>
            <FontAwesomeIcon
              icon={faClose}
              className="cursor-pointer text-gray-400 hover:text-secondary"
              onClick={onClose}
            />
          </div>
        )}

        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
