import NavBar from '@/components/NavBar';
import FeedLeft from './FeedLeft';
import FeedRight from './FeedRight';
import Instagram from '../integration/Instagram';
import { useState } from 'react';
import { SegmentedButtonSet } from 'actify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import YouTube from '../integration/YouTube';

type Socials = 'Instagram' | 'YouTube';

const SelectedSocial = ({selected}: {selected: Socials}) => {
  switch (selected) {
    case "Instagram":
      return <Instagram />
    case "YouTube":
      return <YouTube />
  }
}

export default function FeedPage() {
  const [social, setSocial] = useState<Socials>('Instagram');

  return (
    <div className="container mx-auto flex items-start mt-18 lg:mt-22 gap-3 w-full">
      <NavBar />
      <div className="hidden lg:flex flex-col basis-1/4 w-full gap-3 noselect">
        <FeedLeft />

        <FeedRight />
      </div>
      <div className="flex flex-col items-center gap-3 lg:basis-3/4 w-full">
        <div className="flex items-center w-52 gap-4">
          <SegmentedButtonSet role="presentation" className="w-full" aria-label="Color mode">
            <div role="group" className="h-10 grid w-full grid-flow-col auto-rows-auto">
              <div className="flex h-10 w-full overflow-hidden rounded-full border border-gray-300">
                <button
                  type="button"
                  onClick={() => setSocial('Instagram')}
                  className={`flex flex-1 items-center justify-center gap-2 text-sm font-medium transition-colors ${
                    social == 'Instagram' ? 'bg-pink-700 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </button>
                <button
                  type="button"
                  onClick={() => setSocial('YouTube')}
                  className={`flex flex-1 items-center justify-center gap-2 text-sm font-medium transition-colors ${
                    social == 'YouTube' ? 'bg-red-500 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </button>
              </div>
            </div>
          </SegmentedButtonSet>
        </div>
        
        <SelectedSocial selected={social} />
      </div>
    </div>
  );
}
