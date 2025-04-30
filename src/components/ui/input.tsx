import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  icon?: React.ReactNode;
  iconDirection?: 'left' | 'right';
  variant?: 'primary' | 'secondary' | 'danger';
  onIconClick?: () => void;
  wrapperStyles?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      iconDirection = 'right',
      variant = 'primary',
      onIconClick,
      wrapperStyles,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        'bg-neutral-20 text-neutral-100 placeholder-gray-neutral-100 border-neutral-40 border ',
      secondary: 'bg-white text-gray-700 placeholder-gray-400 border-gray-200 ',
      danger: 'bg-red-50 text-red-700 placeholder-red-500 border-red-300 ',
    };

    return (
      <div className={`relative flex items-center ${wrapperStyles} `}>
        {icon && iconDirection === 'left' && (
          <div
            className="absolute left-3 flex items-center justify-center text-muted-foreground"
            onClick={onIconClick}
          >
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full !text-black rounded-md px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-blue-400',
            variants[variant],
            icon && iconDirection === 'left' && 'pl-10',
            icon && iconDirection === 'right' && 'pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {icon && iconDirection === 'right' && (
          <div
            className="absolute right-3 flex items-center justify-center text-muted-foreground"
            onClick={onIconClick}
          >
            {icon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
