import { useState, useEffect, useCallback } from 'react';

const useOverflowCheck = (ref: React.RefObject<HTMLDivElement>) => {
  const [isOverflow, setIsOverflow] = useState(false);

  const checkOverflow = useCallback(() => {
    const container = ref.current;
    if (container) {
      const overflowing = container.scrollWidth > container.clientWidth;
      setIsOverflow(overflowing);
    }
  }, [ref]);

  useEffect(() => {
    // Check overflow initially
    checkOverflow();

    // Add event listener for window resize
    window.addEventListener('resize', checkOverflow);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [checkOverflow]);

  return isOverflow;
};

export default useOverflowCheck;
