import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

interface CloutLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses: Record<NonNullable<CloutLoadingProps['size']>, string> = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-3xl',
};

export default function CloutLoading({ size = 'md', className = '' }: CloutLoadingProps) {
  return (
    <FontAwesomeIcon icon={faGear} className={`animate-spin text-primary ${sizeClasses[size]} ${className}`} />
  );
}