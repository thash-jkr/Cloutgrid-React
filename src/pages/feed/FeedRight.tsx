import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronDown,
  faClose,
  faTrashAlt,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchNotifications, readNotification } from "@/slices/feedSlice";
import { timeAgo } from "@/utils/timeAgo";

export default function FeedRight() {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleClose = (id: number) => {
    dispatch(readNotification(id));
  };

  const { notifications } = useAppSelector((state) => state.feed);
  const count = notifications.length;

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="group relative w-full cursor-pointer rounded-xl bg-white shadow">
        <div
          className="flex justify-center items-center w-full"
          onClick={() => setDropDownOpen(!dropDownOpen)}
        >
          <h1 className="flex justify-center items-center my-3 text-xl font-semibold">
            <div className="max-w-0 overflow-hidden transition-all duration-1000 ease-in-out group-hover:max-w-50">
              <span className="mr-1 opacity-0 transition-opacity duration-1000 group-hover:opacity-100">
                Notifications
              </span>
            </div>
            <span>
              <FontAwesomeIcon icon={faBell} />
            </span>
            <div className="flex justify-center items-center h-5 w-5 rounded-full bg-secondary p-3">
              <span
                className={`text-white ${count < 10 ? "text-sm" : "text-xs"} font-bold`}
              >
                {count}
              </span>
            </div>
            <span
              className={`absolute right-3 transition-transform duration-500 ${
                !dropDownOpen &&
                "duration-300 group-hover:scale-125 group-hover:rotate-12"
              } ${dropDownOpen ? "rotate-180" : ""}`}
            >
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </h1>
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            dropDownOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="thin-scrollbar flex max-h-96 w-full overflow-y-scroll border-t p-0">
              {notifications.length > 0 ? (
                <ul className="w-full divide-y">
                  {notifications.map((notification) => (
                    <li key={notification.id} className="w-full">
                      <div className="flex w-full items-center justify-between p-2 hover:bg-slate-50 gap-1">
                        <div className="flex justify-center items-start gap-3 w-full">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={notification.photo}
                            alt="Profile"
                          />

                          <div className="flex flex-col w-full">
                            <span className="text-sm font-semibold">{notification.message}</span>
                            <span className="text-xs text-slate-500">{timeAgo(notification.created_at)}</span>
                          </div>
                        </div>

                        <FontAwesomeIcon
                          icon={faClose}
                          className="text-gray-200 hover:text-secondary"
                          onClick={() => handleClose(notification.id)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="null-text">
                  <p>No unread notifications!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
