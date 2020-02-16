import React from "react";
import ReactTestUtils from "react-dom/test-utils";

import { createContainer } from "./helpers/domManipulators";
import { CustomerForm } from "../components/CustomerForm";

describe("CustomerForm", function() {
  let render, container;

  const form = id => container.querySelector(`form[id="${id}"]`);
  const field = name => form("customer").elements[name];
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual("INPUT");
    expect(formElement.type).toEqual("text");
  };

  const itShouldRenderAsATextBox = fieldName =>
    it("should render as a textbox", function() {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });

  const itShouldIncludeTheExistingValue = fieldName =>
    it("should include the existing value for", function() {
      render(<CustomerForm {...{ [fieldName]: "value" }} />);
      expect(field(fieldName).value).toEqual("value");
    });

  const itShouldRenderALabel = (fieldName, text) =>
    it("should render a label", function() {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(text);
    });

  const itShouldAssignIdMatchesLabel = fieldName =>
    it("should assign an id that matches the label id", function() {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(fieldName);
    });

  const itShouldSaveExistingValue = (fieldName, value) =>
    it("should save existing when submitted", async function() {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: value }}
          onSubmit={props => expect(props[fieldName]).toEqual(value)}
        />,
      );

      await ReactTestUtils.Simulate.submit(form("customer"));
    });

  const itShouldSaveNewValue = (fieldName, value) =>
    it("should save new value when submitted", async function() {
      expect.hasAssertions();

      render(
        <CustomerForm
          {...{ [fieldName]: "Initial value" }}
          onSubmit={props => expect(props[fieldName]).toEqual(value)}
        />,
      );

      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value, name: fieldName },
      });
      await ReactTestUtils.Simulate.submit(form("customer"));
    });

  beforeEach(() => ({ render, container } = createContainer()));

  it("should render a form", function() {
    render(<CustomerForm />);

    expect(form("customer")).not.toBeNull();
  });

  describe("first name field", function() {
    itShouldRenderAsATextBox("firstName");
    itShouldIncludeTheExistingValue("firstName");
    itShouldRenderALabel("firstName", "First name");
    itShouldAssignIdMatchesLabel("firstName");
    itShouldSaveExistingValue("firstName", "Initial value");
    itShouldSaveNewValue("firstName", "New value");
  });

  describe("last name field", function() {
    itShouldRenderAsATextBox("lastName");
    itShouldIncludeTheExistingValue("lastName");
    itShouldRenderALabel("lastName", "Last name");
    itShouldAssignIdMatchesLabel("firstName");
    itShouldSaveExistingValue("lastName", "Initial value");
    itShouldSaveNewValue("lastName", "New value");
  });

  describe("phone number field", function() {
    itShouldRenderAsATextBox("phoneNumber");
    itShouldIncludeTheExistingValue("phoneNumber");
    itShouldRenderALabel("phoneNumber", "Phone number");
    itShouldAssignIdMatchesLabel("phoneNumber");
    itShouldSaveExistingValue("phoneNumber", "1234");
    itShouldSaveNewValue("phoneNumber", "5678");
  });
});
