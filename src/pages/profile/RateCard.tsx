// src/components/RateCard.tsx
import { useEffect, useState } from 'react';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pencil } from 'lucide-react';
import { apiClient } from '@/app/client';
import { compactCount } from '@/utils/compactCount';
import type { InstagramRateState, YoutubeRateState } from '@/types/integrationTypes';
import CloutModal from '@/components/CloutModal';
import CloutLoading from '@/components/CloutLoading';
import InstagramRates from '../integration/InstagramRates';
import YouTubeRates from '../integration/YouTubeRates';
import toast, { Toaster } from 'react-hot-toast';

type Platform = 'instagram' | 'youtube';

interface RatesResponse {
  instagram: InstagramRateState;
  youtube: YoutubeRateState;
}

interface PlatformConfig {
  id: Platform;
  title: string;
  icon: IconDefinition;
  color: string;
  labels: Record<string, string>;
}

const PLATFORMS: PlatformConfig[] = [
  {
    id: 'instagram',
    title: 'Instagram',
    icon: faInstagram,
    color: '#E1306C',
    labels: { story: 'Story', post: 'Post', reel: 'Reel', carousel: 'Carousel', live: 'Live' },
  },
  {
    id: 'youtube',
    title: 'YouTube',
    icon: faYoutube,
    color: '#FF0000',
    labels: { shorts: 'Shorts', video: 'Video', post: 'Community Post', live: 'Live Stream' },
  },
];

interface CardProps {
  title: string;
  icon: IconDefinition;
  color: string;
  rows: [label: string, price: number | null][];
  isOwner: boolean;
  onClick: () => void;
}

function Card({ icon, color, rows, isOwner, onClick }: CardProps) {
  return (
    <div
      className="flex aspect-3/4 flex-col rounded-xl bg-white shadow hover:shadow-md transition-all hover:scale-[1.01] duration-500 cursor-pointer relative"
      onClick={() => {
        isOwner && onClick();
      }}
    >
      <div className="flex items-center justify-center" style={{ color }}>
        <FontAwesomeIcon icon={icon} className="mx-auto p-3 text-2xl" />
      </div>

      <div className="flex flex-col gap-2 px-3">
        {rows.map(([label, price]) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex-1 truncate font-normal">{label}</span>
            <span className={price == null ? 'text-gray-400' : 'text-gray-500'}>
              {price == null ? 'Not set' : `₹${compactCount(price)}`}
            </span>
          </div>
        ))}
      </div>

      {isOwner && (
        <div className="absolute bottom-3 flex w-full items-center justify-center">
          <Pencil />
        </div>
      )}
    </div>
  );
}

interface RateCardProps {
  id: number | null;
}

const RateCard = ({ id }: RateCardProps) => {
  const [rates, setRates] = useState<RatesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Platform | null>(null);

  const isOwner = id == null;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    apiClient
      .get<RatesResponse>(`/rates/${id ? `${id}/` : ''}`)
      .then((res) => {
        if (!cancelled) setRates(res.data);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load rates');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <CloutLoading />;
  if (error || !rates) {
    return <p className="py-3 text-sm text-gray-500">{error ?? 'No rates available'}</p>;
  }

  const handleInstagramSaved = (updated: InstagramRateState) => {
    setRates((prev) => (prev ? { ...prev, instagram: updated } : prev));

    apiClient
      .post('/rates/', { social: 'instagram', values: updated })
      .then(() => {
        setEditing(null);
      })
      .catch(() => {
        toast.error('Failed to save Instagram rates');
      });
  };

  const handleYoutubeSaved = (updated: YoutubeRateState) => {
    setRates((prev) => (prev ? { ...prev, youtube: updated } : prev));

    apiClient
      .post('/rates/', { social: 'youtube', values: updated })
      .then(() => {
        setEditing(null);
      })
      .catch(() => {
        toast.error('Failed to save YouTube rates');
      });
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 py-3 lg:px-3">
      <Toaster />
      <h2 className="text-xl font-semibold">Rate Cards</h2>

      <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {PLATFORMS.map(({ id, labels, title, icon, color }) => {
          const values = rates[id] as unknown as Record<string, number | null>;
          const rows = Object.entries(labels).map(([key, label]): [string, number | null] => [
            label,
            values[key] ?? null,
          ]);

          return (
            <Card
              key={id}
              title={title}
              icon={icon}
              color={color}
              rows={rows}
              isOwner={isOwner}
              onClick={() => setEditing(id)}
            />
          );
        })}
      </div>

      {isOwner && (
        <>
          <CloutModal
            isOpen={editing === 'instagram'}
            onClose={() => setEditing(null)}
            title="Set Instagram Rates"
          >
            {editing === 'instagram' && (
              <InstagramRates initial={rates.instagram} onSaved={handleInstagramSaved} />
            )}
          </CloutModal>

          <CloutModal
            isOpen={editing === 'youtube'}
            onClose={() => setEditing(null)}
            title="Set YouTube Rates"
          >
            {editing === 'youtube' && (
              <YouTubeRates initial={rates.youtube} onSaved={handleYoutubeSaved} />
            )}
          </CloutModal>
        </>
      )}
    </div>
  );
};

export default RateCard;
