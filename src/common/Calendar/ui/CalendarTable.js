import React from "react";
import calendarHelpers from "../helpers";

const MONTHS = new Array(12).fill(0).map((a, i) => i + 1 + "월");
const DAYS = new Array(7).fill(0).map((a, i) => i + 1);

const CalendarTable = propValues => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const { weekName, isSameDay, isPast } = calendarHelpers(MONTHS, DAYS);
  const { value, minDate, tableData, year, month, handleSelectDay } = propValues;
  const renderHeader = dayOfWeek => (
    <th scope="col" key={dayOfWeek}>
      <abbr title={weekName(dayOfWeek)}>{weekName(dayOfWeek)}</abbr>
    </th>
  );
  const renderWeek = (days, index) => (
    <tr key={`${index}th-week`}>{days.map(renderDay)}</tr>
  );
  const weeks = () => {
    const weekCount = Math.ceil(days().length / 7);
    return [...Array(weekCount)].map((_, i) =>
      days().slice(i * 7, (i + 1) * 7)
    );
  };
  const days = () => {
    const daysInMonth = tableData.daysInMonth;
    const offset = tableData.firstWeekStartsAt;
    const leftPad = [...Array(offset < 7 ? offset : 0)].map(() => null);
    const dateTable = [...Array(daysInMonth)].map(
      (_, i) => new Date(year, month, i + 1)
    );
    return leftPad.concat(dateTable);
  };

  const renderDay = (day, index) => {
    const isToday = day && isSameDay(day, date);
    const isActive = day && isSameDay(value, day);
    const isDisabled = day && isPast(day, minDate) && !isToday;
    return (
      <td
        className={[
          "c-day",
          isDisabled ? "is-disabled" : null,
          isToday ? "is-today" : null,
          isActive ? "is-active" : null
        ]
          .filter(v => v)
          .join(" ")}
        key={`${year}-${month}-${index}th-day`}
        onClick={isDisabled ? null : () => handleSelectDay(day)}
      >
        {day ? day.getDate() : ""}
      </td>
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>{[...Array(7)].map((_, i) => renderHeader(i))}</tr>
        </thead>
        <tbody>{weeks().map(renderWeek)}</tbody>
      </table>
    </div>
  );
};


export default CalendarTable;
