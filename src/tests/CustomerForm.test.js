import React from "react";

import { createContainer } from "./helpers/domManipulators";
import { CustomerForm } from "../components/CustomerForm";

describe("CustomerForm", function() {
  let render, container;

  const form = id => container.querySelector(`form[id="${id}"]`);

  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual("INPUT");
    expect(formElement.type).toEqual("text");
  };

  const firstNameField = () => form("customer").elements.firstName;

  beforeEach(() => ({ render, container } = createContainer()));

  it("should render a form", function() {
    render(<CustomerForm />);

    expect(form("customer")).not.toBeNull();
  });

  it("should render the first name field as a textbox", function() {
    render(<CustomerForm />);

    expectToBeInputFieldOfTypeText(firstNameField());
  });

  it("should include the existing value for the first name", function() {
    render(<CustomerForm firstName="Ashley" />);

    expect(firstNameField().value).toEqual("Ashley");
  });

  it("should assign an id that matches the label id to the first name field", function() {
    render(<CustomerForm />);

    expect(firstNameField().id).toEqual("firstName");
  });
});
