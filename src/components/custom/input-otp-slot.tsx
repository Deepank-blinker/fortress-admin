import { InputOTPSlot } from '@/components/ui/input-otp';
import React from 'react';

function StyledInputOtpSlot({
  defaultValue,
  index,
  onChange,
  className,
}: {
  index: number;
  defaultValue: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <InputOTPSlot
      index={index}
      className={` w-10 h-12 sm:h-14 sm:w-12 bg-neutral-20 text-lg text-neutral-500 border border-neutral-40 rounded-lg focus:outline-none focus:ring-0 focus:border-transparent  focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent active:outline-none active:ring-0 active:border-transparent  text-center font-semibold ${className}`}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
}

export default StyledInputOtpSlot;
