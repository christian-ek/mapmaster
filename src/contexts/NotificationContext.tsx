import React, { createContext, useState, useMemo } from 'react';
import INotification from '../interfaces/INotification';

interface NotificationContextType {
  notification: INotification | null;
  setNotification: (notification: INotification | null) => void;
  clearNotification: () => void;
}

/**
 * Used for managing the notification state.
 */
export const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  setNotification: () => {},
  clearNotification: () => {},
});

/**
 * Used for providing the notification state and dispatch function to the components.
 */
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<INotification | null>(null);
  const clearNotification = () => setNotification(null);

  const contextValue = useMemo(
    () => ({
      notification,
      setNotification,
      clearNotification,
    }),
    [notification, setNotification]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
