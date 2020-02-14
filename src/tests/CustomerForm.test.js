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
});
