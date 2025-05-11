'use client';

import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Typography from './typography';
import { Input } from '../ui/input';

interface Option {
  value: string;
  label: string;
  className?: string;
  buttonClassName?: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onSelect: (_value: string) => void;
  onCreate?: (_value: string) => void | { value: string; label: string };
  value?: string;
  searchPlaceholder?: string;
  className?: string;
  icon?: React.ReactNode;
  isUpperCase?: boolean;
  isPending?: boolean;
  order?: 'asc' | 'desc';
  noOptionsMessage?: string;
  noOptionSearchPlaceholder?: string;
  disabled?: boolean;
}

export const ComboBox: React.FC<SelectProps> = ({
  options,
  placeholder = 'Select option',
  searchPlaceholder = 'Search...',
  value,
  onSelect,
  onCreate,
  className,
  icon,
  isUpperCase,
  isPending,
  order,
  noOptionsMessage = 'No options found.',
  noOptionSearchPlaceholder = 'Search...',
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [filteredOptions, setFilteredOptions] =
    React.useState<Option[]>(options);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (order === 'asc') {
      setFilteredOptions(
        options?.sort((a, b) => a?.label?.localeCompare(b?.label))
      );
    } else if (order === 'desc') {
      setFilteredOptions(
        options?.sort((a, b) => b?.label?.localeCompare(a?.label))
      );
    } else {
      setFilteredOptions(options);
    }
  }, [order, options]);

  // Get the width of the button and set it as the width for the popover content
  const buttonWidth = buttonRef.current
    ? buttonRef.current.offsetWidth
    : 'auto';

  const selectedOption = options?.find((option) => option?.value === value);

  // Filter options based on search input
  React.useEffect(() => {
    if (!inputValue) {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter((option) =>
          option?.label?.toLowerCase()?.includes(inputValue?.toLowerCase())
        )
      );
    }
  }, [inputValue, options]);

  // Check if input value already exists in options
  const inputExists = options?.some(
    (option) => option?.label?.toLowerCase() === inputValue?.toLowerCase()
  );

  // Handle Enter Key Selection
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filteredOptions.length > 0) {
      onSelect(filteredOptions[0].value); // Select first matching option
      setInputValue(''); // Clear search input
      setOpen(false); // Close dropdown
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'w-full justify-between gap-2.5 bg-neutral-20 border border-neutral-40 text-left font-normal ',
            className,
            selectedOption?.buttonClassName
          )}
        >
          {icon && icon}

          <Typography
            variant="small"
            weight="regular"
            color={
              selectedOption?.label ? 'text-neutral-900' : 'text-neutral-100'
            }
            className={cn(
              ' truncate text-ellipsis overflow-hidden whitespace-nowrap ',
              selectedOption?.className
            )}
          >
            {selectedOption?.label || placeholder}
          </Typography>

          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: buttonWidth }}
        className="p-2 bg-white border border-gray-300 rounded-md shadow-md"
      >
        <Input
          type="text"
          placeholder={
            options?.length === 0
              ? noOptionSearchPlaceholder
              : searchPlaceholder
          }
          value={inputValue}
          onChange={(e) =>
            setInputValue(
              isUpperCase ? e.target.value.toUpperCase() : e.target.value
            )
          }
          onKeyDown={handleKeyDown} // <-- Added keydown event
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <div
          onWheel={(e) => e.stopPropagation()}
          className="max-h-48 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          {isPending ? (
            <Typography
              variant="small"
              weight="regular"
              color={'text-neutral-900'}
              className="flex-1 truncate text-ellipsis overflow-hidden whitespace-nowrap p-2"
            >
              Loading...
            </Typography>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100'
                )}
                onClick={() => {
                  onSelect(option.value);
                  setOpen(false);
                }}
              >
                <Typography
                  variant="small"
                  weight="regular"
                  color={
                    selectedOption?.label ? 'text-neutral-900' : 'text-black'
                  }
                  className="flex-1 truncate text-ellipsis overflow-hidden whitespace-nowrap w-10"
                >
                  {option.label}
                </Typography>
                {value === option.value && <Check className="ml-auto" />}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">{noOptionsMessage}</div>
          )}
        </div>

        {/* Show "Create" option only if onCreate exists and input does not already exist */}
        {onCreate && inputValue && !inputExists && (
          <div
            className="flex items-center gap-2 p-2 cursor-pointer text-primary hover:bg-gray-100"
            onClick={() => {
              onCreate(inputValue);
              setOpen(false);
            }}
          >
            <PlusCircle className="h-4 w-4" />
            Create {inputValue}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
