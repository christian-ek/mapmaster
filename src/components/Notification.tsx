import React, { useEffect, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import INotification from '../interfaces/INotification';
import { NotificationContext } from '../contexts/NotificationContext';

interface NotificationProps {
  notification: INotification | null;
}

interface Toast {
  id: string;
}

/**
 * Used for displaying notifications.
 */
const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const { clearNotification } = useContext(NotificationContext);

  const showToast = () => {
    if (!notification) return;

    const duration = 10000;
    const toastContent = (t: Toast) => (
      <span>
        {notification.message}
        <button
          onClick={() => toast.dismiss(t.id)}
          className="close-button"
          type="button"
        >
          ×
        </button>
      </span>
    );

    switch (notification.type) {
      case 'success':
        toast.success(toastContent, { duration });
        break;
      case 'error':
        toast.error(toastContent, { duration });
        break;
      case 'icon':
        toast(toastContent, { icon: notification.icon, duration });
        break;
      default:
        toast(toastContent, { duration });
    }

    setTimeout(clearNotification, duration);
  };

  useEffect(showToast, [notification, clearNotification]);

  return <Toaster />;
};

export default Notification;
