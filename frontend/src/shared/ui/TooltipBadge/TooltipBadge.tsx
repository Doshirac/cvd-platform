import { useState, useEffect } from 'react';
import styles from './TooltipBadge.module.scss';
import type { TooltipBadgeProps } from './TooltipBadge.types';

export const TooltipBadge = ({
  code,
  fullName,
  tooltip,
  variant = 'primary',
  className,
}: TooltipBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const handleClick = () => {
    if (isTouchDevice) {
      setIsHovered(!isHovered);
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovered(false);
    }
  };

  // Detect touch device on mount
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouchDevice();
  }, []);

  const displayText = fullName ? code : code;
  const tooltipText = tooltip || (fullName ? `${code} - ${fullName}` : code);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.badge} ${styles[variant]} ${className || ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={tooltipText}
      >
        {displayText}
      </div>
      {isHovered && (
        <div className={styles.tooltip} role="tooltip">
          {tooltipText}
        </div>
      )}
    </div>
  );
};
