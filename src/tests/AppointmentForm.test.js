import React from "react";
import ReactTestUtils from "react-dom/test-utils";

import { createContainer } from "./helpers/domManipulators";
import { AppointmentForm } from "../components/AppointmentForm";

describe("AppointmentForm", function() {
  let render, container;

  const form = id => container.querySelector(`form[id="${id}"]`);

  const field = name => form("appointment").elements[name];

  const labelFor = formElementId =>
    container.querySelector(`label[for="${formElementId}"]`);

  const timeSlotTable = () => container.querySelector("table#time-slots");

  const startsAtField = index =>
    container.querySelectorAll(`input[name="startsAt"]`)[index];

  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find(option => option.textContent === textContent);
  };

  const itShouldRenderAsASelectBox = fieldName =>
    it("should render as a select box", function() {
      render(<AppointmentForm />);
      expect(field(fieldName)).not.toBeNull();
      expect(field(fieldName).tagName).toEqual("SELECT");
    });

  const itShouldInitiallyHasABlankValueChosen = fieldName =>
    it("should initially has a blank value chosen", function() {
      render(<AppointmentForm />);
      const firstNode = field(fieldName).childNodes[0];
      expect(firstNode.value).toEqual("");
      expect(firstNode.selected).toBeTruthy();
    });

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it("should render a form", function() {
    render(<AppointmentForm />);
    expect(form("appointment")).not.toBeNull();
  });

  describe("service field", function() {
    itShouldRenderAsASelectBox("service");
    itShouldInitiallyHasABlankValueChosen("service");

    it("should list all salon services", function() {
      const selectableServices = ["Cut", "Blow-dry"];
      render(<AppointmentForm selectableServices={selectableServices} />);
      const optionNodes = Array.from(field("service").childNodes);
      const renderedServices = optionNodes.map(node => node.textContent);

      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices),
      );
    });

    it("should pre-select the existing value", function() {
      const services = ["Cut", "Blow-dry"];
      render(
        <AppointmentForm selectableServices={services} service="Blow-dry" />,
      );
      const option = findOption(field("service"), "Blow-dry");

      expect(option.selected).toBeTruthy();
    });

    it("should render a label", function() {
      render(<AppointmentForm />);
      expect(labelFor("service")).not.toBeNull();
      expect(labelFor("service").textContent).toEqual("Service");
    });

    it("should assign an id that matches the label id", function() {
      render(<AppointmentForm />);
      expect(field("service").id).toEqual("service");
    });

    it("should save existing when submitted", async function() {
      const services = ["Cut", "Blow-dry"];
      expect.hasAssertions();

      render(
        <AppointmentForm
          selectableServices={services}
          service="Cut"
          onSubmit={props => expect(props.service).toEqual("Cut")}
        />,
      );

      await ReactTestUtils.Simulate.submit(form("appointment"));
    });

    it("should save new value when submitted", async function() {
      const services = ["Cut", "Blow-dry"];
      expect.hasAssertions();

      render(
        <AppointmentForm
          selectableServices={services}
          service="Cut"
          onSubmit={props => expect(props.service).toEqual("Blow-dry")}
        />,
      );

      await ReactTestUtils.Simulate.change(field("service"), {
        target: { value: "Blow-dry", name: "service" },
      });
      await ReactTestUtils.Simulate.submit(form("appointment"));
    });
  });

  describe("time slot table", function() {
    it("should render a table for time slot", function() {
      render(<AppointmentForm />);
      expect(timeSlotTable()).not.toBeNull();
    });

    it("should render a time slot for every half an hour between open and close times", function() {
      render(<AppointmentForm salonOpensAt={9} salonClosesAt={11} />);
      const timesOfDay = timeSlotTable().querySelectorAll("tbody >* th");

      expect(timesOfDay).toHaveLength(4);
      expect(timesOfDay[0].textContent).toEqual("09:00");
      expect(timesOfDay[1].textContent).toEqual("09:30");
      expect(timesOfDay[2].textContent).toEqual("10:00");
    });

    it("should render an empty cell at the start of the header row", function() {
      render(<AppointmentForm />);
      const headerRow = timeSlotTable().querySelector("thead > tr");
      expect(headerRow.firstChild.textContent).toEqual("");
    });

    it("should render a week of available dates", function() {
      const today = new Date(2018, 11, 1);
      render(<AppointmentForm today={today} />);
      const dates = timeSlotTable().querySelectorAll(
        "thead >* th:not(:first-child)",
      );

      expect(dates).toHaveLength(7);
      expect(dates[0].textContent).toEqual("Sat 01");
      expect(dates[1].textContent).toEqual("Sun 02");
      expect(dates[6].textContent).toEqual("Fri 07");
    });

    it("should render a radio button for each time slot", function() {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];

      render(
        <AppointmentForm
          today={today}
          availableTimeSlots={availableTimeSlots}
        />,
      );

      const cells = timeSlotTable().querySelectorAll("td");
      expect(cells[0].querySelector("input[type='radio']")).not.toBeNull();
      expect(cells[7].querySelector("input[type='radio']")).not.toBeNull();
    });

    it("should not render radio button for unavailable time slots", function() {
      render(<AppointmentForm availableTimeSlots={[]} />);
      const timesOfDay = timeSlotTable().querySelectorAll("input");

      expect(timesOfDay).toHaveLength(0);
    });

    it("should set radio values to the index of the corresponding appointment", function() {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
        />,
      );

      expect(startsAtField(0).value).toEqual(
        availableTimeSlots[0].startsAt.toString(),
      );
      expect(startsAtField(1).value).toEqual(
        availableTimeSlots[1].startsAt.toString(),
      );
    });

    it("should pre-select the existing value", function() {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
          startsAt={availableTimeSlots[0].startsAt}
        />,
      );

      expect(startsAtField(0).checked).toEqual(true);
    });

    it("should save existing value when submitted", async function() {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
          startsAt={availableTimeSlots[0].startsAt}
          onSubmit={({ startsAt }) =>
            expect(startsAt).toEqual(availableTimeSlots[0].startsAt)
          }
        />,
      );
    });

    it("should save new value when submitted", async function() {
      expect.hasAssertions();
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
          startsAt={availableTimeSlots[0].startsAt}
          onSubmit={({ startsAt }) => {
            expect(startsAt).toEqual(availableTimeSlots[1].startsAt);
            expect(startsAtField(0).checked).toEqual(false);
          }}
        />,
      );

      ReactTestUtils.Simulate.change(startsAtField(1), {
        target: {
          value: availableTimeSlots[1].startsAt.toString(),
          name: "startsAt",
        },
      });
      ReactTestUtils.Simulate.submit(form("appointment"));
    });
  });

  describe("stylist field", function() {
    itShouldRenderAsASelectBox("stylist");
    itShouldInitiallyHasABlankValueChosen("stylist");
  });
});
