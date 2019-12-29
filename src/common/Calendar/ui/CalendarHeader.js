import React from "react";
import PropTypes from 'prop-types';

const CalendarHeader = propValues => {
  const { title, onPrevClick, onNextClick, month, year } = propValues;

  return (
    <div className="c-calendar__header">
      <div
        role="button"
        className={["c-calendar-arrow", "c-calendar-arrow__prev"].join(" ")}
        onClick={onPrevClick}
      >
        ◀
      </div>
      <h1 className="c-calendar-title">{title}</h1>
      <div
        role="button"
        className={["c-calendar-arrow", "c-calendar-arrow__next"].join(" ")}
        onClick={onNextClick}
      >
        ▶
      </div>
    </div>
  );
};

CalendarHeader.propTypes = {
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func
};

export default CalendarHeader;
