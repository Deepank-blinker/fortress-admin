'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: 'small' | 'medium' | 'large'; // Size prop
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size = 'medium', disabled, ...props }, ref) => {
  // Define size classes
  const sizeClasses = {
    small: 'h-4 w-4', // Smaller size
    medium: 'h-5 w-5', // Default size
    large: 'h-6 w-6', // Larger size
  };

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      disabled={disabled}
      className={cn(
        'peer shrink-0 border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:rounded-sm disabled:opacity-50 data-[state=checked]:bg-primary-100 data-[state=checked]:border-transparent data-[state=checked]:text-success-300 disabled:border-0 disabled:bg-neutral-40 disabled:text-neutral-100',
        sizeClasses[size], // Apply size classes
        className
      )}
      {...props}
    >
      {!disabled ? (
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <Check className="h-4 w-4 text-success-300" />
        </CheckboxPrimitive.Indicator>
      ) : (
        <div
          className={cn(
            'flex items-center justify-center font-bold text-neutral-100'
          )}
        >
          —
        </div>
      )}
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
