import NavBar from '@/components/NavBar';
import FeedLeft from './FeedLeft';
import FeedMiddle from './FeedMiddle';
import FeedRight from './FeedRight';

export default function FeedPage() {
  return (
    <div className="container mx-auto flex items-start mt-18 lg:mt-22 gap-3 w-full">
      <NavBar />
      <div className="hidden lg:flex basis-1/4 w-full noselect">
        <FeedLeft />
      </div>
      <div className="flex lg:basis-2/4 w-full">
        <FeedMiddle />
      </div>
      <div className="hidden lg:flex basis-1/4 w-full noselect">
        <FeedRight />
      </div>
    </div>
  );
}
