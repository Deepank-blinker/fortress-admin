import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

interface TooltipProps {
  id: string;
  content: string;
  children: React.ReactNode;
  place?: 'top' | 'right' | 'bottom' | 'left';
  variant?: 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
  delayShow?: number;
  delayHide?: number;
}

const Tooltip = ({
  id,
  content,
  children,
  place = 'top',
  variant = 'dark',
  className = '',
  delayShow = 500,
  delayHide = 200,
}: TooltipProps) => {
  return (
    <>
      <span
        data-tooltip-id={id}
        data-tooltip-content={content}
        className={`${className}`}
      >
        {children}
      </span>

      <ReactTooltip
        id={id}
        place={place}
        variant={variant}
        delayShow={delayShow}
        delayHide={delayHide}
        className={`bg-neutral-40 text-neutral-900`}
        style={{
          backgroundColor: 'hsl(var(--neutral-40))',
          color: 'hsl(var(--neutral-900))',
          fontWeight: 'bold',
        }}
      />
    </>
  );
};

export default Tooltip;
