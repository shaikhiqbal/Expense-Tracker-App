import { useEffect } from 'react';

export const useVisitTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL || ''}/api/visitors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        // Silently fail
      }
    };

    trackVisit();
  }, []);
};