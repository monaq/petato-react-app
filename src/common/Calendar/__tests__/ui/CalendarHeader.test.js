import Adapter from "enzyme-adapter-react-16";
import CalendarHeader from "../../ui/CalendarHeader";
import commonProps from "../fixtures/common.json";
import { mount, shallow } from "enzyme";
import React from "react";

const { monthFormat, dayFormat } = commonProps;

const given = {
  title: "2019년 3월",
  onPrevClick: jest.fn(),
  onNextClick: jest.fn(),
  month: 3,
  year: 2019
};

beforeEach(() => {
  given.onPrevClick.mockClear();
  given.onNextClick.mockClear();
});

describe("CalendarHeader", () => {
  it("should render title", () => {
    const component = shallow(<CalendarHeader {...given} />);
    expect(component.html()).toMatchSnapshot();
  });

  it("should call props.onPrevClick on click prev button", () => {
    const component = shallow(<CalendarHeader {...given} />);
    component.find('.c-calendar-arrow__prev').simulate('click');
    expect(given.onPrevClick).toHaveBeenCalled();
  });
  it("should call props.onNextClick on click next button", () => {
    const component = shallow(<CalendarHeader {...given} />);
    component.find('.c-calendar-arrow__next').simulate('click');
    expect(given.onNextClick).toHaveBeenCalled();
  });
});
