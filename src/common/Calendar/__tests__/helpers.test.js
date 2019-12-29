import { shallow } from "enzyme";
import helpers from "../helpers";
import commonProps from "./fixtures/common.json";

const { monthFormat: MONTHS, dayFormat: DAYS } = commonProps;
describe("Calendar Helpers()", () => {
  let calendarHelpers;
  beforeEach(() => {
    calendarHelpers = helpers(MONTHS, DAYS);
  });
  it("weekName() should return correct week", () => {
    const given = 0;
    const then = "일";
    expect(calendarHelpers.weekName(given)).toEqual(then);
  });
  it("monthName() should return correct month", () => {
    const given = 10;
    const then = "11월";
    expect(calendarHelpers.monthName(given)).toEqual(then);
  });
  it("returns range between start and stop number by step", () => {
    const then = [6, 5, 4, 3, 2];
    expect(calendarHelpers.range(6, 2, -1)).toEqual(then);
  });
  it("checks two given dates are same", () => {
    const a = new Date("2019-01-01");
    const b = new Date();
    expect(calendarHelpers.isSameDay(a, b)).toBeFalsy();
  });
});
