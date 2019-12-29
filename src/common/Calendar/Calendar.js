import React, { useState } from "react";
import PropTypes from "prop-types";
import helpers from "./helpers";
import CalendarHeader from "./ui/CalendarHeader";
import CalendarSelectBox from "./ui/CalendarSelect";
import CalendarTable from "./ui/CalendarTable";
import "./styles.css";

const MONTHS = new Array(12).fill(0).map((a, i) => i + 1 + "월");
const DAYS = new Array(7).fill(0).map((a, i) => i + 1);

export const calendarHelpers = helpers(MONTHS, DAYS);

const Calendar = props => {
  const { value, minDate, onSelectDay } = props;
  const [month, setMonth] = useState(value.getMonth());
  const [year, setYear] = useState(value.getFullYear());
  const { yearList, monthList, monthName } = calendarHelpers;
  const {calendar} = createCalendar(new Date(month));

  const prevMonth = () => {
    setMonth(month !== 0 ? month - 1 : 11);
    setYear(month !== 0 ? year : year - 1);
  };
  const nextMonth = () => {
    setMonth(month !== 11 ? month + 1 : 0);
    setYear(month !== 11 ? year : year + 1);
  };

  return (
    <div className="c-calendar">
      <CalendarHeader
        title={`${year}년 ${monthName(month - 1)}`}
        month={month}
        year={year}
        onPrevClick={prevMonth}
        onNextClick={nextMonth}
      />
      <CalendarSelectBox
        label={year}
        data={yearList(50)}
        defaultValue={year}
        handleChange={setYear}
      />
      <CalendarSelectBox
        label={`${month + 1}월`}
        data={monthList}
        defaultValue={month + 1}
        handleChange={m => setMonth(m - 1)}
      />
      <CalendarTable
        month={month}
        year={year}
        tableData={calendar.data}
        minDate={minDate}
        handleSelectDay={onSelectDay}
        value={value}
      />
    </div>
  );
};
export const defaultProps = {
  value: new Date(),
  disablePrevDate: null
};
Calendar.propTypes = {
  value: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onSelectDay: PropTypes.func
};
Calendar.defaultProps = defaultProps;

export default Calendar;
