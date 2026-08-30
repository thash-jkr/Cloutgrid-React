import CloutLoading from './CloutLoading';

interface CloutEmptyProps {
  icon: string;
  message: string;
  isLoading?: boolean;
}

const CloutEmpty = ({ icon, message, isLoading = false }: CloutEmptyProps) => {
  return (
    <div className="w-full py-5">
      <div className="flex flex-col w-full items-center justify-center gap-2 text-center">
        <img src={icon} alt="" className="h-52 w-auto object-contain" />
        <div className="relative grid place-items-center">
          <span
            className={`col-start-1 row-start-1 transition-opacity duration-200 ${
              isLoading ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <CloutLoading size="lg" />
          </span>
          <span
            className={`col-start-1 row-start-1 font-semibold text-gray-500 transition-opacity duration-200 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {message}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CloutEmpty;
