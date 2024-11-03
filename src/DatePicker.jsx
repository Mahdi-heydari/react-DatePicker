/* eslint-disable react/prop-types */
import { useState } from "react";
import moment from "moment-jalaali";
moment.loadPersian({ usePersianDigits:  true });

function DatePicker({ onSelect, startDate, dateType }) {
  // moment.loadPersian({ usePersianDigits: dateType === "gregorian" ? false : true });
  const [currentMonth, setCurrentMonth] = useState(moment());
  const startMoment = moment(startDate);

  const daysInMonth = Array.from(
    {
      length: dateType === "gregorian"
        ? currentMonth.daysInMonth()
        : currentMonth.clone().startOf("jMonth").add(1, "jMonth").subtract(1, "days").jDate()
    },
    (_, i) => currentMonth.clone().startOf(dateType === "gregorian" ? "month" : "jMonth").add(i, "days")
  );

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) =>
      dateType === "gregorian"
        ? prevMonth.clone().subtract(1, "month")
        : prevMonth.clone().subtract(1, "jMonth")
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) =>
      dateType === "gregorian"
        ? prevMonth.clone().add(1, "month")
        : prevMonth.clone().add(1, "jMonth")
    );
  };

  const handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value);
    const newMonth = dateType === "gregorian"
      ? currentMonth.clone().set("year", selectedYear)
      : currentMonth.clone().jYear(selectedYear);
    setCurrentMonth(newMonth);
  };

  const incrementYear = () => {
    setCurrentMonth((prevMonth) =>
      dateType === "gregorian"
        ? prevMonth.clone().add(1, "year")
        : prevMonth.clone().add(1, "jYear")
    );
  };

  const decrementYear = () => {
    setCurrentMonth((prevMonth) =>
      dateType === "gregorian"
        ? prevMonth.clone().subtract(1, "year")
        : prevMonth.clone().subtract(1, "jYear")
    );
  };

  const generateYearOptions = () => {
    const currentYear = dateType === "gregorian" ? currentMonth.year() : currentMonth.jYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;

    return Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
  };

  const years = generateYearOptions();
  const currentYear = dateType === "gregorian" ? currentMonth.year() : currentMonth.jYear();

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <button className="text-xl hover:text-blue-500" onClick={handlePreviousMonth}>{"<"}</button>
        <h2 className="text-lg font-semibold text-center">
          {dateType === "gregorian" ? currentMonth.format("MMMM YYYY") : currentMonth.format("jMMMM jYYYY")}
        </h2>
        <button className="text-xl hover:text-blue-500" onClick={handleNextMonth}>{">"}</button>
      </div>

      <div className="flex items-center mb-4  justify-between">
        <button className="text-xl font-extrabold py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-400" onClick={decrementYear}>-</button>
        <select
          value={currentYear}
          onChange={handleYearChange}
          className="mx-2 text-center w-20 h-7 border rounded"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button className="text-xl font-extrabold py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-400" onClick={incrementYear}>+</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-gray-600 mb-2">
        <span>{dateType === "gregorian" ? "Sa" : "شن"}</span>
        <span>{dateType === "gregorian" ? "Su" : "یک"}</span>
        <span>{dateType === "gregorian" ? "Mo" : "دو"}</span>
        <span>{dateType === "gregorian" ? "Tu" : "سه"}</span>
        <span>{dateType === "gregorian" ? "We" : "چه"}</span>
        <span>{dateType === "gregorian" ? "Th" : "پن"}</span>
        <span>{dateType === "gregorian" ? "Fr" : "جم"}</span>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: daysInMonth[0].day() + 1 }).map((_, i) => (
          <div key={`empty-${i}`} className="w-8 h-8"></div>
        ))}
        {daysInMonth.map((day) => {
          const isToday = day.isSame(moment(), "day");
          const isDisabled = startDate && day.isBefore(startMoment, "day");

          return (
            <button
              disabled={isDisabled}
              key={day.format(dateType === "gregorian" ? "YYYY-MM-DD" : "jYYYY-jM-jD")}
              onClick={() => !isDisabled && onSelect(day)}
              className={`w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm hover:bg-blue-200 transition duration-200 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${isToday ? "border-2 border-blue-500" : ""}`}
            >
              {day.format(dateType === "gregorian" ? "D" : "jD")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DatePicker;
