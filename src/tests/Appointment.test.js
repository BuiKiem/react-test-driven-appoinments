import React from "react";
import ReactDOM from 'react-dom';

import {Appointment} from "../components/Appoinment";

describe('Appointment', function () {
  it('should render the customer first name', function () {
    const customer = { firstName: "Ashley" };
    const component = <Appointment customer={customer} />;
    const container = document.createElement("div");

    ReactDOM.render(component, container);

    expect(container.textContent).toMatch("Ashley");
  });

  it('should render another customer first name', function () {
    const customer = { firstName: "Jordan" };
    const component = <Appointment customer={customer} />;
    const container = document.createElement("div");

    ReactDOM.render(component, container);

    expect(container.textContent).toMatch("Jordan");
  });
});
