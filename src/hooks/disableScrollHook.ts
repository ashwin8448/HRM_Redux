import { useEffect } from 'react';

const useDisableScroll = (shouldDisableScrolling:boolean) => {
  useEffect(() => {
    document.body.style.overflow = shouldDisableScrolling ? 'hidden' : 'auto';

    // Cleanup function to re-enable scrolling when the component unmounts or when the condition is no longer met
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [shouldDisableScrolling]);
};

export default useDisableScroll;
