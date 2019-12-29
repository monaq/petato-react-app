type Calendar = {
  month: number;
  year: number;
  date: number;
  now: Date;
  daysInMonth: number;
  firstWeekStartsAt: number;
  monthDate: Date[];
};
const createCalendar = (value: Date): Calendar => {
  const datesOfMonth = createDatesOfMonth(value);

  return {
    year: value.getFullYear(),
    month: value.getMonth(),
    date: value.getDate(),
    firstWeekStartsAt: getFirstDay(value),
    now: new Date(),
    monthDate: datesOfMonth,
    daysInMonth: datesOfMonth.length
  };
};

const createDatesOfMonth = (date: Date): Date[] => {
  const daysInMonth = getDaysInMonth(date);
  const year = date.getFullYear();
  const month = date.getMonth();

  return [...Array(daysInMonth)].map((el, i) => new Date(year, month, i + 1));
};

const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDay = (date: Date): number => {
  const firstDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return firstDate.getDay();
};

export default createCalendar;
