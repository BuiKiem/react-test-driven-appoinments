import React from "react";

export const AppointmentForm = ({ selectableServices, service }) => {
  return (
    <form id="appointment">
      <select name="service" value={service} readOnly>
        <option />
        {selectableServices.map(service => (
          <option key={service}>{service}</option>
        ))}
      </select>
    </form>
  );
};

AppointmentForm.defaultProps = {
  selectableServices: [
    "Cut",
    "Blow-dry",
    "Cut & color",
    "Beard trim",
    "Cut & beard trim",
    "Extensions",
  ],
};
