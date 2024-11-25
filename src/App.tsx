import React from "react";
import DateRangePicker from "./components/DateRangePicker/DateRangePicker";
import { DateRange } from "./components/DateRangePicker/types";

const App: React.FC = () => {
  const handleRangeChange = (
    selectedRange: DateRange,
    weekendDates: string[]
  ): void => {
    console.log("Selected Range:", selectedRange);
    console.log("Weekend Dates:", weekendDates);
  };

  return (
    <div>
      <h1>Weekday Date Range Picker</h1>

      <DateRangePicker
        predefinedRanges={[
          { label: "Last 7 Days", range: ["2024-11-18", "2024-11-24"] },
          { label: "Last 30 Days", range: ["2024-10-26", "2024-11-24"] },
        ]}
        onChange={handleRangeChange}
      />
    </div>
  );
};

export default App;
