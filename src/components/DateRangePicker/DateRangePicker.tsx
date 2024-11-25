import React, { useState } from "react";
import "./DateRangePicker.css";
import { WeekdayDateRangePickerProps, DateRange } from "./types";

const DateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  predefinedRanges,
  onChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedRange, setSelectedRange] = useState(["", ""]);
  const daysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
  const generateMonthDays = (month: number, year: number) => {
    const days = [];
    for (let i = 1; i <= daysInMonth(month, year); i++) {
      const date = new Date(year, month, i);
      days.push({ date, isWeekend: isWeekend(date) });
    }
    return days;
  };
  const handleDateClick = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    if (isWeekend(date)) {
      return;
    }
    if (!selectedRange[0]) {
      setSelectedRange([formattedDate, ""]);
    } else if (!selectedRange[1] && formattedDate > selectedRange[0]) {
      setSelectedRange([selectedRange[0], formattedDate]);
    } else {
      setSelectedRange([formattedDate, ""]);
    }
  };
  const handleMonthChange = (increment: number) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };
  const calculateWeekendDates = () => {
    if (!selectedRange[0] || !selectedRange[1]) return [];
    const start = new Date(selectedRange[0]);
    start.setDate(start.getDate() + 1);
    const end = new Date(selectedRange[1]);
    const weekendDates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (isWeekend(d)) {
        weekendDates.push(d.toISOString().split("T")[0]);
      }
    }
    return weekendDates;
  };
  const handleRangeChange = () => {
    const weekendDates = calculateWeekendDates();
    const updatedDate = new Date(selectedRange[0]);
    updatedDate.setDate(updatedDate.getDate() + 1);
    console.log(
      "here ... ",
      updatedDate.toISOString().split("T")[0],
      selectedRange[1]
    );
    const dateRange: DateRange = {
      dateRange: [updatedDate.toISOString().split("T")[0], selectedRange[1]],
    };
    onChange(dateRange, weekendDates);
  };
  return (
    <div className="date-range-picker">
      <div className="controls">
        <button onClick={() => handleMonthChange(-1)}>Previous</button>
        <span>{`${currentYear} - ${currentMonth + 1}`}</span>
        <button onClick={() => handleMonthChange(1)}>Next</button>
      </div>
      <div className="calendar">
        {generateMonthDays(currentMonth, currentYear).map(
          ({ date, isWeekend }, index) => (
            <div
              key={index}
              className={`day ${isWeekend ? "weekend" : ""} ${
                date.toISOString().split("T")[0] === selectedRange[0] ||
                date.toISOString().split("T")[0] === selectedRange[1]
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                if (!isWeekend) handleDateClick(date);
              }}
            >
              {date.getDate()}
            </div>
          )
        )}
      </div>
      {predefinedRanges && (
        <div className="predefined-ranges">
          {predefinedRanges.map(({ label, range }) => (
            <button
              key={label}
              onClick={() => {
                console.log("data ... ", label, range);
                setSelectedRange(range);
                onChange({ dateRange: range }, calculateWeekendDates());
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <button className="confirm" onClick={handleRangeChange}>
        Confirm Range
      </button>
    </div>
  );
};

export default DateRangePicker;
