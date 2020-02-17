import React from "react";

import { createContainer } from "./helpers/domManipulators";
import { AppointmentForm } from "../components/AppointmentForm";
import { CustomerForm } from "../components/CustomerForm";
import ReactTestUtils from "react-dom/test-utils";

describe("AppointmentForm", function() {
  let render, container;

  const form = id => container.querySelector(`form[id="${id}"]`);

  const field = name => form("appointment").elements[name];

  const labelFor = formElementId =>
    container.querySelector(`label[for="${formElementId}"]`);

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
});
