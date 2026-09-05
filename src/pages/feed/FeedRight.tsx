import { useState } from 'react';
import { useAppSelector } from '@/app/hooks';
import Notifications from './Notifications';
import { Bell, ChevronDown } from 'lucide-react';

export default function FeedRight() {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const { notifications } = useAppSelector((state) => state.feed);
  const count = notifications.length;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="group relative w-full cursor-pointer rounded-xl bg-white shadow">
        <div
          className="flex justify-center items-center w-full"
          onClick={() => setDropDownOpen(!dropDownOpen)}
        >
          <h1 className="flex justify-center items-center my-3 text-xl font-semibold gap-1">
            <div className="max-w-0 overflow-hidden transition-all duration-1000 ease-in-out group-hover:max-w-50">
              <span className="mr-1 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
                Notifications
              </span>
            </div>
            
            <Bell className="h-5 w-5" />
            <div className="flex justify-center items-center h-5 w-5 rounded-full bg-secondary p-3">
              <span className={`text-white ${count < 10 ? 'text-sm' : 'text-xs'}`}>
                {count}
              </span>
            </div>
            <span
              className={`absolute right-3 transition-transform duration-500 ${
                !dropDownOpen && 'duration-300 group-hover:scale-125 group-hover:rotate-12'
              } ${dropDownOpen ? 'rotate-180' : ''}`}
            >
              <ChevronDown className="h-5 w-5" />
            </span>
          </h1>
        </div>

        <div
          className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
            dropDownOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="max-h-96 min-h-0">
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
}
