const helpers = (months, days) => {
  const weekName = dayOfWeek => days[dayOfWeek];
  const monthName = month => months[month];
  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  const isSameDay = (a, b) =>
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  const isPast = (day, minDate) =>
    day && minDate ? Math.floor(day - minDate) < 0 : false;
  const cloneDate = d => new Date(d);
  const yearList = (max = 50) => {
    const currentYear = new Date().getFullYear();
    return range(currentYear + max, currentYear - max, -1);
  };
  const monthList = months;
  const dayList = days;
  return {
    monthList,
    dayList,
    yearList,
    range,
    weekName,
    monthName,
    cloneDate,
    isSameDay,
    isPast
  };
};

export default helpers;
