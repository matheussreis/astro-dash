import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Calendar, CalendarDayButton } from '@/components/ui/Calendar';
import { formatDate } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import type { DayButtonProps } from 'react-day-picker';

interface DatePickerProps {
  value: Date;
  onChange: (newValue: Date) => void;
}

function DayButton({ day, modifiers, ...props }: DayButtonProps) {
  const isFuture = modifiers.disabled && day.date > new Date();
  return (
    <CalendarDayButton
      day={day}
      modifiers={modifiers}
      title={isFuture ? 'Future dates are not available' : undefined}
      {...props}
    />
  );
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className={cn(
            'w-72 justify-start text-left font-normal',
            'bg-secondary dark:bg-secondary',
            'text-secondary-foreground dark:text-secondary-foreground',
            'hover:bg-secondary/90 dark:hover:bg-secondary/90',
            'p-6 border border-primary/30',
            !value && 'text-muted-foreground/70',
          )}
        >
          <CalendarIcon />
          {value ? formatDate(value) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          timeZone="UTC"
          selected={value}
          onSelect={(newDate) => newDate && onChange(newDate)}
          disabled={(date) => date > new Date()}
          captionLayout="dropdown"
          components={{ DayButton }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
