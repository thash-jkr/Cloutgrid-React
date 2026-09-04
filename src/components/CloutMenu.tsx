import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPortal } from 'react-dom';

export interface MenuAction {
  icon: IconDefinition;
  label: String;
  action: () => void;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  actions: MenuAction[]
}

const CloutMenu = ({ isOpen, onClose, actions }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={() => onClose()}
    >
      <div
        className="w-full max-w-xs overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {actions.map((item, i) => (
          <div
            key={i}
            className="flex cursor-pointer items-center gap-3 p-3 hover:bg-slate-50"
            onClick={() => {
              item.action();
              onClose();
            }}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>,
    document.body,
  );
};

export default CloutMenu;
