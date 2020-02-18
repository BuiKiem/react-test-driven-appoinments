import React, { useState } from "react";

const TimeSlotTable = () => <table id="time-slots"></table>;

export const AppointmentForm = ({ selectableServices, service, onSubmit }) => {
  const [appointment, setAppointment] = useState({
    service,
  });

  const handleChangeService = ({ target }) => {
    setAppointment(appointment => ({
      ...appointment,
      service: target.value,
    }));
  };

  return (
    <form id="appointment" onSubmit={() => onSubmit(appointment)}>
      <label htmlFor="service">Service</label>
      <select
        name="service"
        id="service"
        value={service}
        onChange={handleChangeService}
      >
        <option />
        {selectableServices.map(service => (
          <option key={service}>{service}</option>
        ))}
      </select>
      <TimeSlotTable />
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
