import { IoSpeedometerOutline } from "react-icons/io5";

interface Props {
  title: string;
}

export const Card: React.FC<Props> = ({ title }) => {
  return (
    <div className="shadow-lg w-1/4 p-5 rounded-md cursor-pointer">
      <div className="mb-3">
        <span className="font-bold text-lg">{title}</span>
      </div>
      <div className="flex items-center">
        <IoSpeedometerOutline className="text-4xl" />
        <span className="ml-5">200 Km/jam</span>
      </div>
    </div>
  );
};
