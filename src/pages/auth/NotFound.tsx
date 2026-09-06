import CloutEmpty from '@/components/CloutEmpty';
import NavBar from '@/components/NavBar';
import emptyIcon from '@/assets/isometric/error.png';

const NotFound = () => {
  return (
    <div className="container min-h-dvh mx-auto noselect flex justify-center items-center">
      <NavBar />

      <CloutEmpty icon={emptyIcon} message="Page not found!" />
    </div>
  );
};

export default NotFound;
