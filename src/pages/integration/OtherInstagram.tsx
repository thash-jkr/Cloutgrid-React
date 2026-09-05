import CloutEmpty from '@/components/CloutEmpty';
import instagramIcon from '@/assets/isometric/instagram_insight.png';

interface Props {
  username: string;
}

const NotConnected = ({ username }: Props) => {
  return (
    <div>
      <CloutEmpty
        icon={instagramIcon}
        message={`@${username} hasn't connected their Instagram yet!`}
      />
    </div>
  );
};

const OtherInstagram = ({ username }: Props) => {
  return (
    <div>
      <NotConnected username={username} />
    </div>
  );
};

export default OtherInstagram;
