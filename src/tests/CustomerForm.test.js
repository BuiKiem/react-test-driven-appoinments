import React from "react";

import {createContainer} from "./helpers/domManipulators";
import { CustomerForm } from "../components/CustomerForm";

describe('CustomerForm', function () {
  let render, container;

  beforeEach(() => ({render, container} = createContainer()));

  it('should render a form', function () {
    render(<CustomerForm />);

    expect(container.querySelector("form[id='customer']")).not.toBeNull();
  });
});

