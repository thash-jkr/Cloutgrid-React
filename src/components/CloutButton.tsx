import type { LucideIcon } from 'lucide-react';

interface CloutButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
}

const CloutButton = ({ icon: Icon, onClick }: CloutButtonProps) => {
  return (
    <div
      className="w-10 h-10 border border-black rounded-full flex justify-center 
              items-center cursor-pointer transition-transform duration-300 
              ease-in-out transform hover:scale-105 hover:shadow"
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
};

export default CloutButton;
