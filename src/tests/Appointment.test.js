import React from "react";
import ReactDOM from 'react-dom';

import { Appointment, AppointmentsDayView } from "../components/Appoinment";

describe('Appointment', function () {
  let container;
  let component;

  const render = component => ReactDOM.render(component, container);

  beforeEach(() => {
    container = document.createElement("div");
  });


  it('should render the customer first name', function () {
    const customer = { firstName: "Ashley" };

    render(<Appointment customer={customer} />);

    expect(container.textContent).toMatch("Ashley");
  });

  it('should render another customer first name', function () {
    const customer = { firstName: "Jordan" };

    render(<Appointment customer={customer} />);

    expect(container.textContent).toMatch("Jordan");
  });
});

describe("AppointmentsDayView", () => {
  let container;
  const today = new Date();
  const appointments = [
    { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
    { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } }
  ];

  const render = component => ReactDOM.render(component, container);

  beforeEach(() => {
    container = document.createElement("div");
  });

  it('should render a div with the right id', function () {
    render(<AppointmentsDayView appointments={[]} />);

    expect(container.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it('should render multiple appointments in an ol element', function () {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelector("ol")).not.toBeNull();
    expect(container.querySelector("ol").children).toHaveLength(2);
  });

  it('should render each appointment in an li', function () {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(container.querySelectorAll("li")[0].textContent).toEqual("12:00");
    expect(container.querySelectorAll("li")[1].textContent).toEqual("13:00");
  });

  it('should initially show a message saying there are no appointments today', function () {
    render(<AppointmentsDayView appointments={[]} />);

    expect(container.textContent).toMatch("There are no appointments scheduled for today.");
  });

  it('should select the first appointment by default.', function () {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.textContent).toMatch("Ashley");
  });

  it('should have a button element in each li.', function () {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll("li > button")).toHaveLength(2);
    expect(container.querySelectorAll("li > button")[0].type).toEqual("button");
  });
});
