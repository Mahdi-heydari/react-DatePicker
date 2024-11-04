import { useState } from "react";
import moment from "moment";
import "moment-jalaali"; 
import DatePicker from "./DatePicker";

function DateRangePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [dateType, setDateType] = useState("gregorian");

  const handleInputClick = (input) => {
    setActiveInput(input);
    setIsDatePickerVisible(true);
  };

  const handleDateSelect = (date) => {
    if (activeInput === "start") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setIsDatePickerVisible(false);

    console.log("RRRR : ", startDate) // look here !!!!!!!!!!
  };

  const handelToggleDateType = () => {
    setDateType((prev) => (prev === "gregorian" ? "jalali" : "gregorian"));
  };

  return (
    <div className="flex flex-col items-center gap-20 p-5">
      <div className="flex gap-10 items-center">
        <h1 className="font-medium">
          {startDate && endDate ? `${endDate.diff(startDate, "days")} Days you
          Selected` : `you selected ${startDate ? dateType === "gregorian"
          ? moment(startDate).format("YYYY-M-D")
          : moment(startDate).format("jYYYY-jMM-jDD") : 0} `} 
        </h1>
        <button className="text-md  py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-400" onClick={handelToggleDateType}>change</button>
      </div>
      <div className="flex gap-52">
        <div className="flex flex-col gap-3">
          <label>
            Start Date:
            <input
              type="text"
              value={
                startDate
                  ? dateType === "gregorian"
                    ? moment(startDate).format("YYYY-M-D")
                    : moment(startDate).format("jYYYY-jMM-jDD")
                  : ""
              }
              onClick={() => handleInputClick("start")}
              readOnly
            />
          </label>
          {isDatePickerVisible && activeInput === "start" && (
            <DatePicker onSelect={handleDateSelect} dateType={dateType} />
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label>
            End Date:
            <input
              type="text"
              value={
                endDate
                  ? dateType === "gregorian"
                    ? moment(endDate).format("YYYY-M-D")
                    : moment(endDate).format("jYYYY-jM-jD")
                  : ""
              }
              onClick={() => handleInputClick("end")}
              readOnly
            />
          </label>
          {isDatePickerVisible && activeInput === "end" && (
            <DatePicker
              onSelect={handleDateSelect}
              startDate={startDate ? moment(startDate) : null}
              dateType={dateType}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DateRangePicker;
