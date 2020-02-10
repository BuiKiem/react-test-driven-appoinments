import React from "react";
import ReactDOM from 'react-dom';

import {Appointment} from "../components/Appoinment";

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
