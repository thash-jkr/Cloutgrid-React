import { useEffect, useState } from 'react';

interface CloutImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  fallback: string;
}

const CloutImage = ({ src, fallback, onError, ...rest }: CloutImageProps) => {
  const [failed, setFailed] = useState(false);

  // Reset when the source changes (e.g. navigating between profiles)
  useEffect(() => {
    setFailed(false);
  }, [src]);

  const useFallback = !src || failed;

  return (
    <img
      {...rest}
      src={useFallback ? fallback : src}
      referrerPolicy="no-referrer"
      onError={(e) => {
        if (!useFallback) setFailed(true);
        onError?.(e);
      }}
    />
  );
};

export default CloutImage;