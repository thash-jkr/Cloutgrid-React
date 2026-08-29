import CloutEmpty from '@/components/CloutEmpty';
import { timeAgo } from '@/utils/timeAgo';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bell from '@/assets/isometric/bell.png';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchNotifications, readNotification } from '@/slices/feedSlice';
import { useEffect } from 'react';

const Notifications = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.feed);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleClose = (id: number) => {
    dispatch(readNotification(id));
  };

  return (
    <div className="h-full min-h-0 w-full overflow-y-auto border-t p-0">
      {notifications.length > 0 ? (
        <ul className="w-full divide-y">
          {notifications.map((notification) => (
            <li key={notification.id} className="group/item w-full">
              <div className="flex w-full items-center justify-between gap-1 p-2 hover:bg-slate-50">
                <div className="flex w-full items-start justify-center gap-3">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={notification.photo}
                    alt="Profile"
                  />
                  <div className="flex w-full flex-col">
                    <span className="text-sm font-semibold">{notification.message}</span>
                    <span className="text-xs text-slate-500">
                      {timeAgo(notification.created_at)}
                    </span>
                  </div>
                </div>

                <FontAwesomeIcon
                  icon={faClose}
                  className="text-gray-200 opacity-0 transition-opacity duration-200 group-hover/item:opacity-100 hover:text-secondary"
                  onClick={() => handleClose(notification.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <CloutEmpty icon={bell} message="No new notifications!" />
      )}
    </div>
  );
};

export default Notifications;