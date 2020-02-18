import React, { useState } from "react";

const dailyTimeSlots = (salonOpensAt, salonClosesAt) => {
  const totalSlots = (salonClosesAt - salonOpensAt) * 2;
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);
  const increment = 30 * 60 * 1000;
  return Array(totalSlots)
    .fill([startTime])
    .reduce((acc, _, index) => acc.concat([startTime + index * increment]));
};

const toTimeValue = timestamp =>
  new Date(timestamp).toTimeString().substring(0, 5);

const TimeSlotTable = ({ salonOpensAt, salonClosesAt }) => {
  const timeSlots = dailyTimeSlots(salonOpensAt, salonClosesAt);
  return (
    <table id="time-slots">
      <tbody>
        {timeSlots.map(timeSlot => (
          <tr key={timeSlot}>
            <th>{toTimeValue(timeSlot)}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
  salonOpensAt,
  salonClosesAt,
}) => {
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
      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
      />
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
  salonOpensAt: 9,
  salonClosesAt: 19,
};
