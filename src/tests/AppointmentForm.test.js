import React from "react";

import { createContainer } from "./helpers/domManipulators";
import { AppointmentForm } from "../components/AppointmentForm";

describe("AppointmentForm", function() {
  let render, container;

  const form = id => container.querySelector(`form[id="${id}"]`);

  const field = name => form("appointment").elements[name];

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it("should render a form", function() {
    render(<AppointmentForm />);
    expect(form("appointment")).not.toBeNull();
  });

  describe("service field", function() {
    const findOption = (dropdownNode, textContent) => {
      const options = Array.from(dropdownNode.childNodes);
      return options.find(option => option.textContent === textContent);
    };

    it("should render as a select box", function() {
      render(<AppointmentForm />);
      expect(field("service")).not.toBeNull();
      expect(field("service").tagName).toEqual("SELECT");
    });

    it("should initially has a blank value chosen", function() {
      render(<AppointmentForm />);
      const firstNode = field("service").childNodes[0];
      expect(firstNode.value).toEqual("");
      expect(firstNode.selected).toBeTruthy();
    });

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
  });
});
