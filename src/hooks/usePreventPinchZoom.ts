import { useEffect } from 'react';

/**
 * Used to prevent pinch zoom on multi-touch trackpad gestures and touchscreen
 * this is to prevent the overlays from disappearing when accidentally zooming
 */
const usePreventPinchZoom = () => {
  /**
   * useEffect is used to prevent pinch zoom on multi-touch trackpad gestures and touchscreen
   */
  useEffect(() => {
    const preventPinchZoom = (e: TouchEvent | WheelEvent) => {
      if (
        (e instanceof TouchEvent && e.touches.length > 1) ||
        (e instanceof WheelEvent && e.ctrlKey)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventPinchZoom as EventListener, {
      passive: false,
    });

    document.addEventListener('touchstart', preventPinchZoom as EventListener, {
      passive: false,
    });

    return () => {
      document.removeEventListener('wheel', preventPinchZoom as EventListener);
      document.removeEventListener(
        'touchstart',
        preventPinchZoom as EventListener
      );
    };
  }, []);
};

export default usePreventPinchZoom;
