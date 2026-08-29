interface CloutEmptyProps {
  icon: string;
  message: string;
}

const CloutEmpty = ({ icon, message }: CloutEmptyProps) => {
  return (
    <div className="w-full py-5">
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <img src={icon} alt="" className="h-52 w-auto object-contain" />
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default CloutEmpty;
