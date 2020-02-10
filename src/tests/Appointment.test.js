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

  const render = component => ReactDOM.render(component, container);

  beforeEach(() => {
    container = document.createElement("div");
  });

  it('should render a div with the right id', function () {
    render(<AppointmentsDayView appointments={[]} />);

    expect(container.querySelector("div#appointmentsDayView")).not.toBeNull();
  });

  it('should render multiple appointments in an ol element', function () {
    const today = new Date();
    const appointments = [
      { startsAt: today.setHours(12, 0) },
      { startsAt: today.setHours(13, 0) }
    ];

    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelector("ol")).not.toBeNull();
    expect(container.querySelector("ol").children).toHaveLength(2);
  });

  it('should render each appointment in an li', function () {
    const today = new Date();
    const appointments = [
      { startsAt: today.setHours(12, 0) },
      { startsAt: today.setHours(13, 0) }
    ];

    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(container.querySelectorAll("li")[0].textContent).toEqual("12:00");
    expect(container.querySelectorAll("li")[1].textContent).toEqual("13:00");
  });
});
