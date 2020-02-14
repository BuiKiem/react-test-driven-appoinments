import React from "react";

import { createContainer } from "./helpers/domManipulators";
import { CustomerForm } from "../components/CustomerForm";

describe("CustomerForm", function() {
  let render, container;

  const form = id => container.querySelector(`form[id="${id}"]`);

  beforeEach(() => ({ render, container } = createContainer()));

  it("should render a form", function() {
    render(<CustomerForm />);

    expect(form("customer")).not.toBeNull();
  });

  it("should render the first name field as a textbox", function() {
    render(<CustomerForm />);

    const field = form("customer").elements.firstName;

    expect(field).not.toBeNull();
    expect(field.tagName).toEqual("INPUT");
    expect(field.type).toEqual("text");
  });
});
