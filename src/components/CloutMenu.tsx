import type { LucideIcon } from 'lucide-react';
import { createPortal } from 'react-dom';

export interface MenuAction {
  icon: LucideIcon;
  label: string;
  action: () => void;
}

interface CloutMenuProps {
  isOpen: boolean;
  onClose: () => void;
  actions: MenuAction[];
}

const CloutMenu = ({ isOpen, onClose, actions }: CloutMenuProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs overflow-hidden rounded-2xl bg-white shadow-xl divide-y"
        onClick={(e) => e.stopPropagation()}
      >
        {actions.map((item, i) => (
          <div
            key={i}
            className="flex cursor-pointer items-center gap-3 p-3 hover:bg-background"
            onClick={() => {
              item.action();
              onClose();
            }}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
};

export default CloutMenu;