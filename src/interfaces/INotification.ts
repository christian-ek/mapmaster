interface Notification {
  message: string;
  icon?: string;
  type: 'success' | 'error' | 'icon' | 'default';
}

export default Notification;
