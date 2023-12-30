import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

/**
 * Custom hook that returns the setNotification function from the NotificationContext.
 */
const useNotification = () => {
  const { setNotification } = useContext(NotificationContext);
  return setNotification;
};

export default useNotification;
