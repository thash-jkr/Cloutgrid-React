// src/components/RateCard.tsx
import { compactCount } from '@/utils/compactCount';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RateCardData {
  title: string;
  deliverables: Record<string, number>;
  icon: IconDefinition;
  color: string
}

const CARDS: RateCardData[] = [
  {
    title: 'Instagram',
    deliverables: {
      Story: 2500,
      Post: 6000,
      Reel: 9000,
      Carousel: 7000,
      Live: 12000,
    },
    icon: faInstagram,
    color: '#E1306C'
  },
  {
    title: 'YouTube',
    deliverables: {
      Shorts: 5000,
      'Dedicated Video': 25000,
      'Integrated Mention': 12000,
      'Community Post': 2000,
      'Live Stream': 18000,
    },
    icon: faYoutube,
    color: '#FF0000'
  },
];

function Card({ icon, deliverables, color }: RateCardData) {
  return (
    <div className="flex aspect-3/4 flex-col rounded-xl bg-white px-3 shadow hover:shadow-md transition-all hover:scale-[1.01] duration-500">
      <div className="flex items-center justify-center" style={{ color }}>
        <FontAwesomeIcon icon={icon} className='mx-auto p-3 text-2xl' />
      </div>

      <div className='flex flex-col gap-2'>
        {Object.entries(deliverables).map(([name, price]) => (
        <div key={name} className="flex items-center gap-3">
          <span className="flex-1 truncate font-normal">{name}</span>
          <span className='text-gray-500'>₹{compactCount(price)}</span>
        </div>
      ))}
      </div>
    </div>
  );
}

const RateCard = () => {
  return (
    <div className="flex flex-col items-center gap-3 py-3 lg:px-3 w-full">
      <h2 className="text-xl font-semibold">Rate Cards</h2>

      <div className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {CARDS.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
};

export default RateCard;