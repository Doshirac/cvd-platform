import { useState, useEffect } from 'react';

export function useTruncateLength(customLength?: number) {
  const getDefaultLength = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 17 : 40;
    }
    return 40;
  };

  const [truncateLength, setTruncateLength] = useState(() =>
    customLength !== undefined ? customLength : getDefaultLength()
  );

  useEffect(() => {
    if (customLength !== undefined) {
      setTruncateLength(customLength);
      return;
    }
    const handleResize = () => {
      setTruncateLength(getDefaultLength());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [customLength]);

  return truncateLength;
}
