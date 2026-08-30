import { Button } from 'actify';
import { InstagramConstants } from './IntegrationConstants';

const Instagram = () => {
  return (
    <div className="flex flex-col justify-start items-center gap-5 py-5">
      <h1 className="font-bold text-xl">Instagram Insights 📊</h1>

      <div className="flex flex-col justify-center items-center">
        <Button variant="filled">
          <span>Connect Instagram</span>
        </Button>
        <span className="text-xs text-gray-500">This feature is in development</span>
      </div>

      <InstagramConstants />
    </div>
  );
};

export default Instagram;
