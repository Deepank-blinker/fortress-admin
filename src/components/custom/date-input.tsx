import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { addDays, format, setMonth, setYear, subYears } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import Typography from './typography';

export interface DateExtraProps {
  disableFuture?: boolean;
  disablePast?: boolean;
  minSelectableAge?: number;
}
interface DateInputProps {
  placeholder: string;
  onChange: (_date: Date | undefined) => void;
  value?: Date | undefined;
  dateProps?: DateExtraProps;
  disabled?: boolean;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DateInput: React.FC<DateInputProps> = ({
  placeholder,
  onChange,
  value,
  dateProps: { disableFuture, disablePast, minSelectableAge } = {},
  disabled,
}) => {
  // Define boundaries based on props
  const minAgeDate = minSelectableAge
    ? subYears(new Date(), minSelectableAge)
    : null;
  const currentYear = new Date().getFullYear();
  const oldestYear = disablePast ? currentYear : 1900;
  const maxSelectableYear = disableFuture
    ? (minAgeDate?.getFullYear() ?? currentYear)
    : 2100;

  const years = Array.from(
    { length: maxSelectableYear - oldestYear + 1 },
    (_, i) => maxSelectableYear - i
  ).filter((year) => year <= maxSelectableYear);

  const futureStartDate = disablePast ? addDays(new Date(), 1) : null; // Earliest selectable future date
  const pastStartDate = disableFuture ? new Date('1900-01-01') : null; // Latest selectable past date

  // Determine the correct default displayed date
  const defaultStartDate = value
    ? value
    : disableFuture
      ? minSelectableAge
        ? minAgeDate!
        : new Date()
      : (minAgeDate ?? futureStartDate ?? new Date());

  const [displayedDate, setDisplayedDate] =
    React.useState<Date>(defaultStartDate);
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [open, setOpen] = React.useState(false);

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      // Normalize to local noon (12 PM)
      const localNoon = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
        12,
        0,
        0
      );
      setDate(localNoon);
      setDisplayedDate(localNoon);
      onChange(localNoon);
    } else {
      setDate(undefined);
      onChange(undefined);
    }
    setOpen(false);
  };

  const handleMonthChange = (newMonth: string) => {
    const monthIndex = months.indexOf(newMonth);
    setDisplayedDate(setMonth(displayedDate, monthIndex));
  };

  const handleYearChange = (newYear: string) => {
    setDisplayedDate(setYear(displayedDate, parseInt(newYear, 10)));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-between bg-neutral-20 text-neutral-700 text-left font-normal',
            !date && 'text-muted-foreground'
          )}
          disabled={disabled}
        >
          {date ? (
            format(date, 'PPP')
          ) : (
            <Typography variant="small" color="text-neutral-100">
              {placeholder}
            </Typography>
          )}
          <CalendarIcon className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 max-h-[calc(100vh-40px)] overflow-y-auto focus-within:outline-none"
        align="start"
        side="bottom"
        sideOffset={8}
        alignOffset={0}
        collisionPadding={{ top: 200 }}
        avoidCollisions
      >
        <div className="flex flex-col">
          <div className="flex justify-between space-x-2 p-3">
            <Select
              onValueChange={handleMonthChange}
              value={months[new Date(displayedDate).getMonth()]}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent position="popper" side="top">
                <div className="max-h-60 overflow-y-auto">
                  {months.map((month) => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>

            <Select
              onValueChange={handleYearChange}
              value={String(new Date(displayedDate).getFullYear())}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent position="popper" side="top">
                <div className="max-h-60 overflow-y-auto">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            month={displayedDate}
            onMonthChange={setDisplayedDate}
            initialFocus
            fromYear={oldestYear}
            toYear={maxSelectableYear}
            fromMonth={futureStartDate ?? pastStartDate ?? undefined}
            toMonth={disableFuture ? (minAgeDate ?? new Date()) : undefined}
            disabled={(date) => {
              if (disabled) return true;
              // Disable dates based on conditions, including minSelectableAge and disableFuture
              if (disableFuture && minSelectableAge && date > minAgeDate!)
                return true;
              if (disableFuture && date > new Date()) return true;
              if (disablePast && date < new Date()) return true;
              if (minSelectableAge && date > minAgeDate!) return true;
              return false;
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { DateInput };
