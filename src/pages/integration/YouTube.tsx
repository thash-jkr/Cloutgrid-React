import { Button } from 'actify';
import { YoutubeConstants } from './IntegrationConstants';

const YouTube = () => {
  return (
    <div className="flex flex-col justify-start items-center gap-5 py-5">
      <h1 className="font-bold text-xl">YouTube Analytics 📈</h1>

      <div className="flex flex-col justify-center items-center">
        <Button variant="filled">
          <span>Connect YouTube</span>
        </Button>
        <span className="text-xs text-gray-500">This feature is in development</span>
      </div>

      <YoutubeConstants />
    </div>
  );
};

export default YouTube;
