import React from "react";
import ReactTestUtils from "react-dom/test-utils";

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

  describe("first name field", function() {
    it("should render as a textbox", function() {
      render(<CustomerForm />);

      expectToBeInputFieldOfTypeText(firstNameField());
    });

    it("should include the existing value for the first name", function() {
      render(<CustomerForm firstName="Ashley" />);

      expect(firstNameField().value).toEqual("Ashley");
    });

    it("should render a label", function() {
      //  TODO: Implement test
    });

    it("should assign an id that matches the label id", function() {
      render(<CustomerForm />);

      expect(firstNameField().id).toEqual("firstName");
    });

    it("should save existing when submitted", async function() {
      expect.hasAssertions();

      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({ firstName }) => expect(firstName).toEqual("Ashley")}
        />,
      );

      await ReactTestUtils.Simulate.submit(form("customer"));
    });

    it("should save when submitted", async function() {
      expect.hasAssertions();

      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({ firstName }) => expect(firstName).toEqual("Jamie")}
        />,
      );

      await ReactTestUtils.Simulate.change(firstNameField(), {
        target: { value: "Jamie" },
      });
      await ReactTestUtils.Simulate.submit(form("customer"));
    });
  });

  it("should render a form", function() {
    render(<CustomerForm />);

    expect(form("customer")).not.toBeNull();
  });
});
