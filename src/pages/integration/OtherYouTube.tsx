import youtubeIcon from '@/assets/isometric/youtube_analytics.png';
import CloutEmpty from '@/components/CloutEmpty';

interface Props {
  username: string;
}

const NotConnected = ({ username }: Props) => {
  return (
    <div>
      <CloutEmpty icon={youtubeIcon} message={`@${username} hasn't connected their YouTube yet!`} />
    </div>
  );
};

const OtherYouTube = ({ username }: Props) => {
  return (
    <div>
      <NotConnected username={username} />
    </div>
  );
};

export default OtherYouTube;
