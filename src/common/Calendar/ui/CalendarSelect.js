import React from "react";

const CalendarSelectBox = propValues => {
  const { label, data, defaultValue, handleChange } = propValues;
  const onSelect = e => handleChange(Number(e.target.value));

  return (
    <div className="c_calendar__select">
      <span className="c_calendar__label">{label}</span>
      <select defaultValue={defaultValue} onChange={onSelect}>
        {data.map((v, i) => (
          <option value={String(v).replace(/\D/g, "")} key={`opt-${v}-${i}`}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CalendarSelectBox;
