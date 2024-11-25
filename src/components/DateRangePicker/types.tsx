export interface DateRange {
  dateRange: [startDate: string | null, endDate: string | null];
}

export interface PredefinedRange {
  label: string;
  range: [string, string]; 
}

export interface WeekdayDateRangePickerProps {
  predefinedRanges?: PredefinedRange[];
  onChange: (selectedRange: DateRange, weekendDates: string[]) => void;
}
