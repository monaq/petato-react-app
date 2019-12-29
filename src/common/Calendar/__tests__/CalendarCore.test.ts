import createCalendar, { createDatesOfMonth } from "../CalendarCore";

describe("createCalendar", () => {
  it("should create proprerty: daysInMonth", () => {
    const given = new Date(2019, 0, 1);
    const when = createCalendar(given);
    expect(when.daysInMonth).toBe(31);
  });

  it("should create proprerty: monthDate", () => {
    const given = new Date(2019, 11, 25);
    const { monthDate: when } = createCalendar(given);

    expect(when.length).toEqual(31);
    expect((when.shift() as Date).getDate()).toBe(1);
    expect((when.pop() as Date).getDate()).toBe(31);
  });

  it("should create proprerty: now", () => {
    const now = new Date();
    const given = new Date(2019, 11, 25);
    const when = createCalendar(given);

    expect(Math.abs(when.now.getTime() - now.getTime())).toBeLessThan(2000);
  });

  it("should create proprerty: month", () => {
    const given = new Date(2019, 11, 25);
    const when = createCalendar(given);

    expect(when.month).toBe(given.getMonth());
  });

  it("should create property: year", () => {
    const given = new Date(2019, 11, 25);
    const when = createCalendar(given);
    expect(when.year).toBe(given.getFullYear());
  });

  it("should create property: firstWeekStartsAt", () => {
    const given = new Date(2019, 10, 15);
    const when = createCalendar(given);
    expect(when.firstWeekStartsAt).toBe(5);
  });
});
