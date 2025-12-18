import { useState, useRef, useEffect } from 'react';

export const useDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDropdownClick = (event?: React.MouseEvent<HTMLDivElement>) => {
    if (event && dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
      return;
    }
    setShowDropdown(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return {
    showDropdown,
    dropdownRef,
    handleDropdownClick,
    closeDropdown,
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
  };
};
