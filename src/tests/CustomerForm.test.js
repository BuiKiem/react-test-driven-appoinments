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

  beforeEach(() => ({ render, container } = createContainer()));

  it("should render a form", function() {
    render(<CustomerForm />);

    expect(form("customer")).not.toBeNull();
  });

  it("should render the first name field as a textbox", function() {
    render(<CustomerForm />);

    const field = form("customer").elements.firstName;

    expectToBeInputFieldOfTypeText(field);
  });

  it("should include the existing value for the first name", function() {
    render(<CustomerForm firstName="Ashley" />);

    const field = form("customer").elements.firstName;

    expect(field.value).toEqual("Ashley");
  });
});
