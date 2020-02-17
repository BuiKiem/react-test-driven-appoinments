import React from "react";

import { createContainer } from "./helpers/domManipulators";
import { AppointmentForm } from "../components/AppointmentForm";

describe("AppointmentForm", function() {
  let render, container;

  const form = id => container.querySelector(`form[id="${id}"]`);

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it("should render a form", function() {
    render(<AppointmentForm />);
    expect(form("appointment")).not.toBeNull();
  });

  describe("service field", function() {
    it("should render as a select box", function() {
      render(<AppointmentForm />);
      expect(form("appointment").elements.service).not.toBeNull();
      expect(form("appointment").elements.service.tagName).toEqual("SELECT");
    });
  });
});
