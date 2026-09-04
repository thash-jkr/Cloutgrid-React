interface Props {
  text: string;
  bg?: string;
}

const CloutCapsule = ({ text, bg = 'bg-secondary' }: Props) => {
  return (
    <div>
      <span
        className={`px-3 py-2 ${bg} inline-block whitespace-nowrap overflow-hidden text-ellipsis
               rounded-full text-center text-xs font-bold text-white
               transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow`}
      >
        {text}
      </span>
    </div>
  );
};

export default CloutCapsule;
