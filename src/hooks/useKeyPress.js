import { useEffect } from 'react';

// Custom hook to handle keyboard presses
export const useKeyPress = (targetKey, callback) => {
  useEffect(() => {
    const keyPressHandler = (event) => {
      if (event.key === targetKey) {
        callback();
      }
    };

    window.addEventListener('keydown', keyPressHandler);

    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [targetKey, callback]);
};